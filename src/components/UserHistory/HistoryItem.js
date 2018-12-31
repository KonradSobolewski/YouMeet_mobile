import React from 'react'
import {Image, StyleSheet, Text, View} from "react-native";
import {getMetUserIcon} from "../../services/user.service";
import styles from '../../config/ListItemStyle';

const historyItem = props => {
    let date = new Date(Date.parse(props.historyData.params.startDate));
    let minutes = (date.getMinutes() < 10 ? '0':'') + date.getMinutes();
    let dateTime = date.toDateString() + ' ' + date.getHours() + ':' + minutes;
    console.log('\n\n\n' + props.historyData.meeting_id + '\n\n\n');
    return(
        <View style={styles.container}>
            {props.historyData.params.photo ? (
                <Image source={{uri: props.historyData.params.photo}} style={styles.userIcon}/>) : (
                <Image source={getMetUserIcon(props.historyData.params.gender)} style={styles.userIcon}/>)
            }
            <View style={styles.rightBox}>
                <Text style={styles.person}>{props.historyData.params.firstName + ' ' + props.historyData.params.lastName + ', ' + props.historyData.params.age}</Text>
                <Text style={styles.description}>{props.historyData.params.placeDescription.replace(/(\r\n\t|\n|\r\t)/gm,' ')}</Text>
            </View>
            <View style={styles.leftBox}>
                <Text style={styles.date}>{dateTime}</Text>
                <Text style={styles.category}>Category: {props.historyData.params.categoryName}</Text>
            </View>
        </View>
    );
};

export default historyItem;
