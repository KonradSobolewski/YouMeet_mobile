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

const CustomDrawerContentComponent = (props) => (
    <Container>
        <Header style={styles.drawerHeader}>
            <LinearGradient colors={['#ffffff', '#b22b7d']} style={styles.gradient}
                            locations={[0, 1]} start={[0.2, 0]} end={[0.8, 1.2]}>
                <Body>
                <Image
                    style={styles.drawerImage}
                    source={require('../../assets/images/logo.gif')}/>
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
        height: '100%',justifyContent: 'center', alignItems: 'center',
    },
    drawerImage: {
        paddingTop: 60,
        height: 150,
        width: 150,
        borderRadius: 75
    }

})

export default CustomDrawerContentComponent;
