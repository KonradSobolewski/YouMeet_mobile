import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    KeyboardAvoidingView,
    Alert,
    TouchableOpacity,
    Modal,
    TouchableHighlight
} from 'react-native';
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
        userInfo: null,
        errorDuringLog: false
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
                        this.setState({errorDuringLog: false});
                        this.props.navigation.navigate('homePage', {
                            auth: res.headers.map.bearer
                        });
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
            await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture.type(large)`)
                .then(async res => {
                    let userInfo = await res.json();
                    console.log(userInfo);
                    if (userInfo.error === undefined) {
                        this.props.navigation.navigate('homePage', {
                            fbInfo: userInfo,
                            auth: 'lol'
                        });
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
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <LinearGradient colors={['#7b258e', '#B39DDB', '#3b2281']} style={styles.gradient}
                                locations={[0, 0.4, 1]} start={[0.2, 0]} end={[0.8, 1.2]}>
                    <View style={styles.logoContainer}>
                        {errorDuringUpload}

                        <Image style={styles.logo} source={require('../../../assets/logo.gif')}/>
                        {title}
                        {description}
                        <LoginForm loginAction={this.login} getEmail={(data) => this.setState({email: data})}
                                   getPassword={(data) => this.setState({password: data})}/>
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
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#3B5998',
        opacity: 0.9
    },
    facebookTxt: {
        color: '#FFF'
    },
    errorMessage: {
        backgroundColor: 'rgba(255,51,0,0.1)',
        borderRadius: 10,
        color: 'rgba(255,77,77,0.9)',
        fontSize: 15,
        padding: 15,
        marginTop: 25
    }
});
