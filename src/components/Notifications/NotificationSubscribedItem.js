import React from 'react'
import {Image, StyleSheet, Text, View} from "react-native";
import {getMetUserIcon} from "../../services/user.service";
import ConstKeys from "../../config/app.consts";
import styles from '../../config/ListItemStyle';

const notificationSubscribedItem = props => {
    let date = new Date(Date.parse(props.historyData.params.creationDate));
    let isAccepted = !props.historyData.params.joinerId.includes(ConstKeys.userInfo.id);
    return(
        <View style={[styles.container, isAccepted === true ? styles.acceptedTo : styles.rejectedFrom]}>
            {props.historyData.params.photo ? (
                <Image source={{uri: props.historyData.params.photo}} style={styles.userIcon}/>) : (
                <Image source={getMetUserIcon(props.historyData.params.gender)} style={styles.userIcon}/>)
            }
            <View style={styles.rightBox}>
                <Text style={styles.person}>{props.historyData.params.firstName + ' ' + props.historyData.params.lastName + ', ' + props.historyData.params.age}</Text>
                <Text style={styles.description}>{props.historyData.params.placeDescription.replace(/(\r\n\t|\n|\r\t)/gm,' ')}</Text>
            </View>
            <View style={styles.leftBox}>
                <Text style={styles.date}>{date.toDateString() + ' ' + date.getHours() + ':' + date.getMinutes()}</Text>
                <Text style={styles.category}>Category: {props.historyData.params.categoryName}</Text>
            </View>
        </View>
    );
};

export default notificationSubscribedItem;
