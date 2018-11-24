import React from 'react'
import {Button, Image, StyleSheet, View} from 'react-native';
import {MapView} from 'expo'

const usersMap = props => {
    let userLocationMarker = null;

    if (props.userLocation) {
        userLocationMarker = props.userInfo.picture !== '' ?
            ( <MapView.Marker coordinate={props.userLocation}>
                <Image source={{uri: props.userInfo.picture.data.url}} style={styles.userIcon}/>
            </MapView.Marker> )
            :
            ( <MapView.Marker coordinate={props.userLocation}>
            </MapView.Marker> );
    }

    return (
        <View style={styles.mapContainer}>
            <MapView region={props.userLocation} style={styles.map}>
                {userLocationMarker}
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
