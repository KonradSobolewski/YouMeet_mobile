import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import UsersMap from "./UsersMap";
import UserInfo from "./UserInfo";
import {signOut} from '../../services/user.service'
import {getMeetingPlaces} from "../../services/meeting.service";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Font} from "expo";

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
            meetings: [],
            fontLoaded: false,
            userPositionLoaded: false
        };
    }
    _isMounted = false;

    async componentDidMount() {
        this._isMounted = true;
        this.getUserLocationHandler();
        this.getPlaces();
        await Font.loadAsync({
            'Courgette': require('../../../assets/fonts/Courgette-Regular.ttf'),
            'Dosis': require('../../../assets/fonts/Dosis-Regular.ttf'),
            'Gloria': require('../../../assets/fonts/GloriaHallelujah.ttf'),
            'Cabin': require('../../../assets/fonts/Cabin-Regular.ttf'),
        });
        this.state.fontLoaded = true;
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
        if (this._isMounted) {
            navigator.geolocation.getCurrentPosition(position => {
                this.setState({
                    location: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.0522,
                        longitudeDelta: 0.0321
                    },
                    userPositionLoaded: true
                });
            }, err => console.log(err));
        }
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

    isAllLoaded = () => {
        return this.state.meetingsLoaded && this.state.fontLoaded && this.state.userPositionLoaded && this._isMounted;
    };

    render() {
        const {navigation} = this.props;
        if (this.state.auth === null && !this.state.isSuccessfulCreated) {
            // console.log('\n\n\n wy pierdolone kurwyyy!!!!!  \n\n\n');
            // navigation.navigate('loginPage');
        }
        let meetings = null;
        if (this.isAllLoaded()) {
            meetings = this.state.meetings;
        }
        return (
            <View style={styles.container}>
                <UsersMap userLocation={this.state.location}
                          meetings={meetings}
                          loaded={this.isAllLoaded()}
                          getTapedLocation={(data) => this.setTapedCoordinates(data)}
                          chosenPlace={this.state.chosenPlace}
                          getPickedPoi={(data) => this.getPickedPoi(data)}
                          navigator={this.props.navigation}
                          style={styles.map}/>
                <UserInfo showHamburger={true} navigator={this.props.navigation} fontLoaded={this.state.fontLoaded}/>
                <TouchableOpacity style={styles.buttonContainer} onPress={this.getUserLocationHandler}>
                    <Ionicons name="md-locate" size={40} color={'white'} style={styles.icon}/>
                </TouchableOpacity>
                {this.isAllLoaded() ? null : (<ActivityIndicator size={80} color="white" style={styles.spinner}/>)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    spinner: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 130,
        alignSelf: 'center'
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 5,
        justifyContent: 'center',
        padding: 15,
        elevation: 1
    },
    map: {
        height: '100%'
    },
    icon: {
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: {width: 0, height: 1},
        textShadowRadius: 5
    }
});
