import React from 'react';
import {StyleSheet, FlatList, Text, View, RefreshControl, ActivityIndicator} from "react-native";
import {Font} from 'expo';
import {deleteMeeting, getRecentMeetings} from "../../services/meeting.service";
import ConstKeys from "../../config/app.consts";
import MeetingItem from "./MeetingItem";
import {updateUserData} from "../../config/authorization";
import Dialog, {SlideAnimation,ScaleAnimation, DialogContent, DialogTitle, DialogButton} from 'react-native-popup-dialog';
import Colors from '../../config/colors'

export default class NotificationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meetings: [],
            refreshing: false,
            meetingsLoaded: false,
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

    deleteMeeting = (meeting) => {
        this.setState({refreshing: true});
        deleteMeeting(meeting.meeting_id).then(res=> res.json().then(data => console.log(data))).catch(err => console.log(err));
        this.getOwnMeetings();
        this.setState({dialogVisible: false});
    };

    renderSeparator = () => {
        return (
            <View style={{height: 1, width: '100%', backgroundColor: '#CED0CE'}}/>
        );
    };

    refresh = () => {
        this.setState({refreshing: true});
        this.getOwnMeetings();
    };

    renderHeader = () => {
        return (
            <View style={styles.header}>
                <Text style={styles.noMeetings}>Your active meetings</Text>
            </View>
        );
    };

    render() {
        let meetings = null;
        if (this.state.meetingsLoaded && this.state.meetings.length > 0) {
            meetings =
                <FlatList style={styles.flatList}
                          data={this.state.meetings}
                          renderItem={({item}) => (
                              <MeetingItem meetingItem={item} pressAction={(data) => this.setState({pickedMeeting: data, dialogVisible: true})} />
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
                <Dialog
                    visible={this.state.dialogVisible}
                    dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
                    onTouchOutside={() => {
                        this.setState({dialogVisible: false});
                    }}
                    dialogStyle={styles.dialog}
                    width={0.8}
                    height={0.25}
                    dialogTitle={<DialogTitle title={this.state.pickedMeeting.params.placeDescription} hasTitleBar={false} />}
                    actions={[
                        <DialogButton
                            text="MODIFY"
                            onPress={() => {}}
                        />,
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
