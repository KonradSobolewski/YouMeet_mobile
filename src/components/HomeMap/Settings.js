import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, KeyboardAvoidingView,} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {LinearGradient} from "expo";
import UserInfo from "./UserInfo";

export default class Settings extends React.Component {

    goToAccountInfo = () => {
        this.props.navigation.navigate('accountInfo');
    };

    goToAppSettings = () => {
        this.props.navigation.navigate('appSettings');
    };

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <LinearGradient colors={['#7b258e', '#B39DDB']} style={styles.gradient} start={[0.2, 0]} end={[0.4, 1]}>
                    <ScrollView>
                        <UserInfo showHamburger={true} style={styles.userIcon} navigator={this.props.navigation}/>
                        <View>
                            <TouchableOpacity style={styles.button} onPress={this.goToAccountInfo}>
                                <Text style={styles.text}>
                                    Edit account
                                </Text>
                                <Ionicons name="md-arrow-dropright" size={20} color={"black"} style={styles.icon}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={this.goToAppSettings}>
                                <Text style={styles.text}>
                                    App settings
                                </Text>
                                <Ionicons name="md-arrow-dropright" size={20} color={"black"} style={styles.icon}/>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </LinearGradient>
            </KeyboardAvoidingView>
        )
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
    button: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row'
    },
    text: {
        fontSize: 20
    },
    icon: {
        fontSize: 20,
        marginLeft: 'auto',
        paddingRight: 20
    }
});
