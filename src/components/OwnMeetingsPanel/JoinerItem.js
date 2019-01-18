import {Image, Text, View, TouchableOpacity, StyleSheet} from "react-native";
import React from "react";
import Colors from '../../config/colors'
import {getMetUserIcon} from "../../services/user.service";

const joinerItem = props => {
    return(
        <View style={styles.container}>
            {props.joiner.params.photo !== undefined ?
                (<Image source={{uri: props.joiner.params.photo}} style={styles.userIcon}/>) :
                (<Image source={getMetUserIcon(props.joiner.params.gender)} style={styles.userIcon}/>)
            }
            <View>
                <Text style={styles.name}>{props.joiner.firstName + ' ' + props.joiner.lastName + ', ' + props.joiner.params.age}</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => props.cancelJoiner(props.joiner.id)} style={styles.button}>
                        <Text style={styles.buttonText}>CANCEL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.acceptJoiner(props.joiner.id)} style={styles.button}>
                        <Text style={styles.buttonText}>ACCEPT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default joinerItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        textAlign: 'center',
        margin: 8,
        color: Colors.theme,
        fontSize: 17,
        fontFamily: 'Cabin'
    },
    userIcon: {
        width: 80,
        height: 80,
        padding: 10,
        borderRadius : 40,
        borderColor: Colors.theme,
        borderWidth: 1
    },
    button: {
        padding: 5,
        margin: 5,
        borderRadius: 5,
        backgroundColor: Colors.theme,
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 15,
        margin: 5,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Cabin',
        letterSpacing: 2
    },
    buttonContainer: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    }
});