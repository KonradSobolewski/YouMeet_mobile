import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import UsersMap from "./UsersMap";
import UserInfo from "./UserInfo";
import {signOut} from '../../services/user.service'
import {getMeetingPlaces} from "../../services/meeting.service";
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
        this.getPlaces();
    }

    getPlaces = () => {
        getMeetingPlaces().then(response => response.json().then(data => {
                this.setState({meetings: data, meetingsLoaded: true});
            }).catch(err => signOut(this.props.navigation))
        ).catch(err => signOut(this.props.navigation));
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
        console.log(this.props.navigation.getParam('isSuccessfullCreate'));
        if (this.state.auth === null && !this.props.navigation.getParam('isSuccessfullCreate')) {
            // console.log('\n\n\n wy pierdolone kurwyyy!!!!!  \n\n\n');
            // navigation.navigate('loginPage');
        }
        let sth = null;
        if (this.state.meetingsLoaded === true) {
            // let lat = this.state.meetings[0].place_latitude;
            // sth = <Text> {lat} </Text>
        }
        return (
            <View style={styles.container}>
                <UserInfo showHamburger={true} navigator={this.props.navigation}/>
                <Text>{ConstKeys.userInfo.user_id}</Text>
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
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 120, right: 120,
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: 'rgba(255,255,255,1)',
        padding: 15
    },
    buttonText: {
        color: 'black',
        textAlign: 'center'
    },
    map: {
        position: 'absolute',
        bottom: 0
    }
});
