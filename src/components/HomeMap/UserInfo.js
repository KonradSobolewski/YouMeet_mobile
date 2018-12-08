import React from 'react'
import {Image, StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import ConstKeys from '../../config/app.consts'
import userIcon from '../../../assets/images/user.png'
import humburger from '../../../assets/images/humburger.png'
import {LinearGradient} from "expo";

const userInfo = props => {
    return (
        <View style={styles.userView}>
            <LinearGradient colors={['#ebc0fd', '#d9ded8']} style={styles.gradient}>
                <TouchableOpacity style={styles.humburgerContainer} onPress={() => props.navigator.toggleDrawer()}>
                    <Image source={humburger} style={styles.humburger}/>
                </TouchableOpacity>
                <Text style={styles.userNick}>
                    {ConstKeys.userInfo.name}
                </Text>
                {ConstKeys.userInfo.picture ? (
                    <Image source={{uri: ConstKeys.userInfo.picture.data.url}} style={styles.userIcon}/>) : (
                    <Image source={userIcon} style={styles.userIcon}/>)
                }
            </LinearGradient>
        </View>
    );
};

export default userInfo;

const styles = StyleSheet.create({
    userView: {
        height: 110
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 110,
        width: '100%',
        alignItems: 'flex-end',
        flexDirection: 'row',
    },
    humburgerContainer: {
        position: 'absolute', top: 0, left: 0
    },
    humburger: {
        padding: 10,
        margin: 10,
        width: 40, height: 40,
    },
    userIcon: {
        padding: 10,
        margin: 10,
        marginRight: 15,
        marginBottom: 20,
        width: 60, height: 60, borderRadius: 30,
        marginLeft: 'auto',
        borderWidth: 2,
        borderColor: 'white'
    },
    userNick: {
        padding: 10,
        marginLeft: 130,
        marginBottom: 20,
        fontSize: 20,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    }
});
