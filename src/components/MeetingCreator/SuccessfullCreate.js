import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Font, LinearGradient} from 'expo';
import DoubleClick from 'react-native-double-click';
import Colors from '../../config/colors'

export default class SuccessfullCreate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let aboveImageText = <Text style={styles.goodByeText}>Thank you for creating a meeting!</Text>;
        let underImageText = <Text style={styles.goodByeText}>Double-Click to go back to main screen</Text>;

        return (
            <View style={styles.wrapper}>
                <LinearGradient colors={['white','#ddb6ca']} locations={[0, 0.8]} style={styles.gradient}>
                    <View style={styles.container}>
                        {aboveImageText}
                        <DoubleClick
                            onClick={() => this.props.navigation.navigate('homePage', {isSuccessfulCreate: true})}>
                            <Image style={styles.hand} source={require('../../../assets/images/thumbsUp.png')}/>
                        </DoubleClick>
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
        color: Colors.black,
        textAlign: 'center'
    },
    hand: {
        width: 200,
        height: 200
    },
    goodByeText: {
        marginTop: 5,
        fontSize: 20,
        color: Colors.black,
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
