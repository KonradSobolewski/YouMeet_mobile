import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import FetchLocation from "./FetchLocation";
import UsersMap from "./UsersMap";

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: props.navigation.getParam('fbInfo'),
            location: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0622,
                longitudeDelta: 0.0421
            }
        };
        console.log('yo');
        console.log(this.state.userInfo);
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

    renderUserInfo = () => {
        return (
            <View style={{alignItems: 'center'}}>
                <Image source={{uri: this.state.userInfo.picture.data.url}}
                       style={{width: 100, height: 100, borderRadius: 50}}/>
                <Text style={{fontSize: 20}}>{this.state.userInfo.name}</Text>
                <Text>ID: {this.state.userInfo.id}</Text>
            </View>
        );
    };

    render() {
        const {navigation} = this.props;
        if (navigation.getParam('auth') === null) {
            navigation.navigate('loginPage');
        }
        let showUserInfo = null;
        if (this.state.userInfo !== null ) {
            showUserInfo = this.renderUserInfo;
        }
        return (
            <View style={styles.container}>
                { showUserInfo }
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
