import React from 'react';
import {Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LoginForm from './LoginForm'
import {Font, LinearGradient} from 'expo';
import ConstKeys from '../../config/app.consts'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getUserNameAndLastName, validateEmail} from '../../services/string.service'
import {getUserByEmail, signIn, matchResponseToUserInfo} from '../../services/user.service'

export default class Login extends React.Component {
    async componentDidMount() {
        await Font.loadAsync({
            'Courgette': require('../../../assets/fonts/Courgette-Regular.ttf'),
        });
        this.setState({fontLoaded: true});
    }

    state = {
        email: null,
        password: null,
        fontLoaded: false,
        userInfo: null,
        errorDuringLog: false
    };

    validateFields = () => {
        if (this.state.email === null || this.state.password === null) {
            return false;
        } else if (!validateEmail(this.state.email)) {
            return false;
        }
        return true;
    };

    login = () => {
        if (this.validateFields()) {
            fetch(ConstKeys.apiUrl + '/login', {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.state.email,
                    password: this.state.password,
                })
            })
                .then(res => {
                    if (res.status === 200 && res.headers.map.bearer) {
                        console.log(res);
                        ConstKeys.auth = 'Bearer ' + res.headers.map.bearer;
                        getUserByEmail(this.state.email)
                            .then(response => {
                                let userData = JSON.parse(response._bodyInit);
                                let data = {
                                    userInfo: matchResponseToUserInfo(userData),
                                    auth: ConstKeys.auth
                                };
                                ConstKeys.userInfo = data.userInfo;
                                this.setState({errorDuringLog: false});
                                signIn(data, this.props.navigation);
                            })
                            .catch(err => this.setState({errorDuringLog: true}));
                    }
                    else {
                        this.setState({errorDuringLog: true});
                    }
                })
                .catch(err => this.setState({errorDuringLog: true})
                );
        } else {
            this.setState({errorDuringLog: true});
        }
    };

    createFbUserAccount = (userInfo) => {
        fetch(ConstKeys.apiUrl + '/createFbUserAccount', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: userInfo.email,
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                password: 'fbLogger',
                params: {
                    photo: userInfo.picture.data.url
                }
            })
        })
            .then(res => {
                let responseBody = JSON.parse(res._bodyInit);
                ConstKeys.userInfo = matchResponseToUserInfo(responseBody);
                return this.getTokenForFb(ConstKeys.userInfo);
            })
            .catch(err => {
                    this.setState({errorDuringLog: true});
                    return 'error';
                }
            );
    };

    getTokenForFb = (userInfo) => {
        fetch(ConstKeys.apiUrl + '/generateToken?email=' + userInfo.email, {
            credentials: 'include',
            method: 'GET',
        })
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    ConstKeys.auth = res._bodyInit;
                    let data = {
                        userInfo: userInfo,
                        auth: res._bodyInit
                    };
                    signIn(data, this.props.navigation);
                }
                else {
                    this.setState({errorDuringLog: true});
                }

            })
            .catch(err => {
                    this.setState({errorDuringLog: true});
                    console.log(err);
                    return 'error';
                }
            );
    };

    logInFb = async () => {
        const {
            type,
            token,
            expires,
            permissions,
            declinedPermissions,
        } = await Expo.Facebook.logInWithReadPermissionsAsync('269068230632241', {
            permissions: ['public_profile', 'email'],
        });
        if (type === 'success') {
            await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,email,likes,name,picture.type(large)`)
                .then(async res => {
                    let userInfo = await res.json();
                    if (userInfo.error === undefined) {
                        const {firstName, lastName} = getUserNameAndLastName(userInfo.name);
                        userInfo['firstName'] = firstName;
                        userInfo['lastName'] = lastName;
                        this.createFbUserAccount(userInfo);
                    } else {
                        alert('Fb error');
                    }
                })
                .catch(err => console.log(err));
        } else {
            console.log('error')
        }
    };

    renderFbLogin = () => {
        return (
            <TouchableOpacity style={styles.facebookBtn} onPress={this.logInFb}>
                <Text style={styles.facebookQuestions}>
                    Got?
                </Text>
                <Text style={styles.facebookTxt}>
                    <Ionicons name="logo-facebook" size={30} color={"white"}/>
                </Text>
            </TouchableOpacity>
        );
    };

    render() {
        let title = null;
        let description = null;
        if (this.state.fontLoaded) {
            title = <Text style={styles.title}> YouMeet </Text>;
            description = <Text style={styles.description}>Meet new people in entertaining places</Text>;
        }
        let errorDuringUpload = this.state.errorDuringLog ? (
            <Text style={styles.errorMessage}> There was an error during loging.
            </Text>
        ) : null;
        let informationalText = this.props.navigation.getParam('regInfo') === true ? (
            <Text style={styles.infoMessage}> You have successfully registered!
            </Text>
        ) : null;
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>

                <LinearGradient colors={['#7b258e', '#B39DDB', '#3b2281']} style={styles.gradient}
                                locations={[0, 0.4, 1]} start={[0.2, 0]} end={[0.8, 1.2]}>
                    <ScrollView>
                        <View style={styles.logoContainer}>
                            {errorDuringUpload}
                            {informationalText}
                            <Image style={styles.logo} source={require('../../../assets/images/logo.gif')}/>
                            {title}
                            {description}
                            <LoginForm loginAction={this.login} getEmail={(data) => {
                                this.setState({errorDuringLog: false});
                                this.setState({email: data})
                            }}
                                       getPassword={(data) => {
                                           this.setState({password: data});
                                           this.setState({errorDuringLog: false})
                                       }}
                            />
                            {this.renderFbLogin()}
                        </View>
                    </ScrollView>
                </LinearGradient>

            </KeyboardAvoidingView>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ba68c8',
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
    logoContainer: {
        marginTop: 20,
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        width: 200,
        height: 200
    },
    title: {
        marginTop: 5,
        fontSize: 20,
        color: '#FFF',
        fontFamily: 'Courgette'
    },
    description: {
        marginTop: 5,
        fontSize: 10,
        fontFamily: 'Courgette'
    },
    registerBtn: {
        borderRadius: 15,
        marginTop: 15,
        backgroundColor: 'rgba(255,255,255,0.3)',
        padding: 10,
        width: 120
    },
    registerText: {
        fontSize: 10,
        color: 'white',
        textAlign: 'center'
    },
    footer: {
        color: 'white',
        fontSize: 10,
        padding: 10,
        position: 'absolute',
        bottom: 0
    },
    facebookBtn: {
        flexDirection: 'row',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#3B5998',
        opacity: 0.9
    },
    facebookTxt: {
        color: '#FFF',
        padding: 5
    },
    errorMessage: {
        backgroundColor: 'rgba(255,51,0,0.1)',
        borderRadius: 10,
        color: 'rgba(255,77,77,0.9)',
        fontSize: 15,
        padding: 15,
        marginTop: 25
    },
    infoMessage: {
        backgroundColor: '#7b258e',
        opacity: 0.3,
        borderRadius: 10,
        color: 'rgba(255,255,255,1)',
        fontSize: 15,
        padding: 15,
        marginTop: 25
    },
    facebookQuestions: {
        padding: 5,
        backgroundColor: '#3B5998',
        color: 'white',
        fontSize: 20,
        fontWeight: '600'
    }
});
