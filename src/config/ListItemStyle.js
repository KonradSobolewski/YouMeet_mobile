import { StyleSheet } from 'react-native';
import Colors from '../config/colors'

export default StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: 70,
        backgroundColor: '#eee',
        flexDirection: 'row',
    },
    acceptedTo: {
      backgroundColor: '#01FF70'
    },
    rejectedFrom: {
      backgroundColor: '#FF4136'
    },
    person: {
        margin: 10,
        marginBottom: 5,
        fontSize: 15,
        color: Colors.black,
        fontFamily: 'Cabin',
    },
    description: {
        margin: 10,
        marginBottom : 15,
        fontSize: 12,
        color: Colors.black,
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
        color: Colors.black,
        fontFamily: 'Cabin',
        alignSelf: 'center',
        textAlign: 'center',
    },
    category: {
        margin: 15,
        fontSize: 10,
        color: Colors.black,
        fontFamily: 'Cabin',
        alignSelf: 'center',
        textAlign: 'center',
    },
    userIcon: {
        margin: 10,
        width: 50, height: 50, borderRadius: 25,
    },
});
