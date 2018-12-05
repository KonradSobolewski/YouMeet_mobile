import React from 'react'
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import ConstKeys from '../../config/app.consts'
import userIcon from '../../../assets/images/user.png'
import humburger from '../../../assets/images/humburger.png'
import {MapView} from "expo";

const userInfo = props => {
    return (
        <View style={styles.userView}>
            <TouchableOpacity style={styles.humburgerContainer} onPress={ () => props.navigator.toggleDrawer()}>
                <Image source={humburger} style={styles.humburger}/>
            </TouchableOpacity>
            <Text style={styles.userNick}>
                {ConstKeys.userInfo.name}
            </Text>
            {ConstKeys.userInfo.picture ? ( <Image source={{uri: ConstKeys.userInfo.picture.data.url }} style={styles.userIcon}/>) : (<Image source={userIcon} style={styles.userIcon}/>)}
        </View>
    );
};

export default userInfo;

const styles = StyleSheet.create({
    userView: {
        width:'100%',
        alignItems: 'flex-end',
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        flex: 2
    },
    humburgerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    humburger: {
        padding: 10,
        margin: 10,
        width: 40, height: 40, borderRadius: 20,
    },
    userIcon: {
        padding: 10,
        margin: 10,
        marginRight: 15,
        width: 80, height: 80, borderRadius: 40,
        marginLeft: 'auto'
    },
    userNick: {
        padding: 10,
        marginLeft: 120,
        marginBottom: 10,
        fontSize: 20,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    }
});
