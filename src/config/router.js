import React from 'react';
import {createMaterialTopTabNavigator, createStackNavigator} from "react-navigation";
import Login from "../components/LoginPages/Login";
import Register from "../components/RegistrationPages/Register";
import Home from "../components/HomeMap/Home";
import Ionicons from 'react-native-vector-icons/Ionicons';

export const createRootNavigator = (signedIn = false, userInfo) => {
    return createStackNavigator({
            loginPage: {
                screen: createMaterialTopTabNavigator({
                        loginPage: {
                            screen: Login,
                            navigationOptions: {
                                tabBarLabel: 'Login',
                                showIcon: true,
                                tabBarIcon: () => {
                                    return <Ionicons name="md-contact" size={20} color={"white"}/>
                                }
                            }
                        },
                        registerPage: {
                            screen: Register,
                            navigationOptions: {
                                tabBarLabel: 'Register',
                                showIcon: true,
                                tabBarIcon: () => {
                                    return <Ionicons name="md-create" size={20} color={"white"}/>
                                }
                            }
                        }
                    },
                    {
                        tabBarOptions: {
                            showLabel: true, // hide labels
                            showIcon: true,
                            style: {
                                backgroundColor: '#7b258e' // TabBar background
                            }
                        }
                    }
                )
            },
            homePage: {
                screen: Home
            },
        },
        {
            initialRouteName: signedIn ? 'homePage' : 'loginPage',
            initialRouteParams: signedIn ? userInfo : null,
            mode: 'modal',
            headerMode: 'none',
        });
};