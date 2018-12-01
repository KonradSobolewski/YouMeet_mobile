import React from 'react'
import {Button, Image, StyleSheet, View, Text} from 'react-native';
import {MapView} from 'expo'
import markerImage from '../../../assets/marker.png'

let mapStyle = require('../../config/map.style.json');

const usersMap = props => {
    let userLocationMarker = null;
    let chosenPlaceMarker = null;

    if (props.userLocation) {
        userLocationMarker = props.userInfo.picture !== '' ?
            (<MapView.Marker coordinate={props.userLocation}>
                <Image source={{uri: props.userInfo.picture.data.url}} style={styles.userIcon}/>
            </MapView.Marker>)
            :
            (<MapView.Marker coordinate={props.userLocation}>
                <Image source={markerImage} style={styles.markerIcon}/>
            </MapView.Marker>);
    }
    if (props.chosenPlace) {
        chosenPlaceMarker = <MapView.Marker coordinate={props.chosenPlace}>
            <Image source={markerImage} style={styles.markerIcon}/>
            <MapView.Callout tooltip>
                <View style={styles.toolTip}>
                    <Text style={styles.toolTipText}>
                        LOL
                    </Text>
                </View>
            </MapView.Callout>
        </MapView.Marker>
    }
    return (
        <View style={styles.mapContainer}>
            <MapView region={props.userLocation} style={styles.map} customMapStyle={mapStyle}
                     onPress={(e) => {
                         props.getTapedLocation(e.nativeEvent.coordinate);
                     }}>
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
    markerIcon: {
        width: 35, height: 35
    },
    toolTip:{
        backgroundColor: 'rgba(255,255,255,0.8)',
        padding: 15,
        marginBottom: 5,
        borderRadius: 10,
        width: 100,
        alignItems: 'center'
    },
    toolTipText: {
    }
});
