import React from 'react'
import {Image, StyleSheet, Text, View} from 'react-native';

const userInfo = props => {
    return (
        <View style={styles.userView}>
            <Image source={{uri: props.onLoad.picture.data.url}} style={styles.userIcon}/>
            <Text style={styles.userNick}>
                {props.onLoad.name}
            </Text>
            <Text>
                ID: {props.onLoad.id}
            </Text>
        </View>
    );
};

export default userInfo;

const styles = StyleSheet.create({
    userView: {
        alignItems: 'center'
    },
    userIcon: {
        width: 100, height: 100, borderRadius: 50
    },
    userNick: {
        fontSize: 20
    }
});
