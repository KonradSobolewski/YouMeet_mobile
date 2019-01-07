import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Font, LinearGradient} from 'expo';
import DoubleClick from 'react-native-double-click';
import {signOut} from '../../services/user.service'
import UserInfo from "./UserInfo";
import Colors from '../../config/colors'

export default class SignOut extends React.Component {
    state = {};

    render() {
        let byebye = <Text style={styles.goodByeText}>Double-Click to say Goodbye</Text>;
        return (
            <View style={styles.wrapper}>
                <UserInfo showHamburger={true} navigator={this.props.navigation}/>
                <LinearGradient colors={['white', '#DDB6CA']} locations={[0, 0.8]} style={styles.gradient}>
                    <View style={styles.container}>
                        <DoubleClick onClick={() => signOut(this.props.navigation)}>
                            <Image style={styles.hand} source={require('../../../assets/images/byebye.png')}/>
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
