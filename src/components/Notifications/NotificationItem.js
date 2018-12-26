import React from 'react'
import {Image, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {getMetUserIcon} from "../../services/user.service";
import Ionicons from 'react-native-vector-icons/Ionicons';

const notificationItem = props => {
    let date = new Date(Date.parse(props.historyData.params.startDate));
    console.log('chuj');
    return(
        <View style={styles.container}>
                <Text style={styles.person}>{props.historyData.meeting_id}</Text>
                <TouchableOpacity onPress={() => props.acceptMeeting(props.historyData.meeting_id, props.historyData.params.joinerId[0])}>
                    <Ionicons name="md-add-circle" size={30} color={'#373D3F'} style={styles.icon}/>
                </TouchableOpacity>
        </View>
    );
};

export default notificationItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: 70,
        backgroundColor: '#eee',
        flexDirection: 'row',
    },
    person: {
        margin: 10,
        marginBottom: 5,
        fontSize: 15,
        color: '#373D3F',
        fontFamily: 'Cabin',
    },
    description: {
        margin: 10,
        marginBottom : 15,
        fontSize: 12,
        color: '#373D3F',
        fontFamily: 'Cabin',
    },
    rightBox: {
        alignSelf: 'flex-start',
        marginRight: 'auto'
    },
    leftBox: {
        alignSelf: 'flex-end',
        marginLeft: 'auto'
    },
    date: {
        margin: 5,
        fontSize: 10,
        color: '#373D3F',
        fontFamily: 'Cabin',
        alignSelf: 'center',
        textAlign: 'center',
    },
    category: {
        margin: 15,
        fontSize: 10,
        color: '#373D3F',
        fontFamily: 'Cabin',
        alignSelf: 'center',
        textAlign: 'center',
    },
    userIcon: {
        margin: 10,
        width: 50, height: 50, borderRadius: 25,
    },
});
