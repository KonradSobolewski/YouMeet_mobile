import React from 'react';
import {StyleSheet, View} from 'react-native';
import FetchLocation from "./FetchLocation";
import UsersMap from "./UsersMap";
import UserInfo from "./UserInfo";

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: props.navigation.getParam('fbInfo'),
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

    render() {
        const {navigation} = this.props;
        if (this.state.auth === null) {
            navigation.navigate('loginPage');
        }
        return (
            <View style={styles.container}>
                {this.state.userInfo !== undefined ? (<UserInfo onLoad={this.state.userInfo}/>) : (null)}
                <FetchLocation onGetLocation={this.getUserLocationHandler}/>
                <UsersMap userLocation={this.state.location}/>
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
    }
});
