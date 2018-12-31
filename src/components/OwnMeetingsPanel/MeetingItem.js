import {Image, Text, View, TouchableOpacity, StyleSheet} from "react-native";
import React from "react";

const meetingItem = props => {
    return(
        <TouchableOpacity style={styles.container} onPress={() => props.pressAction(props.meetingItem)}>
            <View style={styles.leftBox}>
                <Text style={styles.text}>Place: {props.meetingItem.params.placeDescription.replace(/(\r\n\t|\n|\r\t)/gm,' ')}</Text>
                <Text style={styles.text}>Description: {props.meetingItem.params.description}</Text>
                <Text style={styles.text}>Hour: {props.meetingItem.params.pickedTime}</Text>
                <Text style={styles.text}>Multi Meeting: {props.meetingItem.is_one_to_one ? 'Yes' : 'No'}</Text>
                <Text style={styles.text}>Category: {props.meetingItem.params.categoryName}</Text>
            </View>
            <View style={{borderLeftWidth:1, borderColor:'#373D3F', height: '85%'}}></View>
            <View style={styles.rightBox}>
                <Text style={styles.category}>Empty meeting</Text>
            </View>
        </TouchableOpacity>
    );
};

export default meetingItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: 150,
        backgroundColor: '#eee',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    leftBox: {
        width: '60%',
        alignSelf: 'flex-start',
        marginRight: 'auto'
    },
    rightBox: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        marginLeft: 'auto'
    },
    text: {
        marginLeft: 5,
        marginTop: 4,
        marginBottom: 3
    }
});