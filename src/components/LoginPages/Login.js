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
import {LinearGradient} from 'expo';
import ConstKeys from '../../config/app.consts'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getUserNameAndLastName, validateEmail} from '../../services/string.service'
import {getUserByEmail, signIn, matchResponseToUserInfo, signOut} from '../../services/user.service'
import Colors from '../../config/colors'

export default class Login extends React.Component {
    state = {
        email: null,
        password: null,
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
                        ConstKeys.auth = 'Bearer ' + res.headers.map.bearer;
                        getUserByEmail(this.state.email)
                            .then(response => {
                                let userData = JSON.parse(response._bodyInit);
                                ConstKeys.userInfo = matchResponseToUserInfo(userData);
                                this.setState({errorDuringLog: false});
                                this.props.navigation.navigate('loading');
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
                if (res.status === 200) {
                    ConstKeys.auth = res._bodyInit;
                    this.props.navigation.navigate('loading');
                }
                else {
                    this.setState({errorDuringLog: true});
                }
            })
            .catch(err => {
                    this.setState({errorDuringLog: true});
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
        let title = <Text style={styles.title}> YouMeet </Text>;
        let description = <Text style={styles.description}>Meet new people in entertaining places</Text>;
        let errorDuringUpload = this.state.errorDuringLog ? (
            <Text style={styles.errorMessage}> There was an error during loging.
            </Text>
        ) : null;
        let informationalText = this.props.navigation.getParam('regInfo') === true ? (
            <Text style={styles.infoMessage}> You have successfully registered!
            </Text>
        ) : null;
        let iconFB = <Text style={styles.facebookTxt}>
            <Ionicons name="logo-facebook" size={30} color={"white"}/>
        </Text>;
        let login = <Text style={styles.buttonText}>LOGIN</Text>;

        return (
            <LinearGradient colors={['white', '#ddb6ca']} locations={[0.3, 1]} style={styles.gradient}>
                <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <ScrollView>
                        <View style={styles.logoContainer}>
                            {errorDuringUpload}
                            {informationalText}
                            <Image style={styles.logo} source={require('../../../assets/images/logo2.gif')}/>
                            {title}
                            {description}
                            <View style={styles.loginContainer}>
                                <TextInput style={styles.input}
                                           placeholder="Email"
                                           placeholderTextColor="rgba(0,0,0,0.4)"
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
                                           placeholderTextColor="rgba(0,0,0,0.4)"
                                           ref={(input) => this.passwordInput = input}
                                           onChangeText={(password) => {
                                               this.setState({errorDuringLog: false});
                                               this.setState({password: password})
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
        color: Colors.black,
        fontFamily: 'Gloria'
    },
    description: {
        marginTop: 5,
        fontSize: 12,
        fontFamily: 'Gloria',
        color: Colors.theme
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
        color: 'white',
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
        backgroundColor: Colors.theme,
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
        borderBottomColor: Colors.black,
        height: 40,
        color: Colors.theme,
        padding: 10,
    },
    buttonContainer: {
        borderRadius: 5,
        marginTop: 15,
        backgroundColor: Colors.theme,
        paddingVertical: 15,
        elevation: 2
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Cabin',
        letterSpacing: 3
    }
});
