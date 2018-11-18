import React from 'react';
import {StyleSheet, View, Image, Text, KeyboardAvoidingView, Alert, TouchableOpacity} from 'react-native';
import LoginForm from './LoginForm'
import {Font, LinearGradient} from 'expo';
import ConstKeys from '../../config/app.consts'
import Ionicons from 'react-native-vector-icons/Ionicons';

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
        userInfo: null
    };

    validateFields = () => {
        let reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (this.state.email === null || this.state.password === null) {
            return false;
        } else if (!reg.test(this.state.email)) {
            return false;
        }
        return true;
    };

    login = () => {
        if (this.validateFields()) {
            fetch(ConstKeys.apiUrl + '/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
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
                        this.props.navigation.navigate('homePage', {
                            auth: res.headers.map.bearer
                        });
                    }
                })
                .catch(err => console.log(err))
        } else {
            Alert.alert('Invalid data.');
        }
    };

     logInFb = async() => {
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
            await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture.type(large)`)
                .then(async res => {
                    let userInfo = await res.json();
                    if (userInfo.error === null) {
                        this.props.navigation.navigate('homePage', {
                            fbInfo: userInfo
                        });
                    } else {
                        alert('Fb error');
                    }
                })
                .catch(err => console.log(err));
        } else {
            console.log('error')
        }
    }

    renderFbLogin = () => {
        return (
            <TouchableOpacity style={styles.facebookBtn} onPress={this.logInFb}>
                <Text style={styles.facebookTxt}>
<<<<<<< HEAD
                      <Ionicons name="logo-facebook" size={30} color={"white"}/>
=======
                    Connect with Facebook
>>>>>>> 4e4874950ba4d39e696f0be322b3bf2ce863bafa
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
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <LinearGradient colors={['#7b258e', '#B39DDB', '#3b2281']} style={styles.gradient}
                                locations={[0, 0.4, 1]} start={[0.2, 0]} end={[0.8, 1.2]}>
                    <View style={styles.logoContainer}>
                        <Image style={styles.logo} source={require('../../../assets/logo.gif')}/>
                        {title}
                        {description}
                        <LoginForm loginAction={this.login} getEmail={(data) => this.setState({email: data})}
                                   getPassword={(data) => this.setState({password: data})}/>
<<<<<<< HEAD
=======
                        <Text style={styles.footer}>
                            Version 0.1 © 2018 All Rights Reserved
                        </Text>
>>>>>>> 4e4874950ba4d39e696f0be322b3bf2ce863bafa
                        {this.renderFbLogin()}
                    </View>
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
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        width: 200,
        height: 200
    },
    title: {
        marginTop: 20,
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
        padding: 10,
<<<<<<< HEAD
        borderRadius: 10,
        backgroundColor: '#3B5998',
        opacity: 0.9
=======
        borderRadius: 5,
        backgroundColor: '#3B5998'
>>>>>>> 4e4874950ba4d39e696f0be322b3bf2ce863bafa
    },
    facebookTxt: {
        color: '#FFF'
    }
});
