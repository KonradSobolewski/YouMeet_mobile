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
                {props.joiners[props.meetingItem.meeting_id].length > 0 ?
                    ( <TouchableOpacity style={styles.rightContent} onPress={() => props.showJoinModal([props.joiners[props.meetingItem.meeting_id][0]], props.meetingItem)}>
                        {getProperIcon(props.joiners[props.meetingItem.meeting_id])}
                    </TouchableOpacity>):
                        (<Text style={styles.category}>Empty meeting</Text>)
                }

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
        backgroundColor: '#FFF',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5
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
        borderColor: Colors.theme,
        borderWidth: 1
    },
    text: {
        marginLeft: 5,
        marginTop: 4,
        marginBottom: 3,
        fontFamily: 'Cabin'
    }
});