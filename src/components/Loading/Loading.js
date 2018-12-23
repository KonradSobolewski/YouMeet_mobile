import React from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {LinearGradient} from "expo";
import {getMeetingPlaces} from "../../services/meeting.service";
import {signOut} from "../../services/user.service";
import {getCategories} from "../../services/category.service";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: props.navigation.getParam('userInfo'),
            auth: props.navigation.getParam('auth'),
            location: null,
            categories: [],
            meetingsLoaded: false,
            meetings: [],
            filteredMeetings: [],
            userPositionLoaded: false,
            categoryLoaded: false,
        };
        this.getUserLocationHandler();
        this.getPlaces();
        this.getAllCategories();
    }

    componentDidMount() {
        var interval = setInterval(function () {
            this.getUserLocationHandler();
            this.getPlaces();
            this.getAllCategories();
            if(this.state.meetingsLoaded && this.state.userPositionLoaded && this.state.categoryLoaded){
                clearInterval(interval);
                this.props.navigation.navigate('homePage', {
                    location: this.state.location,
                    categories: this.state.categories,
                    meetingsLoaded: this.state.meetingsLoaded,
                    meetings: this.state.meetingsLoaded,
                    filteredMeetings: this.state.filteredMeetings,
                    userPositionLoaded: this.state.userPositionLoaded,
                    categoryLoaded: this.state.categoryLoaded,
                })
            }
        }.bind(this), 400);
    }


    getPlaces = () => {
        getMeetingPlaces().then(response => response.json().then(data => {
                this.setState({meetings: data, filteredMeetings: data, meetingsLoaded: true});
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
                },
                userPositionLoaded: true
            });
        }, err => console.log(err));
    };

    getAllCategories = () => {
        getCategories().then(response => response.json().then(data => {
                data.unshift({id: 0, type: 'All'});
                this.setState({categories: data, categoryLoaded: true});
            }).catch(err => signOut(this.props.navigation))
        ).catch(err => signOut(this.props.navigation));
    };

    render () {
        return (
            <LinearGradient colors={['#b22b7d', '#ddb6ca']} locations={[0, 0.8]} style={styles.gradient}>
                <ActivityIndicator size={80} color="white" style={styles.spinner}/>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    spinner: {
        alignSelf: 'center',
    },
});