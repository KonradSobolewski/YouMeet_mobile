import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import FetchLocation from "./FetchLocation";
import UsersMap from "./UsersMap";
import UserInfo from "./UserInfo";
import {onSignOut} from '../../config/authorization'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Font, LinearGradient} from 'expo';
import DoubleClick from 'react-native-double-click';

export default class SignOut extends React.Component {


    state = {
        fontLoaded: false
    };

    handleClick = () =>  {
        this.signOut();
    }

    signOut = ()=> {
        onSignOut()
            .then(() => this.props.navigation.navigate('loginPage'))
            .catch(err => console.log(err));
    };

    static navigationOptions = {
      drawerLabel: 'Sign Out',
      drawerIcon: () => (
          <Ionicons name="md-log-out" size={18}/>
      )
    }

    async componentDidMount() {
        await Font.loadAsync({
            'Courgette': require('../../../assets/fonts/Courgette-Regular.ttf'),
        });
        this.setState({fontLoaded: true});
        //this.signOut();
    }


    render() {
        let byebye = null;
        if (this.state.fontLoaded) {
            byebye = <Text style={styles.goodByeText}>Double-Click to say Goodbye</Text>;
        }
        return (
            <View style={styles.wrapper}>
            <LinearGradient colors={['#ebc0fd', '#d9ded8']} style={styles.gradient}
                          locations={[0, 1]} start={[0.2, 0]} end={[0.8, 1.2]}>
                <View style={styles.container}>
                <DoubleClick onClick={this.handleClick}>
                <Image style={styles.hand} source={require('../../../assets/byebye.png')}/>
                </DoubleClick>
                {byebye}
                </View>
            </LinearGradient>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    buttonContainer: {
        borderRadius: 15,
        marginTop: 15,
        backgroundColor: 'rgba(0,255,255,1)',
        padding: 15
    },
    buttonText: {
        color: 'black',
        textAlign: 'center'
    },
    hand: {
        width: 200,
        height: 200
    },
    goodByeText: {
        marginTop: 5,
        fontSize: 20,
        color: 'black',
        fontFamily: 'Courgette'
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    }
});