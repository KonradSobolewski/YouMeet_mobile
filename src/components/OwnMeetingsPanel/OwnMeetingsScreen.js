import React from 'react';
import {StyleSheet, FlatList, Text, View, RefreshControl, ActivityIndicator} from "react-native";
import {Font} from 'expo';
import {
    acceptJoinerMeeting, cancelSubscibtionForMeeting,
    deleteMeeting,
    getJoinersToOwnMeetings,
    getRecentMeetings
} from "../../services/meeting.service";
import ConstKeys from "../../config/app.consts";
import MeetingItem from "./MeetingItem";
import {updateUserData} from "../../config/authorization";
import Dialog, {SlideAnimation,ScaleAnimation, DialogContent, DialogTitle, DialogButton} from 'react-native-popup-dialog';
import Colors from '../../config/colors'
import {signOut} from "../../services/user.service";
import JoinerModal from './JoinerModal'
import InviteModal from "../HomeMap/InviteModal";

export default class NotificationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meetings: [],
            refreshing: false,
            meetingsLoaded: false,
            newJoinersMeetings: [],
            newJoinersLoaded: false,
            modalVisible: false,
            meetingJoiners: [],
            pickedMeeting: {
                params: {
                    placeDescription: 'Place'
                }
            },
            dialogVisible: false
        };
    }

    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;
        this.getOwnMeetings();
        this.getNewJoiners();
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    getOwnMeetings = () => {
        getRecentMeetings(ConstKeys.userInfo.email).then(res => res.json().then(data => {
                if (this._isMounted) {
                    ConstKeys.userInfo.meetingCounter = 3 - data.length;
                    updateUserData();
                    this.setState({meetings: data, meetingsLoaded: true, refreshing: false});
                }
            })
        ).catch(err => console.log(err));
    };

    getNewJoiners = () => {
        getJoinersToOwnMeetings(ConstKeys.userInfo.id).then(response => response.json().then(data => {
                if (this._isMounted) {
                    console.log(data);
                    this.setState({newJoinersMeetings: data, newJoinersLoaded: true, refreshing: false});
                }
            }).catch(err => signOut(this.props.navigation))
        ).catch(err => signOut(this.props.navigation));
    };

    acceptMeeting = (meetingId, joinerId) => {
        acceptJoinerMeeting(meetingId, joinerId).then(response => response.json().then(data => {

            }).catch(err => signOut(this.props.navigation))
        ).catch(err => signOut(this.props.navigation));
    };

    cancelJoiner = (meetingId, joinerId) => {
        cancelSubscibtionForMeeting(meetingId, joinerId).then(response => response.json().then(data => {
            }).catch(err => signOut(this.props.navigation))
        ).catch(err => signOut(this.props.navigation));
        this.refresh();

        let newJoiners = [];
        if(this.state.meetingJoiners.length > 0) {
            newJoiners = this.state.meetingJoiners.filter(joiner => {
                console.log(joiner);
                return joiner.id !== joinerId;
            });
        }
        this.setState({meetingJoiners: newJoiners});
    };

    deleteMeeting = (meeting) => {
        this.setState({refreshing: true});
        deleteMeeting(meeting.meeting_id).then(res=> res.json().then(data => console.log(data))).catch(err => console.log(err));
        let newMeetings = this.state.meetings.filter(data => data.meeting_id !== meeting.meeting_id);
        ConstKeys.userInfo.meetingCounter =  ConstKeys.userInfo.meetingCounter + 1;
        this.setState({dialogVisible: false, meetings: newMeetings, refreshing: false});
    };

    renderSeparator = () => {
        return (
            <View style={{height: 1, width: '100%', backgroundColor: '#CED0CE'}}/>
        );
    };

    refresh = () => {
        this.setState({refreshing: true});
        this.getOwnMeetings();
        this.getNewJoiners();
    };

    renderHeader = () => {
        return (
            <View style={styles.header}>
                <Text style={styles.noMeetings}>Your active meetings</Text>
            </View>
        );
    };

    showJoinersModal = (joiners) => {
        return (
            <JoinerModal joiners={joiners}
                         acceptJoiner={(joinerId) => this.acceptMeeting(this.state.pickedMeeting.meeting_id, joinerId)}
                         cancelJoiner={(joinerId) => this.cancelJoiner(this.state.pickedMeeting.meeting_id, joinerId)}
                         modalVisible={this.state.modalVisible}
                         closeModal={() => this.closeModal()}
            />
        );
    };

    closeModal = () => {
        this.setState({modalVisible: false});
    };

    render() {
        let meetings = null;
        if (this.state.meetingsLoaded && this.state.newJoinersLoaded && this.state.meetings.length > 0) {
            meetings =
                <FlatList style={styles.flatList}
                          data={this.state.meetings}
                          renderItem={({item}) => (
                              <MeetingItem showJoinModal={(data, meeting) => this.setState({modalVisible: true, meetingJoiners: data, pickedMeeting: meeting})}
                                           joiners={this.state.newJoinersMeetings}
                                           meetingItem={item}
                                           pressAction={(data) => this.setState({pickedMeeting: data, dialogVisible: true})} />
                          )}
                          keyExtractor={item => item.meeting_id.toString()}
                          ItemSeparatorComponent={this.renderSeparator}
                          ListHeaderComponent={this.renderHeader}
                          refreshControl={
                              <RefreshControl refreshing={this.state.refreshing} onRefresh={this.refresh}/>
                          }
                />

        } else {
            meetings = <View style={styles.noMeetingsContainer}><Text style={styles.noMeetings}>You haven't created
                meeting</Text></View>;
        }
        return (
            <View style={styles.container}>
                {this.state.meetingsLoaded ? null : (
                    <ActivityIndicator size={90} color={Colors.theme} style={styles.spinner}/>)}
                {meetings}
                <View style={styles.footer}>
                    <Text styke={styles.noMeetings}>Possible meetings to create: {ConstKeys.userInfo.meetingCounter}</Text>
                </View>
                {this.state.meetingJoiners.length > 0 && this.state.modalVisible ? this.showJoinersModal(this.state.meetingJoiners) : null}
                <Dialog
                    visible={this.state.dialogVisible}
                    dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
                    onTouchOutside={() => {
                        this.setState({dialogVisible: false});
                    }}
                    dialogStyle={styles.dialog}
                    width={0.8}
                    height={0.25}
                    dialogTitle={<DialogTitle title={this.state.pickedMeeting.params.placeDescription} hasTitleBar={false} align={'center'}/>}
                    actions={[
                        <DialogButton
                            text="DELETE"
                            onPress={() => {this.deleteMeeting(this.state.pickedMeeting)}}
                        />,
                    ]}
                >
                    <DialogContent>
                    </DialogContent>
                </Dialog>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ddd'
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        height: 40,
        width: '100%'
    },
    dialog: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    dialogText: {
        marginTop: 15,
        fontSize: 12
    },
    spinner: {
        flex: 2,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 150,
        alignSelf: 'center'
    },
    flatList: {
    },
    noMeetingsContainer: {
        flex: 1,
        height: '100%', justifyContent: 'center',
    },
    noMeetings: {
        fontSize: 15,
        color: Colors.black,
        fontFamily: 'Cabin',
        alignSelf: 'center',
        textAlign: 'center',
    },
    footer: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
