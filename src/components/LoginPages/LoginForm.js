import React from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';

export default class LoginForm extends React.Component {
    setEmail(value) {
        this.props.getEmail(value);
    }
    setPassword(value){
        this.props.getPassword(value);
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input}
                           placeholder="Email"
                           placeholderTextColor="rgba(255,255,255,0.3)"
                           onSubmitEditing={() => this.passwordInput.focus()}
                           keyboardType="email-address"
                           autoCapitalize="none"
                           autoCorrect={false}
                           onChangeText={(email) => this.setEmail(email)}
                />

                <TextInput style={styles.input}
                           placeholder="Password"
                           secureTextEntry
                           placeholderTextColor="rgba(255,255,255,0.3)"
                           ref={(input) => this.passwordInput = input}
                           onChangeText={(password) => this.setPassword(password)}
                />
                <TouchableOpacity style={styles.buttonContainer} onPress={this.props.loginAction}>
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
        marginTop: 5,
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
