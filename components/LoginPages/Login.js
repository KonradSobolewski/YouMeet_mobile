import React from 'react';
import {StyleSheet, View, Image, Text, KeyboardAvoidingView} from 'react-native';
import LoginForm from './LoginForm'
import {LinearGradient} from 'expo';

export default class Login extends React.Component {

    static navigationOptions = {
        header: null
    };

    state = {
        email: null,
        password: null
    };

    setEmail = email => {
        this.state.email = email;
    };

    setPassword = password => {
        this.state.password = password;
    };

    login = () => {
        console.log(this.state.email + ' ' + this.state.password);
        fetch('http://192.168.8.101:8080/login', {
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
                if (res.status === 200) {
                    console.log(res);
                    this.props.navigation.navigate('homePage');
                }

            })
            .catch(err => console.log(err))
    };

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <LinearGradient colors={['#d05ce3', '#9c27b0', '#6a0080']} style={styles.gradient}>
                    <View style={styles.logoContainer}>
                        <Image style={styles.logo} source={require('../../assets/logo.png')}/>
                        <Text style={styles.title}>
                            YouMeet
                        </Text>
                        <Text style={styles.description}>
                            Meet new people in interesting places
                        </Text>
                        <LoginForm loginAction={this.login} getEmail={(data) => this.setEmail(data)}
                                   getPassword={(data) => this.setPassword(data)}/>
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
        fontSize: 20,
        color: '#FFF',
    },
    description: {
        fontSize: 10
    }
});
