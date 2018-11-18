import React from 'react'
import {Image, StyleSheet, Text, View} from 'react-native';

const userInfo = props => {
    return (
        <View style={styles.userView}>
            <Text style={styles.userNick}>
                {props.onLoad.name}
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
