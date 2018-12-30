import React from 'react';
import {StyleSheet, FlatList, Text, View, RefreshControl, ActivityIndicator} from "react-native";
import {Font} from 'expo';
import {getRecentMeetings} from "../../services/meeting.service";
import ConstKeys from "../../config/app.consts";
import MeetingItem from "./MeetingItem";

export default class NotificationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: false,
            meetings: [],
            refreshing: false,
            meetingsLoaded: false,
        };
    }

    _isMounted = false;

    async componentDidMount() {
        this._isMounted = true;
        this.getOwnMeetings();
        await Font.loadAsync({
            'Courgette': require('../../../assets/fonts/Courgette-Regular.ttf'),
            'Dosis': require('../../../assets/fonts/Dosis-Regular.ttf'),
            'Gloria': require('../../../assets/fonts/GloriaHallelujah.ttf'),
            'Cabin': require('../../../assets/fonts/Cabin-Regular.ttf'),
        });
        this.setState({fontLoaded: true});
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    getOwnMeetings = () => {
        getRecentMeetings(ConstKeys.userInfo.email).then(res => res.json().then(data => {
                if (this._isMounted) {
                    this.setState({meetings: data, meetingsLoaded: true, refreshing: false});
                    ConstKeys.userInfo.meetingCounter = 3 - data.length;
                }

            })
        ).catch(err => console.log(err));
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
        if (this.state.meetingsLoaded && this.state.fontLoaded && this.state.meetings.length > 0) {
            meetings =
                <FlatList style={styles.flatList}
                          data={this.state.meetings}
                          renderItem={({item}) => (
                              <MeetingItem meetingItem={item} pressAction={(data) => console.log(data)}/>
                          )}
                          keyExtractor={item => item.meeting_id.toString()}
                          ItemSeparatorComponent={this.renderSeparator}
                          ListHeaderComponent={this.renderHeader}
                          refreshControl={
                              <RefreshControl refreshing={this.state.refreshing} onRefresh={this.refresh}/>
                          }
                />

        } else if (this.state.fontLoaded) {
            meetings = <View style={styles.noMeetingsContainer}><Text style={styles.noMeetings}>You haven't created
                meeting</Text></View>;
        }
        return (
            <View style={styles.container}>
                {this.state.meetingsLoaded ? null : (
                    <ActivityIndicator size={90} color="#B22B7D" style={styles.spinner}/>)}
                {meetings}
                <View style={styles.footer}>
                    <Text styke={styles.noMeetings}>Possible meetings to create: {ConstKeys.userInfo.meetingCounter}</Text>
                </View>
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
        color: '#373D3F',
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
