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
import MeetingScreen from "../components/MeetingCreator/MeetingScreen"
import MeetingForm from "../components/MeetingCreator/MeetingForm"
import NotificationScreen from '../components/Notifications/NotificationScreen'
import OwnMeetingsScreen from '../components/OwnMeetingsPanel/OwnMeetingsScreen'
import History from "../components/UserHistory/History"
import SuccessfullCreate from "../components/MeetingCreator/SuccessfullCreate"

export const createRootNavigator = (signedIn = false, data) => {
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
                                backgroundColor: '#B22B7D' // TabBar background
                            }
                        }
                    }
                )
            },
            meetingCreated: {
                screen: SuccessfullCreate
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
                        notificationsPage: {
                            screen: createMaterialTopTabNavigator({
                                    joinMeetings: {
                                        screen: NotificationScreen,
                                        navigationOptions: {
                                            tabBarLabel: 'Requested Meetings',
                                            showIcon: true,
                                            tabBarIcon: () => {
                                                return <Ionicons name="md-mail-open" size={20} color={"white"}/>
                                            }
                                        }
                                    },
                                    ownMeetings: {
                                        screen: OwnMeetingsScreen,
                                        navigationOptions: {
                                            tabBarLabel: 'Own Meetings',
                                            showIcon: true,
                                            tabBarIcon: () => {
                                                return <Ionicons name="md-list" size={20} color={"white"}/>
                                            }
                                        }
                                    }
                                },
                                {
                                    tabBarOptions: {
                                        showLabel: true, // hide labels
                                        showIcon: true,
                                        style: {
                                            backgroundColor: '#B22B7D' // TabBar background
                                        }
                                    }
                                }
                            ),
                            navigationOptions: {
                                drawerLabel: 'Notifications',
                                drawerIcon: () => {
                                    return <Ionicons name="md-mail" size={18}/>
                                }
                            }
                        },
                        history: {
                            screen: History,
                            navigationOptions: {
                                drawerLabel: 'History',
                                drawerIcon: () => (
                                    <Ionicons name="md-time" size={18}/>
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
            meetingForm: {
                screen: MeetingForm
            },
            accountInfo: {
                screen: AccountInfo
            },
            appSettings: {
                screen: AppSettings
            },
            createMeeting: {
                screen: MeetingScreen
            },
        },
        {
            initialRouteName: signedIn ? 'homePage' : 'loginPage',
            initialRouteParams: signedIn ? {userInfo: data.userInfo, auth: data.auth} : null,
            mode: 'modal',
            headerMode: 'none',
        });
};
