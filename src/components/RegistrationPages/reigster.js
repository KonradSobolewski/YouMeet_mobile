import React from 'react';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import {LinearGradient} from 'expo';
import ConstKeys from '../../config/app.consts'

export default class App extends React.Component {
    static navigationOptions = {
        header: null
    };
    state = {
        firstName: null,
        lastName: null,
        email: null,
        password: null
    };

    setFirstName = (value) =>{
        this.state.firstName = value;
    };
    setLastName = (value) => {
        this.state.lastName = value;
    };
    setEmail = (value) => {
        this.state.email = value;
    };
    setPassword = (value) => {
        this.state.password = value;
    };

    validateFields = () => {
        let reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/ ;
        if (this.state.firstName === null || this.state.lastName === null || this.state.email === null || this.state.password === null) {
            return false;
        } else if ( !reg.test(this.state.email) ) {
            return false;
        }
        return true;
    };

    register = () => {
        if (this.validateFields()) {
            fetch(ConstKeys.apiUrl + '/createUser', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    password: this.state.password,
                })
            })
                .then(res => {
                    if (res.status === 200) {
                        console.log(JSON.parse(res._bodyText));
                        this.props.navigation.navigate('loginPage', {
                            regInfo: true
                        });
                    }
                })
                .catch(err => console.log(err))
        } else {
            Alert.alert('Invalid data.');
        }

    };

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <LinearGradient colors={['#9C27B0', '#B39DDB', '#4527A0']} style={styles.gradient} start={[0.2, 0]} end={[0.8, 1.2]}>
                    <View style={styles.fieldsContainer}>
                        <StatusBar
                            barStyle="light-content"
                        />
                        <Image style={styles.logo} source={require('../../../assets/logo.png')}/>
                        <TextInput style={styles.input}
                                   placeholder="First name"
                                   placeholderTextColor="rgba(255,255,255,0.5)"
                                   onSubmitEditing={() => this.lastNameInput.focus()}
                                   autoCorrect={false}
                                   onChangeText={(value) => this.setFirstName(value)}
                        />
                        <TextInput style={styles.input}
                                   placeholder="Last name"
                                   placeholderTextColor="rgba(255,255,255,0.5)"
                                   onSubmitEditing={() => this.emailInput.focus()}
                                   autoCorrect={false}
                                   onChangeText={(value) => this.setLastName(value)}
                                   ref={(input) => this.lastNameInput = input}
                        />
                        <TextInput style={styles.input}
                                   placeholder="Email"
                                   placeholderTextColor="rgba(255,255,255,0.5)"
                                   onSubmitEditing={() => this.passwordInput.focus()}
                                   keyboardType="email-address"
                                   autoCapitalize="none"
                                   autoCorrect={false}
                                   onChangeText={(value) => this.setEmail(value)}
                                   ref={(input) => this.emailInput = input}
                        />

                        <TextInput style={styles.input}
                                   placeholder="Password"
                                   secureTextEntry
                                   placeholderTextColor="rgba(255,255,255,0.5)"
                                   ref={(input) => this.passwordInput = input}
                                   onChangeText={(value) => this.setPassword(value)}
                        />
                        <TouchableOpacity style={styles.registerBtn} onPress={this.register}>
                            <Text style={styles.registerText}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        height: '100%',
        alignItems: 'center'
    },
    fieldsContainer: {
        margin: 20,
        width: '80%',
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        width: 200,
        height: 200
    },
    input: {
        width: '80%',
        marginTop: 15,
        borderRadius: 15,
        backgroundColor: 'rgba(255,255,255,0.2)',
        height: 40,
        color: '#FFF',
        padding: 10
    },
    registerBtn: {
        borderRadius: 15,
        marginTop: 35,
        backgroundColor: 'rgba(255,255,255,0.3)',
        padding: 10,
        width: '80%'
    },
    registerText: {
        fontSize: 15,
        color: 'white',
        textAlign: 'center'
    }
});
