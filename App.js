import React from 'react';
import {StyleSheet, View} from 'react-native';
import Home from './components/HomeMap/Home'
import Login from './components/LoginPages/Login'
import { StackNavigator } from 'react-navigation'



export default class App extends React.Component {
    render() {
        return (
            <Login/>
        );
    }
}
const styles = StyleSheet.create({
    container: {
    }
});
