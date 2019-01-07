import React from 'react'
import {Button, Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {MapView} from 'expo'
import markerImage from '../../../assets/images/marker.png'
import ConstKeys from '../../config/app.consts'
import {getMetUserIcon, getUserIcon} from "../../services/user.service";
import Colors from '../../config/colors'

let mapStyle = require('../../config/map.style.json');

const usersMap = props => {
    let userLocationMarker = null;
    let chosenPlaceMarker = null;
    let meetingPlaces = null;
    if (props.userLocation) {
        userLocationMarker = ConstKeys.userInfo.photo ?
            (<MapView.Marker coordinate={props.userLocation}>
                <Image source={{uri: ConstKeys.userInfo.photo}} style={styles.userIcon}/>
            </MapView.Marker>)
            :
            (<MapView.Marker coordinate={props.userLocation}>
                <Image source={getUserIcon()} style={styles.userIcon}/>
            </MapView.Marker>);
    }
    if (props.meetings) {
        meetingPlaces = props.meetings.map(meeting => {
            return (
                <MapView.Marker key={meeting.meeting_id}
                                coordinate={{
                                    latitude: parseFloat(meeting.place_latitude),
                                    longitude: parseFloat(meeting.place_longitude)
                                }}
                                onPress={() => props.openModal(meeting)}
                >
                    {meeting.params.photo !== null ?
                        (<Image source={{uri: meeting.params.photo}} style={styles.markerIcon}/>) :
                        (<Image source={getMetUserIcon(meeting.params.gender)} style={styles.markerIcon}/>)
                    }
                </MapView.Marker>
            )
        });
    }
    if (props.chosenPlace) {
        chosenPlaceMarker = <MapView.Marker coordinate={props.chosenPlace.coordinate}>
            <Image source={markerImage} style={styles.markerIcon}/>
            <MapView.Callout tooltip
                             onPress={() => {
                                 if(ConstKeys.userInfo.meetingCounter > 0)
                                    props.navigator.navigate('meetingForm', {place: props.chosenPlace});
                                 else
                                     props.setDialogVisibility();
                             }}>
                <View style={styles.toolTip}>
                    <Text style={styles.toolTipText}>
                        {props.chosenPlace.name}
                    </Text>
                    <TouchableOpacity style={styles.toolTipButton}>
                        <Text style={styles.submitText}>ACCEPT</Text>
                    </TouchableOpacity>
                </View>

            </MapView.Callout>
        </MapView.Marker>
    }
    return (
        <View style={styles.mapContainer}>
            <MapView initialRegion={props.userLocation} style={styles.map} customMapStyle={mapStyle} showsBuildings
                     showsCompass
                // onPress={(e) => {
                //     props.getTapedLocation(e.nativeEvent.coordinate);
                // }}
                     onPoiClick={(e) => props.getPickedPoi(e.nativeEvent)}>
                {props.loaded ? userLocationMarker: null}
                {props.loaded ? chosenPlaceMarker : null}
                {props.loaded ? meetingPlaces : null}
            </MapView>
        </View>
    );
};

export default usersMap;

const styles = StyleSheet.create({
    mapContainer: {
        width: '100%',
        height: '100%',
    },
    map: {
        width: '100%',
        height: '100%'
    },
    userIcon: {
        width: 50, height: 50, borderRadius: 25,
        borderWidth: 2,
        borderColor: 'white'
    },
    markerIcon: {
        width: 40, height: 40, borderRadius: 20,
    },
    toolTip: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.9)',
        padding: 15,
        marginBottom: 5,
        borderRadius: 3,
        width: 200,
        alignItems: 'center'
    },
    toolTipText: {
        flex: 1,
        marginBottom: 15,
        flexWrap: 'wrap',
        textAlign: 'center'
    },
    submitText: {
        color: 'white',
    },
    toolTipButton: {
        backgroundColor: Colors.theme,
        alignItems: 'center',
        width: 120,
        padding: 5,
        borderRadius: 3,
    }
});
