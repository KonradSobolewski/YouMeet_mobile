import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Modal, Image} from 'react-native';
import {getMetUserIcon} from "../../services/user.service";
import {LinearGradient} from "expo";

const inviteModal = props => {
    let name = null;
    let place = null;
    let description = null;
    let cancel = null;
    let invite = null;
    let additionalInformation = null;
    if(props.fontLoaded) {
        name =  <Text style={styles.name}>{props.meeting.params.firstName + ' '+ props.meeting.params.lastName + ', ' + props.meeting.params.age}</Text>;
        place =  <Text style={styles.place}>Place: {props.meeting.params.placeDescription}</Text>;
        description =  <Text style={styles.description}>Description: {props.meeting.params.description}</Text>;
        cancel =  <Text style={styles.textButton}>Cancel</Text>;
        invite =  <Text style={styles.textButton}>Invite</Text>;
        if(props.meeting.additionalInformation)
          additionalInformation = <Text style={styles.place}>Invitation status: {props.meeting.additionalInformation}</Text>;
    }
    return (
        <Modal
            style={styles.modal}
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => {
                console.log('closed');
            }}>
            <View style={styles.container}>
                <LinearGradient colors={['#b22b7d', '#ddb6ca']} locations={[0, 0.8]} style={styles.gradient}>
                    <View style={styles.textContainer}>
                        {props.meeting.params.photo !== null ?
                            (<Image source={{uri: props.meeting.params.photo}} style={styles.userIcon}/>) :
                            (<Image source={getMetUserIcon(props.meeting.params.gender)} style={styles.userIcon}/>)
                        }
                        {name}
                        {additionalInformation}
                        {place}
                        {description}
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => props.closeModal()} style={styles.button}>
                            {cancel}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.inviteUser()} style={styles.button}>
                            {invite}
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>
        </Modal>
    );
};

export default inviteModal;

const styles = StyleSheet.create({
   container: {
       marginTop: 150,
       marginLeft: 'auto',
       marginRight: 'auto',
       height: 400,
       width: 300,
       zIndex: 5,
       elevation: 10,
   },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 10,
    },
    textContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        width: '100%',
        height: 'auto',
        elevation: 1
    },
    userIcon: {
        padding: 10,
        margin:15,
        width: 120, height: 120, borderRadius: 60,
        borderWidth: 2,
        borderColor: 'white'
    },
    name: {
        margin: 10,
        color: 'white',
        fontSize: 20,
        fontFamily: 'Cabin',
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: {width: 0, height: 1},
        textShadowRadius: 5
    },
    place: {
        margin: 5,
        color: 'white',
        fontSize: 15,
        fontFamily: 'Cabin',
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: {width: 0, height: 1},
        textShadowRadius: 5
    },
    description: {
        margin: 5,
        marginBottom: 15,
        color: 'white',
        fontSize: 15,
        fontFamily: 'Cabin',
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: {width: 0, height: 1},
        textShadowRadius: 5
    },
    buttonContainer:{
       flexDirection: 'row',
        padding: 10,
    },
    button: {
        borderRadius: 5,
        marginTop: 10,
        backgroundColor: 'white',
        padding: 5,
        marginVertical: 10,
        marginHorizontal: 10,
        elevation: 2,
        width: '40%'
    },
    textButton: {
        fontSize: 15,
        color: '#373D3F',
        textAlign: 'center',
        fontFamily: 'Cabin',
        letterSpacing: 3
    },
});
