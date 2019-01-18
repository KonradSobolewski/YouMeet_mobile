import React from 'react';
import {StyleSheet, FlatList, Text, View, RefreshControl, ActivityIndicator} from "react-native";
import NotificationSubscribedItem from './NotificationSubscribedItem';
import {getSubscribedToMeetings, cancelSubsciptionForMeeting} from "../../services/meeting.service";
import {signOut} from "../../services/user.service";
import ConstKeys from "../../config/app.consts";
import Colors from '../../config/colors'
import Dialog, {SlideAnimation,ScaleAnimation, DialogContent, DialogTitle, DialogButton} from 'react-native-popup-dialog';

export default class NotificationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            historyLoaded: false,
            history: [],
            refreshing: false,
            pickedMeeting: {
                params: {
                    placeDescription: 'Place'
                }
            },
            dialogVisible: false
        };
    }
    _isMounted = false;

    async componentDidMount() {
        this._isMounted = true;
        this.getSubscribedTo();
        this.getNewJoiners();
    }

    componentWillUnmount () {
        this._isMounted = false
    }

    getSubscribedTo = () => {
      getSubscribedToMeetings(ConstKeys.userInfo.id).then(response => response.json().then(data => {
              if (this._isMounted) {
                  this.setState({history: data, historyLoaded: true, refreshing: false});
              }
          }).catch(err => signOut(this.props.navigation))
      ).catch(err => signOut(this.props.navigation));
    };

    renderSeparator = () => {
      return (
        <View style={{height: 1, width: '100%', backgroundColor: '#CED0CE'}}/>
      );
    };

    refresh = () => {
        this.setState({refreshing: true});
        this.getSubscribedTo();
    };

    renderHeader = (text) => {
        return (
            <View style={styles.header}>
                <Text style={styles.noMeetings}> {text} </Text>
            </View>
        );
    };

    cancelSubscription = () => {
        cancelSubsciptionForMeeting(this.state.pickedMeeting.meeting_id, ConstKeys.userInfo.id).then(response => response.json().then(
            data => console.log(data)
        ))
    };

    render() {
        let history = null;
        let newJoiners = null;
        if (this.state.historyLoaded && this.state.history.length > 0 ) {
            history =
                    <FlatList style={styles.flatList}
                                data={this.state.history}
                                renderItem={({ item }) => (
                                    <NotificationSubscribedItem historyData={item} pressAction={(data) => this.setState({pickedMeeting: data, dialogVisible: true})}/>
                                )}
                                keyExtractor={item => item.meeting_id.toString()}
                                ItemSeparatorComponent={this.renderSeparator}
                                ListHeaderComponent={this.renderHeader('Subscribed to meetings: ')}
                                refreshControl={
                                    <RefreshControl refreshing={this.state.refreshing} onRefresh={this.refresh}/>
                                }
                    />

        } else {
            history = <View style={styles.noMeetingsContainer}><Text style={styles.noMeetings}>You haven't joined to any meeting</Text></View>;
        }
        return (
            <View style={styles.container}>
                {this.state.historyLoaded ? null : (<ActivityIndicator size={90} color={Colors.theme} style={styles.spinner}/>)}
                {history}
                {newJoiners}
                <Dialog
                    visible={this.state.dialogVisible}
                    dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
                    onTouchOutside={() => {
                        this.setState({dialogVisible: false});
                    }}
                    dialogStyle={styles.dialog}
                    width={0.8}
                    height={0.25}
                    dialogTitle={<DialogTitle title={'Are you sure to cancel meeting?'} hasTitleBar={false} />}
                    actions={[
                        <DialogButton
                            text="CANCEL"
                            onPress={() => {
                                this.cancelSubscription();
                                let filteredItems = this.state.history.filter(item => {
                                    return item.meeting_id !== this.state.pickedMeeting.meeting_id;
                                });
                                this.setState({dialogVisible: false, history: filteredItems})
                            }}
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
    dialog: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    dialogText: {
        marginTop: 15,
        fontSize: 12
    },
    header: {
        flex:1 ,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        height: 40,
        width: '100%'
    },
    infoText: {
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 16
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
        flex:1,
       height: '100%', justifyContent: 'center',
    },
    noMeetings:{
        fontSize: 15,
        color: Colors.black,
        fontFamily: 'Cabin',
        alignSelf: 'center',
        textAlign: 'center',
    },
});
