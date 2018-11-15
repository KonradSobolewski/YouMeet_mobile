import React from 'react'
import { StyleSheet, View } from 'react-native';
import {MapView} from 'expo'

const usersMap = props => {
    let userLocationMarker = null;

    if (props.userLocation) {
        userLocationMarker = <MapView.Marker coordinate={props.userLocation} />;
    }

    return (
        <View style={styles.mapContainer}>
            <MapView
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0622,
                    longitudeDelta: 0.0421
                }}
                region={props.userLocation}
                style={styles.map}
            >
                {userLocationMarker}
            </MapView>
        </View>
    );
};

export default usersMap;

const styles = StyleSheet.create({
    mapContainer: {
        width: '100%',
        height: 200
    },
    map : {
        marginTop: 10,
        width : '100%',
        height: '100%'
    }
});