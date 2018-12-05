import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import UsersMap from "./UsersMap";
import UserInfo from "./UserInfo";
import ConstKeys from '../../config/app.consts'

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: props.navigation.getParam('userInfo'),
            auth: props.navigation.getParam('auth'),
            location: {
                latitude: 52.22967,
                longitude: 21.01222,
                latitudeDelta: 0.0522,
                longitudeDelta: 0.0321
            },
            chosenPlace: null,
            meetingsLoaded: false,
            meetings: null
        };
        this.getUserLocationHandler();
        this.getMeetingPlaces();
    }

    getMeetingPlaces = async () => {
        await fetch(ConstKeys.apiUrl + '/api/getMeetings?user_id=' + ConstKeys.userInfo.id, {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: ConstKeys.auth
            },
        }).then(response => response.json().then(data => {
                this.setState({meetings: data, meetingsLoaded: true});
            })
                .catch(err => console.log(err))
        ).catch(err => console.log(err));
    };

    getUserLocationHandler = () => {
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({
                location: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.0522,
                    longitudeDelta: 0.0321
                }
            });
        }, err => console.log(err));
    };

    setTapedCoordinates = (data) => {
        this.setState({chosenPlace: data});
    };

    getPickedPoi = (data) => {
        this.setState({chosenPlace: data});
    };

    render() {
        const {navigation} = this.props;

        if (this.state.auth === null) {
            navigation.navigate('loginPage');
        }
        let sth = null;
        if (this.state.meetingsLoaded === true) {
            let lat = this.state.meetings[0].place_latitude;
            sth = <Text> {lat} </Text>
        }
        return (
            <View style={styles.container}>
                <UserInfo style={styles.userIcon} navigator={this.props.navigation}/>
                <UsersMap userLocation={this.state.location}
                          meetings={this.state.meetings}
                          getTapedLocation={(data) => this.setTapedCoordinates(data)}
                          chosenPlace={this.state.chosenPlace}
                          getPickedPoi={(data) => this.getPickedPoi(data)}
                          style={styles.map}/>
                <TouchableOpacity style={styles.buttonContainer} onPress={this.getUserLocationHandler}>
                    <Text style={styles.buttonText}>Get Location</Text>
                </TouchableOpacity>
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
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        borderRadius: 15,
        marginTop: 15,
        backgroundColor: 'rgba(255,255,255,1)',
        padding: 15
    },
    buttonText: {
        color: 'black',
        textAlign: 'center'
    },
    map: {
        height: '60%'
    },
    userIcon: {
        height: '40%'
    }

});
