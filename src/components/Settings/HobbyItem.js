import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../config/colors'

const hobbyItem = props => {
    let text =  <Text style={styles.text}>{props.itemName}</Text>;

    return (
        <View>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => props.deleteHobby(props.itemName)}>
                {text}
                {props.showDeleteButton ? (<Ionicons name="md-close" size={17} color={"red"} style={styles.icon}/>) : null }
            </TouchableOpacity>
        </View>
    );
};

export default hobbyItem;

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10,
        marginHorizontal: 5,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'rgba(255,104,104,0.1)',
        color: 'white',
        padding: 5,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        elevation: 1,
        fontFamily: 'Cabin'
    },
    text: {
        fontSize: 12,
        color: 'black',
        textAlign: 'center'
    },
    icon: {
        paddingRight: 2,
        paddingLeft: 7
    }
});