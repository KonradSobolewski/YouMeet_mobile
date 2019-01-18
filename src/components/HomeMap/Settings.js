import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, KeyboardAvoidingView,} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Font, LinearGradient} from "expo";
import UserInfo from "./UserInfo";
import Colors from '../../config/colors'

export default class Settings extends React.Component {
    state = {};

    goToAccountInfo = () => {
        this.props.navigation.navigate('accountInfo');
    };

    goToAppSettings = () => {
        this.props.navigation.navigate('appSettings');
    };

    render() {
        let edit = <Text style={styles.text}>
            Edit account
        </Text>;
        let app = <Text style={styles.text}>
            App settings
        </Text>;
        let premium = <Text style={styles.text}>
            Buy premium
        </Text>;
        let footerTxt = <Text style={styles.footerTxt}>
            YouMeet &copy; version 0.2
        </Text>;

        return (
            <LinearGradient colors={['white', '#ddb6ca']} locations={[0, 0.8]} style={styles.gradient}>
                <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <ScrollView>
                        <UserInfo showHamburger={true} navigator={this.props.navigation}/>
                        <View style={styles.area}>
                            <TouchableOpacity style={styles.button} onPress={this.goToAccountInfo}>
                                <Ionicons name="md-person" size={70} color={Colors.theme} style={styles.icon}/>
                                {edit}
                            </TouchableOpacity>
                            <View style={{borderWidth: 1, borderColor: Colors.theme, width: 150}}></View>
                            <TouchableOpacity style={styles.button} onPress={this.goToAppSettings}>
                                <Ionicons name="md-settings" size={70} color={Colors.theme} style={styles.icon}/>
                                {app}
                            </TouchableOpacity>

                            <View style={{borderWidth: 1, borderColor: Colors.theme, width: 150}}></View>
                            <TouchableOpacity style={styles.button} onPress={this.goToAppSettings}>
                                <Ionicons name="md-cash" size={70} color={Colors.theme} style={styles.icon}/>
                                {premium}
                            </TouchableOpacity>

                        </View>
                    </ScrollView>
                    <View style={styles.footer}>
                        {footerTxt}
                    </View>
                </KeyboardAvoidingView>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
    area: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 10,
        marginTop: 130,
        margin: 20,
        padding: 20,
        justifyContent: 'center', alignItems: 'center', elevation: 1
    },
    button: {
        margin: 20,
        padding: 5,
        elevation: 1
    },
    text: {
        fontSize: 20,
        fontFamily: 'Dosis',
        color: Colors.black,
        letterSpacing: 1,
    },
    icon: {
        alignSelf: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: {width: 0, height: 1},
        textShadowRadius: 5
    },
    footer: {
        padding: 10,
        position: 'absolute', left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center',
    },
    footerTxt: {
        color: Colors.black,
        fontFamily: 'Dosis',
        fontSize: 13,
    },
});
