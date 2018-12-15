import React from "react";
import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Text, Picker
} from "react-native";
import {LinearGradient} from "expo";
import ConstKeys from '../../config/app.consts'
import {getAllHobbies, getAllUserHobbies} from "../../services/hobby.service";
import {matchResponseToUserInfo, updateUser} from "../../services/user.service";
import {validateLength} from "../../services/string.service";
import UserInfo from "../HomeMap/UserInfo";
import HobbyItem from './HobbyItem';

export default class AccountInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {
                firstName: ConstKeys.userInfo.firstName,
                lastName: ConstKeys.userInfo.lastName,
                photo: ConstKeys.userInfo.photo,
                userHobbies: []
            },
            selectedValue: 1,
            hobbies: []
        };
        this.getUserHobbies();
        this.getHobbies();
    }

    getHobbies = () => {
        getAllHobbies().then(res => res.json().then(data => {
            const tempHobbies = [];
            data.map(hobby => tempHobbies.push(hobby.name));
            this.setState({hobbies: tempHobbies});
        }))
            .catch(err => {
                console.log(err);
                this.props.navigation.navigate('homePage')
            })
    };

    getUserHobbies = () => {
        getAllUserHobbies(ConstKeys.userInfo.email).then(res => res.json().then(data => {
            const tempHobbies = [];
            data.map(hobby => tempHobbies.push(hobby.name));
            this.state.userInfo.userHobbies = tempHobbies;
            this.forceUpdate();
        }))
            .catch(err => {
                console.log(err);
            })
    };

    addUserHobby = (hobby) => {
        if (this.state.userInfo.userHobbies.indexOf(hobby) < 0) {
            this.state.userInfo.userHobbies.push(hobby);
        }
        this.forceUpdate();
    };

    deleteUserHobby = (hobby) => {
        const index = this.state.userInfo.userHobbies.indexOf(hobby);
        if (index >= 0) {
            this.state.userInfo.userHobbies.splice(index, 1);
        }
        this.forceUpdate();
    };

    updateUserInfo = () => {
        if (this.validate()) {
            updateUser(this.state.userInfo)
                .then(res => {
                    res.json().then(data => {
                        ConstKeys.userInfo = matchResponseToUserInfo(data);
                    });
                    this.props.navigation.navigate('homePage')
                })
                .catch(err => console.log(err));
        }
    };

    validate = () => {
        return !!(validateLength(this.state.userInfo.firstName) && validateLength(this.state.userInfo.lastName));
    };

    setFirstName = (value) => {
        this.state.userInfo.firstName = value;
    };

    setLastName = (value) => {
        this.state.userInfo.lastName = value;
    };

    render() {
        let hobbies = this.state.hobbies.map(hobby => {
            return (
                <Picker.Item label={hobby} value={hobby}/>
            )
        });

        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <LinearGradient colors={['#7b258e', '#B39DDB']} style={styles.gradient} start={[0.2, 0]} end={[0.4, 1]}>
                    <ScrollView >
                        <UserInfo navigator={this.props.navigation} showHamburger={false}/>
                        <View style={styles.scrollView}>
                            <Text style={styles.label}>
                                First Name:
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="First name"
                                placeholderTextColor="rgba(255,255,255,0.5)"
                                autoCorrect={false}
                                onChangeText={(value) => this.setFirstName(value)}
                                defaultValue={this.state.userInfo.firstName}
                            />
                            <Text style={styles.label}>
                                Last Name:
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Last name"
                                placeholderTextColor="rgba(255,255,255,0.5)"
                                autoCorrect={false}
                                onChangeText={(value) => this.setLastName(value)}
                                defaultValue={this.state.userInfo.lastName}
                            />
                            <Text style={styles.label}>
                                Choose hobby:
                            </Text>
                            <Picker
                                selectedValue={this.state.selectedValue}
                                prompt={"Choose hobby..."}
                                style={styles.picker}
                                itemStyle={styles.input}
                                onValueChange={(itemValue, itemIndex) => {
                                    this.addUserHobby(itemValue);
                                    this.state.selectedValue = itemValue;
                                }}>
                                {hobbies}
                            </Picker>
                            <Text style={styles.label}>
                                Your hobbies:
                            </Text>
                            <View style={styles.hobbyContainer}>
                                {this.state.userInfo.userHobbies.map(hobby => {
                                    return (
                                        <HobbyItem itemName={hobby} deleteHobby={(value) => this.deleteUserHobby(value)}/>
                                    )})
                                }
                            </View>
                            <TouchableOpacity style={styles.submitButton} onPress={() => this.updateUserInfo()}>
                                <Text style={styles.submitText}>Update</Text>
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
        backgroundColor: '#e2e2e2'
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
    scrollView: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    label: {
        marginTop: 5,
        padding: 5,
        paddingBottom: 0,
        color: 'white',
        fontSize: 15
    },
    picker: {
        marginTop: 15,
        backgroundColor: 'rgba(255,255,255,0.2)',
        height: 40,
        color: 'white',
        padding: 10,
        width: '80%'
    },
    input: {
        width: '80%',
        borderRadius: 15,
        backgroundColor: 'rgba(255,255,255,0.2)',
        height: 40,
        color: '#FFF',
        padding: 10
    },
    inputInvalid: {
        backgroundColor: 'rgba(255,51,0,0.2)'
    },
    submitButton: {
        borderRadius: 15,
        marginTop: 35,
        backgroundColor: 'rgba(255,255,255,0.3)',
        padding: 10,
        width: '80%'
    },
    submitText: {
        fontSize: 15,
        color: 'white',
        textAlign: 'center'
    },
    hobbyContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});