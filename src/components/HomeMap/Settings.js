import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity,} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Settings extends React.Component {

    goToAccountInfo = () => {
        this.props.navigation.navigate('accountInfo');
    };

    goToAppSettings = () => {
        this.props.navigation.navigate('appSettings');
    };

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={this.goToAccountInfo}>
                    <Text style={styles.text}>
                        Edit account
                    </Text>
                    <Ionicons name="md-arrow-dropright" size={20} color={"black"} style={styles.icon}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={this.goToAppSettings}>
                    <Text style={styles.text}>
                        App settings
                    </Text>
                    <Ionicons name="md-arrow-dropright" size={20} color={"black"} style={styles.icon}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e2e2e2',
    },
    button: {
        backgroundColor: 'white',
        margin:10,
        padding: 10,
        flexDirection: 'row'
    },
    text: {
        fontSize: 20
    },
    icon: {
        fontSize: 20,
        marginLeft: 'auto',
        paddingRight: 20
    }
});
