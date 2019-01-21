import React, { Component } from 'react';
import {
    StyleSheet,
    Text, TouchableOpacity,
    View
} from 'react-native';
import Swiper from 'react-native-swiper'
import UpdatePersonalInfo from './updatePeronalInfo'
import UpdateHobbies from './updateHobbies'
import UpdateSettings from './updateSettings'
import Colors from "../../config/colors";
import ConstKeys from "../../config/app.consts";
import {setAppData, updateUserData} from "../../config/authorization";
import {matchResponseToUserInfo, updateUser} from "../../services/user.service";

export default class SwiperUpdate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: {
                firstName: ConstKeys.userInfo.firstName,
                lastName: ConstKeys.userInfo.lastName,
                photo: ConstKeys.userInfo.photo,
                age: ConstKeys.userInfo.age,
                gender: ConstKeys.userInfo.gender,
                userHobbies: ConstKeys.userHobbies
            }
        }
    };

    updateInfo = () => {
        ConstKeys.userInfo.firstTimeLogging = false;
        updateUserData();
        setAppData({gender: ConstKeys.gender, minAge: ConstKeys.minAge, maxAge: ConstKeys.maxAge});
        updateUser(this.state.userInfo)
            .then(res => {
                res.json().then(data => {
                    ConstKeys.userInfo = matchResponseToUserInfo(data);
                });
                this.props.navigation.navigate('homePage')
            })
            .catch(err => {
                console.log(err);
                this.props.navigation.navigate('loginPage')
            });
    };

    skip = () => {
        ConstKeys.userInfo.firstTimeLogging = false;
        updateUserData();
        updateUser(this.state.userInfo)
            .then(res => {
                res.json().then(data => {
                    ConstKeys.userInfo = matchResponseToUserInfo(data);
                });
                this.props.navigation.navigate('homePage')
            })
            .catch(err => {
                console.log(err);
                this.props.navigation.navigate('loginPage')
            });
    };
    render(){
        return (
            <View style={{height: '100%', width: '100%'}} >
                <Swiper style={styles.wrapper} showsButtons={true} loop={false} dot={
                    <View style={{backgroundColor:'rgba(0,0,0,.2)', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 30,}} />
                }
                        activeDot={<View style={{backgroundColor: Colors.theme, width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 30,}} />}
                >
                    <UpdatePersonalInfo/>
                    <UpdateHobbies/>
                    <UpdateSettings/>
                </Swiper>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => this.skip()}>
                        <Text style={styles.buttonText} >SKIP</Text>
                    </TouchableOpacity>
                    <View style={styles.dotsContainer}>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => this.updateInfo()}>
                        <Text style={styles.buttonText}>NEXT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    wrapper: {height: '100%', width: '100%'},
    bottomContainer: {
        position: 'absolute',
        bottom: 40,
        left:0,
        right:0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: '20%',
        padding: 10,
        borderRadius: 5,
        backgroundColor: Colors.theme,
        elevation: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Cabin',
        fontSize: 15,
        letterSpacing: 3
    },
    dotsContainer: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});