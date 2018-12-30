import {Image, Text, View, TouchableOpacity, StyleSheet} from "react-native";
import React from "react";

const meetingItem = props => {
    return(
        <TouchableOpacity style={styles.container} onLongPress={() => props.pressAction(props.meetingItem)}>
            {/*{props.meetingItem.params.photo ? (*/}
                {/*<Image source={{uri: props.meetingItem.params.photo}} style={styles.userIcon}/>) : (*/}
                {/*<Image source={getMetUserIcon(props.meetingItem.params.gender)} style={styles.userIcon}/>)*/}
            {/*}*/}
            {/*<View style={styles.rightBox}>*/}
                {/*<Text style={styles.person}>{props.meetingItem.params.firstName + ' ' + props.meetingItem.params.lastName + ', ' + props.meetingItem.params.age}</Text>*/}
                {/*<Text style={styles.description}>{props.meetingItem.params.placeDescription.replace(/(\r\n\t|\n|\r\t)/gm,' ')}</Text>*/}
            {/*</View>*/}
            {/*<View style={styles.leftBox}>*/}
                {/*<Text style={styles.date}>{date.toDateString() + ' ' + date.getHours() + ':' + date.getMinutes()}</Text>*/}
                {/*<Text style={styles.category}>Category: {props.meetingItem.params.categoryName}</Text>*/}
            {/*</View>*/}
        </TouchableOpacity>
    );
};

export default meetingItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: 100,
        backgroundColor: '#eee',
        flexDirection: 'row',
    },
});