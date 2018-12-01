import React from 'react'
import {Button, Image, StyleSheet, View, Text} from 'react-native';
import {MapView} from 'expo'

let mapStyle = require('../../config/map.style.json');

const usersMap = props => {
    let userLocationMarker = null;
    let chosenPlaceMarker = null;

    if (props.userLocation) {
        userLocationMarker = props.userInfo.picture !== '' ?
            ( <MapView.Marker coordinate={props.userLocation}>
                <Image source={{uri: props.userInfo.picture.data.url}} style={styles.userIcon}/>
            </MapView.Marker> )
            :
            ( <MapView.Marker coordinate={props.userLocation}>
            </MapView.Marker> );
    }
    if (props.chosenPlace) {
        chosenPlaceMarker = <MapView.Marker coordinate={props.chosenPlace}/>
    }
    return (
        <View style={styles.mapContainer}>
            <MapView region={props.userLocation} style={styles.map} customMapStyle={mapStyle} onPress={(e) => props.getTapedLocation(e.nativeEvent.coordinate)}>
                {userLocationMarker}
                {chosenPlaceMarker}
            </MapView>
        </View>
    );
};

export default usersMap;

const styles = StyleSheet.create({
    mapContainer: {
        width: '100%',
        height: '80%'
    },
    map: {
        marginTop: 10,
        width: '100%',
        height: '100%'
    },
    userIcon: {
        width: 50, height: 50, borderRadius: 25,
        borderWidth: 2,
        borderColor: 'white'
    },
});
