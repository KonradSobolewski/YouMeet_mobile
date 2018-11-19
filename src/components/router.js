import React from 'react';
import {createMaterialTopTabNavigator, createStackNavigator} from "react-navigation";
import Login from "./LoginPages/Login";
import Register from "./RegistrationPages/Register";
import Home from "./HomeMap/Home";
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