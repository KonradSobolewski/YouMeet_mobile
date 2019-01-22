import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, Picker, Modal} from 'react-native';
import UsersMap from "./UsersMap";
import UserInfo from "./UserInfo";
import InviteModal from "./InviteModal";
import {signOut} from '../../services/user.service'
import {getMeetingPlaces, joinMeeting} from "../../services/meeting.service";
import Ionicons from 'react-native-vector-icons/Ionicons';
import ConstKeys from "../../config/app.consts";
import Dialog, {SlideAnimation, ScaleAnimation, DialogContent} from 'react-native-popup-dialog';
import Colors from '../../config/colors'

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: ConstKeys.userInfo,
            auth: ConstKeys.auth,
            location: {
                latitude: 52.22967,
                longitude: 21.01222,
                latitudeDelta: 0.0522,
                longitudeDelta: 0.0321
            },
            categories: ConstKeys.categories,
            category: 0,
            chosenPlace: null,
            meetingsLoaded: false,
            meetings: ConstKeys.meetings,
            filteredMeetings: ConstKeys.meetings,
            userPositionLoaded: false,
            modalVisible: false,
            selectedMeeting: null,
            dialogVisible: false,
        };
    }

    _isMounted = false;

    componentDidMount = () => {
        this._isMounted = true;
        this.getAllCategories();
        this.getUserLocationHandler();
        this.getPlaces();
        console.log(this.state.meetings);
    };

    getPlaces = () => {
        getMeetingPlaces().then(response => response.json().then(data => {
                if (this._isMounted) {
                    data.filter(item => item.params.joinerId != null).map((item => {
                        if (item.params.joinerId.includes(ConstKeys.userInfo.id))
                            item.additionalInformation = 'Success';
                        return item;
                    }));
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

    getAllCategories = () => {
        if (this._isMounted) {
            this.setState({categories: [{id: 0, type: 'Select category: All'}, ...this.state.categories]});
        }
    };

    isAllLoaded = () => {
        return this.state.userPositionLoaded && this._isMounted;
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

    filterMeetings = (index) => {
        if (index === 0) {
            this.state.filteredMeetings = this.state.meetings;
        } else {
            this.state.filteredMeetings = this.state.meetings.filter(function (item) {
                return index === item.category;
            });
        }
        this.forceUpdate();
    };

    getFilter = () => {
        let categories = [];
        categories.push(this.state.categories.map(category => {
                return (
                    <Picker.Item key={category.id} label={category.type} value={category.id}/>
                )
            })
        );

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
        this.setState({userPositionLoaded: false});
        this.getPlaces();
        this.getUserLocationHandler();
    };

    getButtons = () => {
        return (
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={this.refresh}>
                    <Ionicons name="md-locate" size={30} color={Colors.black} style={styles.icon}/>
                </TouchableOpacity>
            </View>
        )
    };

    joinUser = (meetingId) => {
        joinMeeting(meetingId).then(response => response.json().then(data => {
                this.state.meetings
                    .filter((item) => (item.meeting_id === meetingId))
                    .map(item => {
                        if (data.params.joinerId.includes(ConstKeys.userInfo.id))
                            item.additionalInformation = 'Success';
                        else
                            item.additionalInformation = 'Failure';
                        return item;
                    });
                this.closeModal();
            }).catch(err => signOut(this.props.navigation))
        ).catch(err => signOut(this.props.navigation));

    };

    closeModal = () => {
        this.setState({modalVisible: false});
    };

    showInviteModal = (meeting) => {
        return (
            <InviteModal meeting={meeting}
                         modalVisible={this.state.modalVisible}
                         inviteUser={() => this.joinUser(meeting.meeting_id)}
                         closeModal={() => this.closeModal()}
            />
        );
    };

    render() {
        let meetings = null;
        if (this.isAllLoaded()) {
            meetings = this.state.filteredMeetings;
        }
        return (
            <View style={styles.container}>
                {this.isAllLoaded() ? (<UsersMap userLocation={this.state.location}
                                                 meetings={meetings}
                                                 loaded={this.isAllLoaded()}
                                                 getTapedLocation={(data) => this.setTapedCoordinates(data)}
                                                 chosenPlace={this.state.chosenPlace}
                                                 getPickedPoi={(data) => this.getPickedPoi(data)}
                                                 navigator={this.props.navigation}
                                                 openModal={(data) => {
                                                     this.setState({modalVisible: true, selectedMeeting: data});
                                                 }}
                                                 setDialogVisibility={() => this.setState({dialogVisible: true})}
                                                 style={styles.map}/>) : null}
                <UserInfo showHamburger={true} navigator={this.props.navigation}/>
                <Dialog
                    visible={this.state.dialogVisible}
                    dialogAnimation={new ScaleAnimation({
                        toValue: 0, // optional
                        useNativeDriver: true, // optional
                    })}
                    onTouchOutside={() => {
                        this.setState({dialogVisible: false});
                    }}
                    dialogStyle={styles.dialog}
                    width={0.8}
                    height={0.15}
                >
                    <DialogContent>
                        <Text style={styles.dialogText}>You have created too many meetings. Please delete recently
                            created to create new one or buy premium account.</Text>
                    </DialogContent>
                </Dialog>
                {this.getFilter()}
                {this.getButtons()}
                {this.isAllLoaded() ? null : (<ActivityIndicator size={80} color="black" style={styles.spinner}/>)}
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
    dialog: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    dialogText: {
        marginTop: 15,
        fontSize: 12, alignSelf: 'center', textAlign: 'center'
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
        bottom: 50,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        backgroundColor: 'white',
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
        backgroundColor: 'rgba(255,255,255,0.7)',
        height: 40,
        color: Colors.black,
        padding: 10,
        width: 250
    }
});
