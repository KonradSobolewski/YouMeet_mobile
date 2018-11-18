import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FetchLocation from "./FetchLocation";
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
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0622,
                longitudeDelta: 0.0421
            }
        };
    }

    getUserLocationHandler = () => {
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({
                location: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.0622,
                    longitudeDelta: 0.0421
                }
            });
        }, err => console.log(err));
    };

    signOut = ()=> {
        onSignOut()
            .then(() => this.props.navigation.navigate('loginPage'))
            .catch(err => console.log(err));
    };

    render() {
        const {navigation} = this.props;
        if (this.state.auth === null) {
            navigation.navigate('loginPage');
        }
        return (
            <View style={styles.container}>
                <UserInfo onLoad={this.state.userInfo}/>
                <FetchLocation onGetLocation={this.getUserLocationHandler}/>
                <UsersMap userLocation={this.state.location} userInfo={this.state.userInfo}/>
                <TouchableOpacity style={styles.buttonContainer} onPress={this.signOut}>
                    <Text style={styles.buttonText}>Logout</Text>
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
