import React from "react";
import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Text
} from "react-native";
import {LinearGradient} from "expo";
import {isSignedIn} from "../../config/authorization";
import {getUserNameAndLastName} from '../../utils/StringUtils'

export default class AccountInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           userInfo: null,
            loaded: false
        };
    }

    componentDidMount() {
        isSignedIn()
            .then(res => {
                if(res !== false)
                    this.setState({userInfo: JSON.parse(res).userInfo});
                this.setState({loaded: true});
            })
            .catch(err => alert("An error occurred"));
    }

    render() {
        let userFirstName = null;
        let userLastName = null;
        if (this.state.loaded) {
            const {firstName, lastName} = getUserNameAndLastName(this.state.userInfo.name);
            userFirstName = firstName;
            userLastName= lastName ;
        }

        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <LinearGradient colors={['#7b258e', '#B39DDB']} style={styles.gradient} start={[0.2, 0]} end={[0.4, 1]}>
                    <ScrollView>
                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder="First name"
                                placeholderTextColor="rgba(255,255,255,0.5)"
                                autoCorrect={false}
                                onChangeText={(value) => console.log(this.state.userInfo)}
                                value={userFirstName}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Last name"
                                placeholderTextColor="rgba(255,255,255,0.5)"
                                autoCorrect={false}
                                onChangeText={(value) => console.log(this.state.userInfo)}
                                value={userLastName}
                            />
                            <View>
                                <TextInput
                                    style={styles.inputLikes}
                                    placeholder="Your interests"
                                    placeholderTextColor="rgba(255,255,255,0.5)"
                                    autoCorrect={false}
                                    onChangeText={(value) => console.log(this.state.userInfo)}
                                />
                                <TouchableOpacity style={styles.addLikesButton}>
                                    <Text style={styles.addLikesText}>Add</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.submitButton}>
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
        backgroundColor: '#e2e2e2',
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
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
    inputLikes: {

    },
    addLikesButton: {

    },
    addLikesText: {

    },
    submitButton: {

    },
    submitText: {

    }

});