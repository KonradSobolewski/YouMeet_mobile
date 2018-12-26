import React from 'react'
import {Image, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {getMetUserIcon} from "../../services/user.service";
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../config/ListItemStyle';

const notificationItem = props => {
    let date = new Date(Date.parse(props.historyData.params.creationDate));
    let peopleWaiting = props.historyData.params.joinerId.length == 1 ? '1 person waiting!' : props.historyData.params.joinerId.length + ' people waiting!';
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.userIcon} onPress={() => props.acceptMeeting(props.historyData.meeting_id, props.historyData.params.joinerId[0])}>
                <Ionicons name="md-add-circle" size={30} color={'#373D3F'} style={styles.icon}/>
            </TouchableOpacity>
            <View style={styles.rightBox}>
                <Text style={styles.person}>{peopleWaiting}</Text>
                <Text style={styles.description}>{props.historyData.params.description}</Text>
            </View>
            <View style={styles.leftBox}>
                <Text style={styles.date}>{date.toDateString() + ' ' + date.getHours() + ':' + date.getMinutes()}</Text>
                <Text style={styles.description}>{props.historyData.params.placeDescription.replace(/(\r\n\t|\n|\r\t)/gm,' ')}</Text>
            </View>

        </View>
    );
};

export default notificationItem;
