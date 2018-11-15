import React from 'react';
import {StyleSheet, View} from 'react-native';
import FetchLocation from "./FetchLocation";
import UsersMap from "./UsersMap";

export default class Home extends React.Component {
    state = {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0622,
        longitudeDelta: 0.0421
    };
    getUserLocationHandler = () => {
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.0622,
                longitudeDelta: 0.0421
            });
        }, err => console.log(err));
    };

    render() {
        return (
            <View style={styles.container}>
                <FetchLocation onGetLocation={this.getUserLocationHandler}/>
                <UsersMap userLocation={this.state}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
