import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Modal, Image, FlatList, RefreshControl} from 'react-native';
import {getMetUserIcon} from "../../services/user.service";
import {LinearGradient} from "expo";
import Colors from '../../config/colors'
import JoinerItem from "./JoinerItem";

const joinerModal = props => {
    return (
        <Modal
            style={styles.modal}
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => {
                props.closeModal();
            }}>
            <View style={styles.container}>
                <LinearGradient colors={['#FFF', '#ddb6ca']} locations={[0, 0.8]} style={styles.gradient}>
                    <FlatList style={styles.flatList}
                              data={props.joiners}
                              renderItem={({item}) => (
                                  <JoinerItem joiner={item}
                                      acceptJoiner={(data) => props.acceptJoiner(data)}
                                      cancelJoiner={(data) => props.cancelJoiner(data)}
                                  />
                              )}
                              keyExtractor={item => item.email}
                              ItemSeparatorComponent={renderSeparator()}
                              ListHeaderComponent={renderHeader()}
                    />
                </LinearGradient>
            </View>
        </Modal>
    );
};

function renderSeparator() {
    return (
        <View style={{height: 1, width: '100%', backgroundColor: '#CED0CE'}}/>
    );
};

function renderHeader() {
    return (
        <View style={styles.header}>
            <Text style={styles.noMeetings}>Select users</Text>
        </View>
    );
};

export default joinerModal;

const styles = StyleSheet.create({
    container: {
        marginTop: 100,
        marginLeft: 'auto',
        marginRight: 'auto',
        height: 550,
        width: 350,
        zIndex: 5,
        elevation: 10,
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        height: 40,
        width: '100%'
    },
    flatList: {
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 10,
    }
});
