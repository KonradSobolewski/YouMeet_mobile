import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, Picker, Modal} from 'react-native';
import UsersMap from "./UsersMap";
import UserInfo from "./UserInfo";
import InviteModal from "./InviteModal";
import {signOut} from '../../services/user.service'
import {getMeetingPlaces, joinMeeting} from "../../services/meeting.service";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Font} from "expo";
import {getCategories} from "../../services/category.service";
import ConstKeys from "../../config/app.consts";

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
            categories: [],
            category: 0,
            chosenPlace: null,
            meetingsLoaded: false,
            meetings: [],
            filteredMeetings: [],
            fontLoaded: false,
            userPositionLoaded: false,
            categoryLoaded: false,
            modalVisible: false,
            selectedMeeting: null
        };
    }
    _isMounted = false;

    async componentDidMount() {
        this._isMounted = true;
        this.getUserLocationHandler();
        this.getPlaces();
        this.getAllCategories();
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
                    this.setState({meetings: data, filteredMeetings: data, meetingsLoaded: true});
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

    getAllCategories = () => {
        if (this._isMounted) {
            getCategories().then(response => response.json().then(data => {
                    data.unshift({id: 0, type: 'Select category: All'});
                    this.setState({categories: data, categoryLoaded: true});
                }).catch(err => signOut(this.props.navigation))
            ).catch(err => signOut(this.props.navigation));
        }
    };

    isAllLoaded = () => {
        return this.state.meetingsLoaded && this.state.fontLoaded && this.state.userPositionLoaded && this.state.categoryLoaded && this._isMounted;
    };

    filterMeetings = (index) => {
        if (index === 0){
            this.state.filteredMeetings = this.state.meetings;
        } else {
            this.state.filteredMeetings = this.state.meetings.filter(function (item) {
                return index === item.category;
            });
        }
        if (this._isMounted) {
            this.forceUpdate();
        }
    };



    getFilter = () => {
        let categories = [];
        if (this.state.categories.length > 0) {
            categories.push(this.state.categories.map(category => {
                    return (
                        <Picker.Item key={category.id} label={category.type} value={category.id}/>
                    )
                })
            );
        }
        return (
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={this.state.category}
                    style={styles.picker}
                    mode={'dropdown'}
                    onValueChange={(itemValue, itemIndex) => {
                        this.setState({category: itemIndex});
                        this.filterMeetings(itemIndex);
                    }}>
                    {categories}
                </Picker>
            </View>
        );
    };

    refresh = () => {
        this.setState({meetingsLoaded: false});
        this.getPlaces();
    };

    getButtons = () => {
        return (
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={this.refresh}>
                    <Ionicons name="md-refresh" size={30} color={'#373D3F'} style={styles.icon}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.getUserLocationHandler}>
                    <Ionicons name="md-locate" size={30} color={'#373D3F'} style={styles.icon}/>
                </TouchableOpacity>
            </View>
        )
    };

    joinUser = (meetingId) => {
        joinMeeting(meetingId).then(response => response.json().then(data => {
                if (this._isMounted) {
                    this.state.meetings
                    .filter((item) => (item.meeting_id == meetingId))
                    .map(item => {
                      if(item.params.joinerId.includes(ConstKeys.userInfo.id))
                        item.additionalInformation = 'Success';
                      else
                        item.additionalInformation = 'Failure';
                      return item;
                    });
                }
            }).catch(err => signOut(this.props.navigation))
        ).catch(err => signOut(this.props.navigation));

    };

    closeModal = () => {
        this.setState({modalVisible: false});
    };

    showInviteModal = (meeting) => {
        return(
          <InviteModal meeting={meeting}
                       modalVisible={this.state.modalVisible}
                       inviteUser={() => this.joinUser(meeting.meeting_id)}
                       closeModal={() => this.closeModal()}
                       fontLoaded={this.state.fontLoaded}
          />
        );
    };

    render() {
        const {navigation} = this.props;
        if (this.state.auth === null && !this.state.isSuccessfulCreated) {
            // console.log('\n\n\n wy pierdolone kurwyyy!!!!!  \n\n\n');
            // navigation.navigate('loginPage');
        }
        let meetings = null;
        if (this.isAllLoaded()) {
            meetings = this.state.filteredMeetings;
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
                          openModal={(data) => {
                              this.setState({modalVisible: true, selectedMeeting: data});
                          }}
                          style={styles.map}/>
                <UserInfo showHamburger={true} navigator={this.props.navigation} fontLoaded={this.state.fontLoaded}/>
                {this.getFilter()}
                {this.getButtons()}
                {this.isAllLoaded() ? null : (<ActivityIndicator size={80} color="white" style={styles.spinner}/>)}
                {this.state.selectedMeeting != null && this.state.modalVisible ? this.showInviteModal(this.state.selectedMeeting) : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        height: '100%'
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
        top: 250,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 150,
        backgroundColor : 'white',
        borderRadius: 5,
        elevation: 2
    },
    icon: {
        padding: 10,
        paddingVertical: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: {width: 0, height: 1},
        textShadowRadius: 5
    },
    pickerContainer: {
        position: 'absolute',
        top: 80,
        left: 0,
        justifyContent: 'center',
        elevation: 4
    },
    picker: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        height: 40,
        color: '#373D3F',
        padding: 10,
        width: 250
    }
});
