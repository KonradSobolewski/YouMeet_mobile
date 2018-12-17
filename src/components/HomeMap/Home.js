import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import UsersMap from "./UsersMap";
import UserInfo from "./UserInfo";
import {signOut} from '../../services/user.service'
import {getMeetingPlaces} from "../../services/meeting.service";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: props.navigation.getParam('userInfo'),
            auth: props.navigation.getParam('auth'),
            isSuccessfulCreated: props.navigation.getParam('isSuccessfulCreate'),
            location: {
                latitude: 52.22967,
                longitude: 21.01222,
                latitudeDelta: 0.0522,
                longitudeDelta: 0.0321
            },
            chosenPlace: null,
            meetingsLoaded: false,
            meetings: []
        };
        if (this._isMounted) {

        }

    }
    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;
        this.getUserLocationHandler();
        this.getPlaces();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getPlaces = () => {
        getMeetingPlaces().then(response => response.json().then(data => {
            if (this._isMounted) {
                this.setState({meetings: data, meetingsLoaded: true});
            }
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
        if (this._isMounted) {
            this.setState({chosenPlace: data});
        }
    };

    getPickedPoi = (data) => {
        if (this._isMounted) {
            this.setState({chosenPlace: data});
        }
    };

    render() {
        const {navigation} = this.props;
        if (this.state.auth === null && !this.state.isSuccessfulCreated) {
            // console.log('\n\n\n wy pierdolone kurwyyy!!!!!  \n\n\n');
            // navigation.navigate('loginPage');
        }
        let meetings = null;
        if (this.state.meetingsLoaded === true) {
           meetings = this.state.meetings;
        }
        return (
            <View style={styles.container}>
                <UserInfo showHamburger={true} navigator={this.props.navigation}/>
                <UsersMap userLocation={this.state.location}
                          meetings={meetings}
                          getTapedLocation={(data) => this.setTapedCoordinates(data)}
                          chosenPlace={this.state.chosenPlace}
                          getPickedPoi={(data) => this.getPickedPoi(data)}
                          navigator={this.props.navigation}
                          style={styles.map}/>

                <TouchableOpacity style={styles.buttonContainer} onPress={this.getUserLocationHandler}>
                    <Ionicons name="md-locate" size={40} color={'white'}/>
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
        top: 120,
        right: 5,
        justifyContent: 'center',
        padding: 15
    },
    map: {
        position: 'absolute',
        bottom: 0
    }
});
