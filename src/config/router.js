import React from 'react';
import {
    createMaterialTopTabNavigator, createStackNavigator,
    createDrawerNavigator
} from "react-navigation";
import Login from "../components/LoginPages/Login";
import Register from "../components/RegistrationPages/Register";
import Home from "../components/HomeMap/Home";
import Settings from "../components/HomeMap/Settings";
import AccountInfo from "../components/Settings/AccountInfo"
import AppSettings from "../components/Settings/AppSettings"
import SignOut from "../components/HomeMap/SignOut";
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomDrawerContentComponent from './DrawerComponent';

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
                screen: createDrawerNavigator({
                        homePage: {
                            screen: Home,
                            navigationOptions: {
                                drawerLabel: 'Home',
                                drawerIcon: () => (
                                    <Ionicons name="md-home" size={18}/>
                                )
                            }
                        },
                        Settings: {
                            screen: Settings,
                            navigationOptions: {
                                drawerLabel: 'Settings',
                                drawerIcon: () => (
                                    <Ionicons name="md-settings" size={18}/>
                                )
                            }
                        },
                        SignOut: {
                            screen: SignOut,
                            navigationOptions: {
                                drawerLabel: 'Sign Out',
                                drawerIcon: () => (
                                    <Ionicons name="md-log-out" size={18}/>
                                )
                            }
                        }
                    },
                    {
                        initialRouteName: 'homePage',
                        drawerPosition: 'left',
                        contentComponent: CustomDrawerContentComponent,
                        drawerOpenRoute: 'DrawerOpen',
                        drawerCloseRoute: 'DrawerClose',
                        drawerToggleRoute: 'DrawerToggle'
                    }
                )
            },
            accountInfo: {
                screen: AccountInfo
            },
            appSettings: {
                screen: AppSettings
            }
        },
        {
            initialRouteName: signedIn ? 'homePage' : 'loginPage',
            initialRouteParams: signedIn ? userInfo : null,
            mode: 'modal',
            headerMode: 'none',
        });
};
