import React from 'react';
import {StyleSheet, View, Image, Text, KeyboardAvoidingView, TouchableOpacity, Alert} from 'react-native';
import LoginForm from './LoginForm'
import {Font, LinearGradient} from 'expo';
import ConstKeys from '../../config/app.consts'

export default class Login extends React.Component {
    async componentDidMount() {
        await Font.loadAsync({
            'Courgette': require('../../../assets/fonts/Courgette-Regular.ttf'),
        });
        this.setState({ fontLoaded: true });
    }
    static navigationOptions = {
        header: null
    };

    state = {
        email: null,
        password: null,
        fontLoaded: false
    };

    validateFields = () => {
        let reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/ ;
        if (this.state.email === null || this.state.password === null) {
            return false;
        } else if ( !reg.test(this.state.email) ) {
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

    render() {
        let title = null;
        let description = null;
        if (this.state.fontLoaded ) {
            title =  <Text style={styles.title}> YouMeet </Text>;
            description =  <Text style={styles.description}>Meet new people in interesting places</Text>;
        }
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <LinearGradient colors={['#9C27B0', '#B39DDB', '#4527A0']} style={styles.gradient} start={[0.2, 0]} end={[0.8, 1.2]}>
                    <View style={styles.logoContainer}>
                        <Image style={styles.logo} source={require('../../../assets/logo.gif')}/>
                        {title}
                        {description}
                        <LoginForm loginAction={this.login} getEmail={(data) => this.setState({email: data})}
                                   getPassword={(data) => this.setState({password: data})}/>
                        <Text style={styles.footer}>
                            Version 0.1 © 2018 All Rights Reserved
                        </Text>
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
    }
});
