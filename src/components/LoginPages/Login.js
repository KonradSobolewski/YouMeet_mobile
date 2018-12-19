import React from 'react';
import {
    Image,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import {Font, LinearGradient} from 'expo';
import ConstKeys from '../../config/app.consts'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getUserNameAndLastName, validateEmail} from '../../services/string.service'
import {getUserByEmail, signIn, matchResponseToUserInfo} from '../../services/user.service'

export default class Login extends React.Component {
    async componentDidMount() {
        await Font.loadAsync({
            'Courgette': require('../../../assets/fonts/Courgette-Regular.ttf'),
            'Dosis': require('../../../assets/fonts/Dosis-Regular.ttf'),
            'Gloria': require('../../../assets/fonts/GloriaHallelujah.ttf'),
            'Cabin': require('../../../assets/fonts/Cabin-Regular.ttf'),
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
                    photo: userInfo.picture.data.url,
                    age: 18,
                    gender: 'male'
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
            await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,email,name,picture.type(large)`)
                .then(async res => {
                    let userInfo = await res.json();
                    console.log(userInfo);
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

    render() {
        let title = null;
        let description = null;
        let errorDuringUpload = null;
        let informationalText = null;
        let iconFB = null;
        let login = null;
        if (this.state.fontLoaded) {
            title = <Text style={styles.title}> YouMeet </Text>;
            description = <Text style={styles.description}>Meet new people in entertaining places</Text>;
            errorDuringUpload = this.state.errorDuringLog ? (
                <Text style={styles.errorMessage}> There was an error during loging.
                </Text>
            ) : null;
            informationalText = this.props.navigation.getParam('regInfo') === true ? (
                <Text style={styles.infoMessage}> You have successfully registered!
                </Text>
            ) : null;
            iconFB = <Text style={styles.facebookTxt}>
                <Ionicons name="logo-facebook" size={30} color={"white"}/>
            </Text>;
            login = <Text style={styles.buttonText}>LOGIN</Text>;

        }
        return (
            <LinearGradient colors={['#b22b7d', '#ddb6ca']} locations={[0, 0.8]} style={styles.gradient}>
                <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <ScrollView>
                        <View style={styles.logoContainer}>
                            {errorDuringUpload}
                            {informationalText}
                            <Image style={styles.logo} source={require('../../../assets/images/logo.gif')}/>
                            {title}
                            {description}
                            <View style={styles.loginContainer}>
                                <TextInput style={styles.input}
                                           placeholder="Email"
                                           placeholderTextColor="rgba(255,255,255,0.5)"
                                           onSubmitEditing={() => this.passwordInput.focus()}
                                           keyboardType="email-address"
                                           autoCapitalize="none"
                                           autoCorrect={false}
                                           onChangeText={(email) => {
                                               this.setState({errorDuringLog: false});
                                               this.setState({email: email})
                                           }}
                                />

                                <TextInput style={styles.input}
                                           placeholder="Password"
                                           secureTextEntry
                                           placeholderTextColor="rgba(255,255,255,0.5)"
                                           ref={(input) => this.passwordInput = input}
                                           onChangeText={(password) => {
                                               this.setState({errorDuringLog: false});
                                               this.setState({email: password})
                                           }}
                                />
                                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.login()}>
                                    {login}
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.facebookBtn} onPress={this.logInFb}>
                                {iconFB}
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </LinearGradient>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        justifyContent: 'center',
    },
    logo: {
        width: 200,
        height: 200,
    },
    title: {
        marginTop: 5,
        fontSize: 20,
        color: '#FFF',
        fontFamily: 'Gloria',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: {width: 0, height: 2},
        textShadowRadius: 5
    },
    description: {
        marginTop: 5,
        fontSize: 12,
        fontFamily: 'Gloria'
    },
    facebookBtn: {
        flexDirection: 'row',
        paddingHorizontal: 40,
        borderRadius: 5,
        backgroundColor: '#3B5998',
        opacity: 0.9,
        elevation: 3
    },
    facebookTxt: {
        color: '#FFF',
        padding: 5,
        fontFamily: 'Cabin'
    },
    errorMessage: {
        backgroundColor: 'rgba(255,51,0,0.1)',
        borderRadius: 10,
        color: 'rgba(255,77,77,0.9)',
        fontSize: 15,
        padding: 15,
        marginTop: 25,
        fontFamily: 'Cabin'
    },
    infoMessage: {
        backgroundColor: '#B22B7D',
        opacity: 0.3,
        borderRadius: 10,
        color: 'rgba(255,255,255,1)',
        fontSize: 15,
        padding: 15,
        marginTop: 25,
        fontFamily: 'Cabin'
    },
    facebookQuestions: {
        padding: 5,
        color: 'white',
        fontSize: 20,
        fontFamily: 'Cabin'
    },
    loginContainer: {
        padding: 20,
        width: '80%'
    },
    input: {
        marginTop: 15,
        borderRadius: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        height: 40,
        color: '#FFF',
        padding: 10,
    },
    buttonContainer: {
        borderRadius: 5,
        marginTop: 15,
        backgroundColor: '#FFF',
        paddingVertical: 15,
        elevation: 2
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
        fontFamily: 'Cabin',
        letterSpacing: 3
    }
});
