import {Image, Text, View, TouchableOpacity, StyleSheet} from "react-native";
import React from "react";
import Colors from '../../config/colors'
import team from '../../../assets/images/team.png'
import man from '../../../assets/images/man.png'
import girl from '../../../assets/images/girl.png'

const meetingItem = props => {
    return(
        <TouchableOpacity style={styles.container} onPress={() => props.pressAction(props.meetingItem)}>
            <View style={styles.leftBox}>
                <Text style={styles.text}>Place: {props.meetingItem.params.placeDescription.replace(/(\r\n\t|\n|\r\t)/gm,' ')}</Text>
                <Text style={styles.text}>Description: {props.meetingItem.params.description}</Text>
                <Text style={styles.text}>Hour: {props.meetingItem.params.pickedTime}</Text>
                <Text style={styles.text}>Multi Meeting: {props.meetingItem.is_one_to_one ? 'No' : 'Yes'}</Text>
                <Text style={styles.text}>Category: {props.meetingItem.params.categoryName}</Text>
            </View>
            <View style={{borderLeftWidth:1, borderColor:Colors.black, height: '85%'}}></View>
            <View style={styles.rightBox}>
                <TouchableOpacity style={styles.rightContent} onPress={() => props.showJoinModal(props.joiners[props.meetingItem.meeting_id], props.meetingItem)}>
                    {props.joiners[props.meetingItem.meeting_id].length > 0 ?
                        (getProperIcon(props.joiners[props.meetingItem.meeting_id])) :
                        (<Text style={styles.category}>Empty meeting</Text>) }
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

function getProperIcon(joiners) {
    if (joiners.length === 1) {
        if (joiners[0].params.photo !== undefined) {
            return <Image source={{uri: joiners[0].params.photo}} style={styles.userIcon}/>;
        } else {
            return <Image source={getPhotoByGender(joiners[0].params.gender)} style={styles.userIcon}/>;
        }
    } else {
        return <Image source={team} style={styles.userIcon}/>;
    }
}
function getPhotoByGender(gender) {
    return gender === 'male' ? man : girl;
}

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
        height: '80%',
        marginLeft: 'auto'
    },
    rightContent: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userIcon: {
        width: 100,
        height: 100,
        padding: 10,
        borderRadius : 50,
        borderColor: 'white',
        borderWidth: 1,
        elevation: 1
    },
    text: {
        marginLeft: 5,
        marginTop: 4,
        marginBottom: 3
    }
});