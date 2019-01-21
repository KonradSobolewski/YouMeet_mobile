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
import {Font, LinearGradient} from 'expo';
import ConstKeys from '../../config/app.consts'
import {validateEmail, validateLength} from "../../services/string.service";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../config/colors'

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
        account: 'personal',
        genderState: false,
        accountTypeState: false
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
                        gender: this.state.gender,
                        account: this.state.account
                    }
                })
            })
                .then(res => {
                    if (res.status === 200) {
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
        this.state.genderState = !this.state.genderState;
        this.forceUpdate();
    };

    setAccountType = (value) => {
        if (value) {
            this.state.account = 'business';
        } else {
            this.state.account = 'personal'
        }
        this.state.accountTypeState = !this.state.accountTypeState;
        this.forceUpdate();
    };

    render() {
        let age = <Text style={styles.label}>
            Your age: {this.state.age}
        </Text>;
        let gender = <Text style={styles.switchLabel}>
            Gender:
        </Text>;
        let accountType = <Text style={styles.switchLabel}>Account type: </Text>;
        let register = <Text style={styles.registerText}>REGISTER</Text>;

        return (
            <LinearGradient colors={['white', '#ddb6ca']} locations={[0.3, 1]} style={styles.gradient}>
                <KeyboardAvoidingView behavior="padding" style={styles.container}>

                    <ScrollView contentContainerStyle={styles.scrollView}>
                        <View style={styles.fieldsContainer}>
                            <Image style={styles.logo} source={require('../../../assets/images/logo2.gif')}/>
                            <TextInput
                                style={[styles.input, this.state.firstNameValid === true ? null : styles.inputInvalid]}
                                placeholder="First name"
                                placeholderTextColor="rgba(0,0,0,0.4)"
                                onSubmitEditing={() => this.lastNameInput.focus()}
                                autoCorrect={false}
                                onChangeText={(value) => this.updateState('firstName', value)}
                            />
                            <TextInput
                                style={[styles.input, this.state.lastNameValid === true ? null : styles.inputInvalid]}
                                placeholder="Last name"
                                placeholderTextColor="rgba(0,0,0,0.4)"
                                onSubmitEditing={() => this.emailInput.focus()}
                                autoCorrect={false}
                                onChangeText={(value) => this.updateState('lastName', value)}
                                ref={(input) => this.lastNameInput = input}
                            />
                            <TextInput
                                style={[styles.input, this.state.emailValid === true ? null : styles.inputInvalid]}
                                placeholder="Email"
                                placeholderTextColor="rgba(0,0,0,0.4)"
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
                                placeholderTextColor="rgba(0,0,0,0.4)"
                                ref={(input) => this.passwordInput = input}
                                onChangeText={(value) => this.updateState('password', value)}
                            />
                            {age}
                            <Slider value={this.state.age}
                                    step={1}
                                    maximumValue={50}
                                    minimumValue={18}
                                    onSlidingComplete={(value) => this.setAge(value)}
                                    minimumTrackTintColor='white'
                                    thumbTintColor={'white'}
                                    style={styles.slider}/>
                            <View style={styles.switchContainer}>
                                {gender}
                                <Ionicons name="md-male" size={23} color={"white"} style={styles.genderIcon}/>
                                <Switch trackColor={{false: 'blue', true: 'red'}}
                                        thumbColor={'white'}
                                        value={this.state.genderState}
                                        onValueChange={(value) => this.setGender(value)}/>
                                <Ionicons name="md-female" size={23} color={"white"} style={styles.genderIcon}/>
                            </View>
                            <View style={styles.switchContainer}>
                                {accountType}
                                <Ionicons name="md-body" size={23} color={"white"} style={styles.genderIcon}/>
                                <Switch trackColor={{false: 'blue', true: 'red'}}
                                        thumbColor={'white'}
                                        value={this.state.accountTypeState}
                                        onValueChange={(value) => this.setAccountType(value)}/>
                                <Ionicons name="md-briefcase" size={23} color={"white"} style={styles.genderIcon}/>
                            </View>
                            <TouchableOpacity style={styles.registerBtn} onPress={this.register}
                                              disabled={!(this.areFieldsValid && this.state.isTouched)}>
                                {register}
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
        height: '100%'
    },
    scrollView: {
        alignItems: 'center'
    },
    fieldsContainer: {
        margin: 5,
        width: '80%',
        alignItems: 'center'
    },
    logo: {
        width: 200,
        height: 200
    },
    input: {
        width: '80%',
        marginTop: 12,
        borderRadius: 15,
        borderBottomWidth: 1,
        borderBottomColor: Colors.black,
        height: 40,
        padding: 10,
    },
    inputInvalid: {
        backgroundColor: 'rgba(255,51,0,0.2)'
    },
    registerBtn: {
        borderRadius: 5,
        marginTop: 15,
        marginBottom: 35,
        backgroundColor: Colors.theme,
        padding: 15,
        elevation: 2,
        width: '80%'
    },
    registerText: {
        fontSize: 15,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Cabin',
        letterSpacing: 3
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
        padding: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: {width: 0, height: 1},
        textShadowRadius: 5
    },
    label: {
        marginTop: 5,
        padding: 5,
        paddingBottom: 0,
        color: Colors.black,
        fontSize: 15,
        fontFamily: 'Cabin'
    },
    switchLabel: {
        padding: 5,
        color: Colors.black,
        fontSize: 15,
        marginRight: 10,
        fontFamily: 'Cabin'
    }
});
