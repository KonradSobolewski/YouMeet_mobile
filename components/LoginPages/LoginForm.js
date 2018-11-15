import React from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, StatusBar} from 'react-native';

export default class LoginForm extends React.Component {
    state = {
        email: null,
        password: null
    };

    login = () => {
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
            .then(res => console.log(res.headers.map.bearer))
            .catch(err => console.log(err))
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                />
                <TextInput style={styles.input}
                           placeholder="Email"
                           placeholderTextColor="rgba(255,255,255,0.3)"
                           onSubmitEditing={() => this.passwordInput.focus()}
                           keyboardType="email-address"
                           autoCapitalize="none"
                           autoCorrect={false}
                           onChangeText={(email) => this.setState({email})}
                />

                <TextInput style={styles.input}
                           placeholder="Password"
                           secureTextEntry
                           placeholderTextColor="rgba(255,255,255,0.3)"
                           ref={(input) => this.passwordInput = input}
                           onChangeText={(password) => this.setState({password})}
                />
                <TouchableOpacity style={styles.buttonContainer} onPress={this.login}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        width: '80%'
    },
    input: {
        marginTop: 15,
        borderRadius: 15,
        backgroundColor: 'rgba(255,255,255,0.2)',
        height: 40,
        color: '#FFF',
        padding: 10
    },
    buttonContainer: {
        borderRadius: 15,
        marginTop: 15,
        backgroundColor: 'rgba(255,255,255,0.5)',
        padding: 15
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    }
});
