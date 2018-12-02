import React from 'react'
import {Button, Image, StyleSheet, View, Text} from 'react-native';
import {MapView} from 'expo'
import markerImage from '../../../assets/marker.png'
import ConstKeys from '../../config/app.consts'

let mapStyle = require('../../config/map.style.json');

const usersMap = props => {
    let userLocationMarker = null;
    let chosenPlaceMarker = null;
    let meetingPlaces = null;
    if (props.userLocation) {
        userLocationMarker = ConstKeys.userInfo.picture !== '' ?
            (<MapView.Marker coordinate={props.userLocation}>
                <Image source={{uri: ConstKeys.userInfo.picture.data.url}} style={styles.userIcon}/>
            </MapView.Marker>)
            :
            (<MapView.Marker coordinate={props.userLocation}>
                <Image source={markerImage} style={styles.markerIcon}/>
            </MapView.Marker>);
    }
    if(props.meetings) {
      meetingPlaces = props.meetings.map( meeting =>{
          return (
          <MapView.Marker
            coordinate={{latitude: parseFloat(meeting.place_latitude), longitude: parseFloat(meeting.place_longitude)}}
          >
          </MapView.Marker>
        )
      });
    }
    if (props.chosenPlace) {
        chosenPlaceMarker = <MapView.Marker coordinate={props.chosenPlace.coordinate}>
            <Image source={markerImage} style={styles.markerIcon}/>
            <MapView.Callout tooltip>
                <View style={styles.toolTip}>
                    <Text style={styles.toolTipText}>
                        {props.chosenPlace.name}
                    </Text>
                </View>
            </MapView.Callout>
        </MapView.Marker>
    }
    return (
        <View style={styles.mapContainer}>
            <MapView region={props.userLocation} style={styles.map} customMapStyle={mapStyle} showsBuildings showsCompass
                     // onPress={(e) => {
                     //     props.getTapedLocation(e.nativeEvent.coordinate);
                     // }}
                     onPoiClick={(e) => props.getPickedPoi(e.nativeEvent)}>
                {userLocationMarker}
                {chosenPlaceMarker}
                {meetingPlaces}
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
        width: 50, height: 50
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
