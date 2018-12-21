import React from 'react'
import {StyleSheet,Text, View} from "react-native";

const historyItem = props => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>{props.historyData.params.description}</Text>
        </View>
    );
};

export default historyItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: 70,
        backgroundColor: '#eee',
    },
    text: {
        fontSize: 15,
        color: '#373D3F',
        fontFamily: 'Cabin',
        alignSelf: 'center',
        textAlign: 'center',
    }
});