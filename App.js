import React from 'react';
import {StyleSheet, View} from 'react-native';
import Home from './components/HomeMap/Home'
import Login from './components/LoginPages/Login'
import {createStackNavigator} from 'react-navigation'

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
    }
});
const styles = StyleSheet.create({
    container: {}
});
