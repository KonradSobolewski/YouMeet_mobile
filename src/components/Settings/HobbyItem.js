import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

const hobbyItem = props => {
    return (
        <View>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => props.deleteHobby(props.itemName)}>
                <Text style={styles.text}>{props.itemName}</Text>
                <Ionicons name="md-close" size={15} color={"red"} style={styles.icon}/>
            </TouchableOpacity>
        </View>
    );
};

export default hobbyItem;

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10,
        marginHorizontal: 5,
        borderRadius: 5,
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: '#FFF',
        padding: 5,
        flexDirection: 'row',
        alignSelf: 'flex-start'
    },
    text: {
        fontSize: 12,
        color: 'white',
        textAlign: 'center'
    },
    icon: {
        padding: 2,
        paddingLeft: 5
    }
});