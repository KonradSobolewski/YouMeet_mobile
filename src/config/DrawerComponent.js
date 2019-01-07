import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";
import {Font, LinearGradient} from 'expo';
import {DrawerItems} from 'react-navigation';
import {Container, Content, Icon, Header, Body} from 'native-base';
import ConstKeys from "./app.consts";
import Colors from '../config/colors'

const CustomDrawerContentComponent = (props) => (
    <Container>
        <Header style={styles.drawerHeader}>
            <LinearGradient colors={['white', '#DDB6CA']} style={styles.gradient}
                            locations={[0, 1]} start={[0.2, 0]} end={[0.8, 1.2]}>
                <Body style={styles.body}>
                <Image
                    style={styles.drawerImage}
                    source={require('../../assets/images/logo2.gif')}/>
                <Text style={styles.text}>Welcome {ConstKeys.userInfo.firstName}</Text>
                </Body>
            </LinearGradient>
        </Header>
        <Content>
            <DrawerItems {...props} />
        </Content>
    </Container>
);

const styles = StyleSheet.create({
    drawerHeader: {
        height: 200
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%', justifyContent: 'center', alignItems: 'center',
    },
    body: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    drawerImage: {
        marginTop: 20,
        height: 140,
        width: 140,
        borderRadius: 70
    },
    text: {
        fontSize: 15,
        padding: 10,
        color: Colors.black
    }
});

export default CustomDrawerContentComponent;
