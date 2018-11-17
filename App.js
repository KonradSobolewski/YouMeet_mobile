import React from 'react';
import {StyleSheet, View} from 'react-native';
import Home from './src/components/HomeMap/Home'
import Login from './src/components/LoginPages/Login'
import Register from './src/components/RegistrationPages/reigster'
import {createMaterialTopTabNavigator, createStackNavigator} from 'react-navigation'
import {Font} from "expo";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class App extends React.Component {
    render() {
        return (
            <MainNav/>
        );
    }
}


const AppStackNavigator = createMaterialTopTabNavigator({
    loginPage: {
        screen: Login,
        navigationOptions: {
          tabBarLabel: 'Login',
          showIcon: true,
          tabBarIcon: () => {
            return <Ionicons name="md-contact" size={20} color={"white"} />
          }
        }
    },
    registerPage: {
        screen: Register,
        navigationOptions: {
          tabBarLabel: 'Register',
          showIcon: true,
          tabBarIcon: () => {
            return <Ionicons name="md-create" size={20} color={"white"} />
          }
        }
    }
  },
    {
    tabBarOptions: {
      showLabel: true, // hide labels
      showIcon: true,
      style: {
          backgroundColor: '#9C27B0' // TabBar background
      }
    }
    }
);

const MainNav = createStackNavigator({
    loginPage: {
        screen: AppStackNavigator
    },
    homePage: {
        screen: Home
    },
    },
    {
    	mode: 'modal',
  	headerMode: 'none',
});

const styles = StyleSheet.create({
    container: {}
});
