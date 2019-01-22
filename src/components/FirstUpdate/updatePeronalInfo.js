import React from "react";
import ConstKeys from "../../config/app.consts";
import {StyleSheet, View, Text, TouchableOpacity, Slider, Switch} from "react-native";
import {LinearGradient} from "expo";
import Colors from "../../config/colors";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class UpdatePersonalInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            switchState: ConstKeys.userInfo.gender !== 'male',
        }
    };

    setAge = (value) => {
        ConstKeys.userInfo.age = value;
        this.forceUpdate();
    };

    setGender = (value) => {
        if (value) {
            ConstKeys.userInfo.gender = 'female';
        } else {
            ConstKeys.userInfo.gender = 'male'
        }
        this.state.switchState = !this.state.switchState;
        this.forceUpdate();
    };

    render() {
        let age = <Text style={styles.label}>
            Your age: {ConstKeys.userInfo.age}
        </Text>;
        let gender = <Text style={styles.label}>
            Your gender:
        </Text>;
        return (
            <LinearGradient colors={['white', '#ddb6ca']} locations={[0.3, 1]} style={styles.gradient}>
                <Text style={styles.header}>
                    Personal information
                </Text>
                <View style={styles.contentContainer}>
                    {age}
                    <Slider value={ConstKeys.userInfo.age}
                            step={1}
                            maximumValue={50}
                            minimumValue={18}
                            onSlidingComplete={(value) => this.setAge(value)}
                            minimumTrackTintColor={Colors.black}
                            thumbTintColor={Colors.black}
                            style={styles.slider}/>
                    {gender}
                    <View style={styles.switchContainer}>
                        <Ionicons name="md-male" size={23} color={Colors.black} style={styles.genderIcon}/>
                        <Switch trackColor={{false: 'blue', true: 'red'}}
                                thumbColor={'white'}
                                value={this.state.switchState}
                                onValueChange={(value) => this.setGender(value)}/>
                        <Ionicons name="md-female" size={23} color={Colors.black} style={styles.genderIcon}/>
                    </View>
                    <Text style={styles.description}>
                        Using the information about your age and gender, we match the most-favored combination of people for you
                    </Text>
                </View>

            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    gradient: {
        height: '100%'
    },
    header: {
      color: Colors.black,
      textAlign: 'center',
      fontSize: 20,
      padding: 15,
      fontFamily: 'Cabin'
    },
    contentContainer: {
        padding: 15,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    description: {
        color: Colors.black,
        padding: 30,
        marginTop: 30,
        fontFamily: 'Cabin',
        fontSize: 15,
    },
    label: {
        marginTop: 5,
        padding: 5,
        paddingBottom: 0,
        color: Colors.black,
        fontSize: 15,
        fontFamily: 'Cabin'
    },
    slider: {
        width: '80%',
        padding: 10,
    },
    switchContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
    },
    genderIcon: {
        padding: 10,
        textShadowColor: 'rgba(255, 255, 255, 0.4)',
        textShadowOffset: {width: 0, height: 1},
        textShadowRadius: 5
    }
});