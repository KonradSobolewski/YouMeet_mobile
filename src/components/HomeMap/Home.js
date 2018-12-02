import React from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import UsersMap from "./UsersMap";
import UserInfo from "./UserInfo";
import {onSignOut} from '../../config/authorization'

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
            chosenPlace: null
        };
        this.getUserLocationHandler();
    }

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
        return (
            <View style={styles.container}>
                <UserInfo onLoad={this.state.userInfo}/>
                <Button title="Get Location" onPress={this.getUserLocationHandler}/>
                <UsersMap userLocation={this.state.location}
                          userInfo={this.state.userInfo}
                          getTapedLocation={(data) => this.setTapedCoordinates(data)}
                          chosenPlace={this.state.chosenPlace}
                          getPickedPoi={(data) => this.getPickedPoi(data)}/>
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
        borderRadius: 15,
        marginTop: 15,
        backgroundColor: 'rgba(0,255,255,1)',
        padding: 15
    },
    buttonText: {
        color: 'black',
        textAlign: 'center'
    }
});
