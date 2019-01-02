import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Font, LinearGradient} from 'expo';
import {DoubleClickLogo} from './DoubleClickLogo'

export default class MeetingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            place: props.navigation.getParam('place')
        };
    }

    render() {
        let aboveImageText = null;
        if (this.props.navigation.getParam('isSuccessfullCreate') === true)
            aboveImageText = <Text style={styles.goodByeText}>Thank you for creating a meeting!</Text>;
        let underImageText = <Text style={styles.goodByeText}>Double-Click to start a meeting</Text>;
        return (
            <View style={styles.wrapper}>
                <LinearGradient colors={['#b22b7d', '#ddb6ca']} locations={[0, 0.8]} style={styles.gradient}>
                    <View style={styles.container}>
                        {aboveImageText}
                        <DoubleClickLogo style={{width: 250, height: 250}}
                                         nagivateMe={() => this.props.navigation.navigate('meetingForm', {place: this.state.place})}
                        />
                        {underImageText}
                    </View>
                </LinearGradient>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    buttonContainer: {
        borderRadius: 15,
        marginTop: 15,
        backgroundColor: 'rgba(0,255,255,1)',
        padding: 15
    },
    buttonText: {
        color: 'black',
        textAlign: 'center'
    },
    hand: {
        width: 200,
        height: 200
    },
    goodByeText: {
        marginTop: 5,
        fontSize: 20,
        color: 'black',
        fontFamily: 'Courgette'
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    }
});
