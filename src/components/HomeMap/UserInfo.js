import React from 'react'
import {Image, StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import ConstKeys from '../../config/app.consts'
import humburger from '../../../assets/images/humburger.png'
import {getUserIcon} from "../../services/user.service";
import Colors from '../../config/colors'

const userInfo = props => {
    let info = <Text style={styles.userNick}>
            {ConstKeys.userInfo.name}, {ConstKeys.userInfo.age}
        </Text>;
    return (
        <View style={styles.userView}>
            <View style={styles.container}>
                {props.showHamburger ? (
                    <TouchableOpacity style={styles.humburgerContainer} onPress={() => props.navigator.toggleDrawer()}>
                        <Image source={humburger} style={styles.humburger}/>
                    </TouchableOpacity>) : (null)}
                {info}
                {ConstKeys.userInfo.photo ? (
                    <Image source={{uri: ConstKeys.userInfo.photo}} style={styles.userIcon}/>) : (
                    <Image source={getUserIcon()} style={styles.userIcon}/>)
                }
            </View>
        </View>
    );
};

export default userInfo;

const styles = StyleSheet.create({
    userView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 80,
        zIndex: 1,
    },
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 80,
        borderBottomWidth: 2,
        borderBottomColor: Colors.theme,
        width: '100%',
        backgroundColor: 'white',
        elevation: 5
    },
    humburgerContainer: {
        position: 'absolute', top: 0, left: 0
    },
    humburger: {
        padding: 10,
        margin: 10,
        width: 40, height: 40,
        tintColor: Colors.black
    },
    userIcon: {
        zIndex: 2,
        position: 'absolute',
        top: 43,
        right: 20,
        padding: 10,
        width: 70, height: 70, borderRadius: 35,
        borderWidth: 2,
        borderColor: Colors.theme
    },
    userNick: {
        top: 45,
        right: 110,
        position: 'absolute',
        fontSize: 20,
        fontFamily: 'Cabin',
        color: Colors.black,
    }
});
