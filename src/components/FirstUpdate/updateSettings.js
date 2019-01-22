import React from "react";
import ConstKeys from "../../config/app.consts";
import {CheckBox, Picker, StyleSheet, Switch, Text, TouchableOpacity, View} from "react-native";
import {LinearGradient} from "expo";
import Colors from "../../config/colors";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class UpdateSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            switchState: ConstKeys.gender !== 'male',
            bothGenders: ConstKeys.gender === 'all',
        }
    };
    setMinAge = (value) => {
        ConstKeys.minAge = value;
        this.forceUpdate();
    };

    setMaxAge = (value) => {
        ConstKeys.maxAge = value;
        this.forceUpdate();
    };

    setBothGender = () => {
        if (!this.state.bothGenders) {
            ConstKeys.gender = 'all';
            this.setState({gender: 'all', bothGenders: true})
        } else {
            this.setState({gender: ConstKeys.gender, bothGenders: false})
        }
    };

    setGender = (value) => {
        if (value) {
            ConstKeys.gender = 'female';
        } else {
            ConstKeys.gender = 'male'
        }
        this.state.switchState = !this.state.switchState;
        this.forceUpdate();
    };

    render() {
        let age = <Text style={styles.label}>
            Search age: {ConstKeys.minAge} - {ConstKeys.maxAge}
        </Text>;
        let gender = <Text style={styles.label}>
            Search gender: {ConstKeys.gender}
        </Text>;
        let all = <Text style={styles.labelCheck}>Both:</Text>;

        return (
            <LinearGradient colors={['white', '#ddb6ca']} locations={[0.3, 1]} style={styles.gradient}>
                <Text style={styles.header}>
                    Application settings
                </Text>
                <View style={styles.contentContainer}>
                    {age}
                    <MultiSlider values={[ConstKeys.minAge, ConstKeys.maxAge]}
                                 step={1}
                                 max={50}
                                 min={18}
                                 onValuesChange={(values) => {
                                     this.setMinAge(values[0]);
                                     this.setMaxAge(values[1]);
                                 }}
                                 valuePrefix={'Minimum'}
                                 valueSuffix={'Maximum'}
                                 minimumTrackTintColor={Colors.black}
                                 thumbTintColor={Colors.black}
                                 style={styles.slider}/>
                    {gender}
                    <View style={styles.switchContainer}>
                        <Ionicons name="md-male" size={23} color={Colors.theme} style={styles.genderIcon}/>
                        <Switch trackColor={{false: 'blue', true: 'red'}}
                                thumbColor={'white'}
                                disabled={this.state.bothGenders}
                                value={this.state.switchState}
                                onValueChange={(value) => this.setGender(value)}/>
                        <Ionicons name="md-female" size={23} color={Colors.theme} style={styles.genderIcon}/>
                        {all}
                        <CheckBox
                            value={this.state.bothGenders}
                            style={styles.checkbox}
                            onChange={(v) => this.setBothGender()}
                        />
                    </View>
                    <Text style={styles.description}>
                        Please choose the age and gender of people you would like to meet in real life!
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
    labelCheck: {
        padding: 10,
        color: Colors.black,
        fontSize: 15,
        fontFamily: 'Cabin',
    },
    checbkox: {
        padding: 10
    },
    slider: {
        width: '80%',
        padding: 10,
        backgroundColor: Colors.theme,
        color: 'white'
    },
    switchContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
    },
    genderIcon: {
        padding: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: {width: 0, height: 1},
        textShadowRadius: 5
    }
});