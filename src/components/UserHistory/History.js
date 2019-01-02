import React from 'react';
import {StyleSheet, FlatList, Text, View, RefreshControl, ActivityIndicator} from "react-native";
import {Font} from 'expo';
import HistoryItem from './HistoryItem';
import {getMeetingHistory} from "../../services/meeting.service";
import {signOut} from "../../services/user.service";
import UserInfo from "../HomeMap/UserInfo";
import ConstKeys from "../../config/app.consts";

export default class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            historyLoaded: false,
            history: [],
            refreshing: false,
        };
    }
    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;
        this.getHistory();
    }

    componentWillUnmount () {
        this._isMounted = false
    }

    getHistory = () => {
        getMeetingHistory(ConstKeys.userInfo.email).then(response => response.json().then(data => {
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
        this.getHistory();
    };

    renderHeader = () => {
        return (
            <View style={styles.header}>
                <Text style={styles.noMeetings}>Your meeting history</Text>
            </View>
        );
    };

    render() {
        let history = null;
        if (this.state.historyLoaded && this.state.history.length > 0 ) {
            history =
                    <FlatList style={styles.flatList}
                                data={this.state.history}
                                renderItem={({ item }) => (
                                    <HistoryItem historyData={item}/>
                                )}
                                keyExtractor={item => item.meeting_id.toString()}
                                ItemSeparatorComponent={this.renderSeparator}
                                ListHeaderComponent={this.renderHeader}
                                refreshControl={
                                    <RefreshControl refreshing={this.state.refreshing} onRefresh={this.refresh}/>
                                }
                    />

        } else {
            history = <View style={styles.noMeetingsContainer}><Text style={styles.noMeetings}>You haven't met yet</Text></View>;
        }
        return (
            <View style={styles.container}>
                <UserInfo showHamburger={true} navigator={this.props.navigation}/>
                {this.state.historyLoaded ? null : (<ActivityIndicator size={90} color="#B22B7D" style={styles.spinner}/>)}
                {history}
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
    spinner: {
        flex: 2,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 150,
        alignSelf: 'center'
    },
    flatList: {
      marginTop: 80,
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