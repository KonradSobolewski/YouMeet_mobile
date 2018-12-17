import React from 'react';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView, Slider, Switch
} from 'react-native';
import {LinearGradient} from 'expo';
import ConstKeys from '../../config/app.consts'
import {validateEmail, validateLength} from "../../services/string.service";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class App extends React.Component {
    state = {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        firstNameValid: true,
        lastNameValid: true,
        passwordValid: true,
        emailValid: true,
        isTouched: false,
        age: 18,
        gender: 'male',
        switchState: false,
    };

    updateState = (key, value) => {
        let result = validateLength(value);
        this.setState({isTouched: true});
        if (key === 'firstName') {
            this.setState({firstName: value, firstNameValid: result});
        }
        else if (key === 'lastName') {
            this.setState({lastName: value, lastNameValid: result});
        }
        else if (key === 'password') {
            this.setState({password: value, passwordValid: result});
        }
        else if (key === 'email') {
            result = result && validateEmail(this.state.email);
            this.setState({email: value, emailValid: result});
        }
    };

    areFieldsValid = () => {
        return this.state.firstNameValid && this.state.lastNameValid && this.state.passwordValid && this.state.emailValid;
    };

    register = () => {
        if (this.areFieldsValid()) {
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
                    params: {
                        age: this.state.age,
                        gender: this.state.gender
                    }
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

    setAge = (value) => {
        this.state.age = value;
        this.forceUpdate();
    };

    setGender = (value) => {
        if (value) {
            this.state.gender = 'female';
        } else {
            this.state.gender = 'male'
        }
        this.state.switchState = !this.state.switchState;
        this.forceUpdate();
    };

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <LinearGradient colors={['#7b258e', '#B39DDB', '#3b2281']} style={styles.gradient}
                                locations={[0, 0.4, 1]} start={[0.2, 0]} end={[0.8, 1.2]}>
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        <View style={styles.fieldsContainer}>
                            <Image style={styles.logo} source={require('../../../assets/images/logo.gif')}/>
                            <TextInput
                                style={[styles.input, this.state.firstNameValid === true ? null : styles.inputInvalid]}
                                placeholder="First name"
                                placeholderTextColor="rgba(255,255,255,0.5)"
                                onSubmitEditing={() => this.lastNameInput.focus()}
                                autoCorrect={false}
                                onChangeText={(value) => this.updateState('firstName', value)}
                            />
                            <TextInput
                                style={[styles.input, this.state.lastNameValid === true ? null : styles.inputInvalid]}
                                placeholder="Last name"
                                placeholderTextColor="rgba(255,255,255,0.5)"
                                onSubmitEditing={() => this.emailInput.focus()}
                                autoCorrect={false}
                                onChangeText={(value) => this.updateState('lastName', value)}
                                ref={(input) => this.lastNameInput = input}
                            />
                            <TextInput
                                style={[styles.input, this.state.emailValid === true ? null : styles.inputInvalid]}
                                placeholder="Email"
                                placeholderTextColor="rgba(255,255,255,0.5)"
                                onSubmitEditing={() => this.passwordInput.focus()}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={(value) => this.updateState('email', value)}
                                ref={(input) => this.emailInput = input}
                            />

                            <TextInput
                                style={[styles.input, this.state.passwordValid === true ? null : styles.inputInvalid]}
                                placeholder="Password"
                                secureTextEntry
                                placeholderTextColor="rgba(255,255,255,0.5)"
                                ref={(input) => this.passwordInput = input}
                                onChangeText={(value) => this.updateState('password', value)}
                            />
                            <Text style={styles.label}>
                                Your age: {this.state.age}
                            </Text>
                            <Slider value={this.state.age}
                                    step={1}
                                    maximumValue={50}
                                    minimumValue={18}
                                    onSlidingComplete={(value) => this.setAge(value)}
                                    minimumTrackTintColor='white'
                                    thumbTintColor={'white'}
                                    style={styles.slider}/>
                            <View style={styles.switchContainer}>
                                <Text style={styles.genderLabel}>
                                    Gender:
                                </Text>
                                <Ionicons name="md-male" size={23} color={"white"} style={styles.genderIcon}/>
                                <Switch trackColor={{false: 'blue', true: 'red'}}
                                        thumbColor={'white'}
                                        value={this.state.switchState}
                                        onValueChange={(value) => this.setGender(value)}/>
                                <Ionicons name="md-female" size={23} color={"white"} style={styles.genderIcon}/>
                            </View>
                            <TouchableOpacity style={styles.registerBtn} onPress={this.register}
                                              disabled={!(this.areFieldsValid && this.state.isTouched)}>
                                <Text style={styles.registerText}>Register</Text>
                            </TouchableOpacity>
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
    },
    gradient: {
        height: '100%'
    },
    scrollView: {
        alignItems: 'center'
    },
    fieldsContainer: {
        margin: 20,
        width: '80%',
        alignItems: 'center'
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
    inputInvalid: {
        backgroundColor: 'rgba(255,51,0,0.2)'
    },
    registerBtn: {
        borderRadius: 15,
        marginTop: 15,
        backgroundColor: 'rgba(255,255,255,0.3)',
        padding: 10,
        width: '80%'
    },
    registerText: {
        fontSize: 15,
        color: 'white',
        textAlign: 'center'
    },
    slider: {
        width: '80%',
        padding: 10,
    },
    switchContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        padding: 5,
    },
    genderIcon: {
        padding: 10
    },
    label: {
        marginTop: 5,
        padding: 5,
        paddingBottom: 0,
        color: 'white',
        fontSize: 15
    },
    genderLabel: {
        padding: 5,
        color: 'white',
        fontSize: 15,
        marginRight: 10
    }
});
