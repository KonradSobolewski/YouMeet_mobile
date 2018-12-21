import React from 'react';
import {StyleSheet, FlatList, Text, View, RefreshControl} from "react-native";
import {Font, LinearGradient} from 'expo';
import HistoryItem from './HistoryItem';
import {getMeetingHistory} from "../../services/meeting.service";
import {signOut} from "../../services/user.service";
import UserInfo from "../HomeMap/UserInfo";
import ConstKeys from "../../config/app.consts";
import { ListItem, SearchBar } from 'react-native-elements';

export default class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            historyLoaded: false,
            history: [],
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
        this.getHistory();
    }

    componentWillUnmount () {
        this._isMounted = false
    }

    getHistory = () => {
        getMeetingHistory(ConstKeys.userInfo.email).then(response => response.json().then(data => {
                if (this._isMounted) {
                    this.setState({history: data, historyLoaded: true, refreshing: false});
                    console.log(data);
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
            <SearchBar placeholder={"Type here..."} onChangeText={(value) => {}} lightTheme inputStyle={{flex:1,width: 200}}/>
        );
    };

    render() {
        let history = null;
        let items = null;
        if(this.state.fontLoaded){
            history = <View style={styles.noMeetingsContainer}><Text style={styles.noMeetings}>You haven't met yet</Text></View>;
        }
        if (this.state.historyLoaded) {
            history =
                    <FlatList style={styles.flatList}
                                data={this.state.history}
                                renderItem={({ item }) => (
                                    <HistoryItem historyData={item}/>
                                )}
                                keyExtractor={item => item.meeting_id}
                                ItemSeparatorComponent={this.renderSeparator}
                                // ListHeaderComponent={this.renderHeader}
                                refreshControl={
                                    <RefreshControl refreshing={this.state.refreshing} onRefresh={this.refresh}/>
                                }
                    />

        }

        return (
            <View style={styles.container}>
                <UserInfo showHamburger={true} navigator={this.props.navigation} fontLoaded={this.state.fontLoaded}/>
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