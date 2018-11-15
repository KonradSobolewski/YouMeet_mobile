import React from 'react';
import {StyleSheet, View} from 'react-native';
import Home from './components/HomeMap/Home'
import Login from './components/LoginPages/Login'
import Register from './components/RegistrationPages/reigster'
import {createStackNavigator} from 'react-navigation'
import {Font} from "expo";

export default class App extends React.Component {
    render() {
        return (
            <AppStackNavigator/>
        );
    }
}

const AppStackNavigator = createStackNavigator({
    loginPage: {
        screen: Login
    },
    homePage: {
        screen: Home
    },
    registerPage: {
        screen: Register
    }
});
const styles = StyleSheet.create({
    container: {}
});
