import React from 'react';
import {StyleSheet, FlatList, Text, View, RefreshControl, ActivityIndicator} from "react-native";
import {Font} from 'expo';
import NotificationItem from './NotificationItem';
import NotificationSubscribedItem from './NotificationSubscribedItem';
import {getSubscribedToMeetings, getMeetingWithNewJoiners, acceptJoinerMeeting} from "../../services/meeting.service";
import {signOut} from "../../services/user.service";
import ConstKeys from "../../config/app.consts";

export default class NotificationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            historyLoaded: false,
            history: [],
            newJoinersMeetings: [],
            newJoinersLoaded: false,
            fontLoaded: false,
            refreshing: false,
        };
    }
    _isMounted = false;

    async componentDidMount() {
        this._isMounted = true;
        await Font.loadAsync({
            'Courgette': require('../../../assets/fonts/Courgette-Regular.ttf'),
            'Dosis': require('../../../assets/fonts/Dosis-Regular.ttf'),
            'Gloria': require('../../../assets/fonts/GloriaHallelujah.ttf'),
            'Cabin': require('../../../assets/fonts/Cabin-Regular.ttf'),
        });
        this.setState({fontLoaded: true});
        this.getSubscribedTo();
        this.getNewJoiners();
    }

    componentWillUnmount () {
        this._isMounted = false
    }

    getNewJoiners = () => {
        getMeetingWithNewJoiners(ConstKeys.userInfo.id).then(response => response.json().then(data => {
                if (this._isMounted) {
                    this.setState({newJoinersMeetings: data, newJoinersLoaded: true, refreshing: false});
                }
            }).catch(err => signOut(this.props.navigation))
        ).catch(err => signOut(this.props.navigation));
    };

    getSubscribedTo = () => {
      getSubscribedToMeetings(ConstKeys.userInfo.id).then(response => response.json().then(data => {
              if (this._isMounted) {
                  this.setState({history: data, historyLoaded: true, refreshing: false});
              }
          }).catch(err => signOut(this.props.navigation))
      ).catch(err => signOut(this.props.navigation));
    };

    acceptMeeting = (meetingId, joinerId) => {
      acceptJoinerMeeting(meetingId, joinerId).then(response => response.json().then(data => {
              if (this._isMounted) {
                  this.setState({refreshing: false});
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
        this.getNewJoiners();
    };

    renderHeader = (text) => {
        return (
            <View style={styles.header}>
                <Text style={styles.noMeetings}> {text} </Text>
            </View>
        );
    };

    render() {
        let history = null;
        let newJoiners = null;
        if (this.state.newJoinersLoaded && this.state.fontLoaded && this.state.newJoinersMeetings.length > 0 ) {
            newJoiners =
                    <FlatList style={styles.flatList}
                                data={this.state.newJoinersMeetings}
                                renderItem={({ item }) => (
                                    <NotificationItem acceptMeeting={(meeting_id, joinerId) => this.acceptMeeting(meeting_id, joinerId)} historyData={item}/>
                                )}
                                keyExtractor={item => item.meeting_id.toString()}
                                ItemSeparatorComponent={this.renderSeparator}
                                ListHeaderComponent={this.renderHeader('New joiners in your meetigs: ')}
                                refreshControl={
                                    <RefreshControl refreshing={this.state.refreshing} onRefresh={this.refresh}/>
                                }
                    />

        }
        if (this.state.historyLoaded && this.state.fontLoaded && this.state.history.length > 0 ) {
            history =
                    <FlatList style={styles.flatList}
                                data={this.state.history}
                                renderItem={({ item }) => (
                                    <NotificationSubscribedItem historyData={item}/>
                                )}
                                keyExtractor={item => item.meeting_id.toString()}
                                ItemSeparatorComponent={this.renderSeparator}
                                ListHeaderComponent={this.renderHeader('Subscribed to meetings: ')}
                                refreshControl={
                                    <RefreshControl refreshing={this.state.refreshing} onRefresh={this.refresh}/>
                                }
                    />

        } else if (this.state.fontLoaded){
            history = <View style={styles.noMeetingsContainer}><Text style={styles.noMeetings}>You haven't joined to any meeting</Text></View>;
        }
        return (
            <View style={styles.container}>
                {this.state.historyLoaded ? null : (<ActivityIndicator size={90} color="#B22B7D" style={styles.spinner}/>)}
                {history}
                {newJoiners}
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
        color: '#373D3F',
        fontFamily: 'Cabin',
        alignSelf: 'center',
        textAlign: 'center',
    },
});
