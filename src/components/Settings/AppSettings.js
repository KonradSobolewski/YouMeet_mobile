import React from "react";
import {CheckBox, Slider, StyleSheet, Switch, Text, TouchableOpacity, View} from "react-native";
import {Font, LinearGradient} from "expo";
import UserInfo from "../HomeMap/UserInfo";
import ConstKeys from "../../config/app.consts";
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {setAppData} from "../../config/authorization";
import Colors from '../../config/colors'

export default class AppSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            switchState: ConstKeys.gender !== 'male',
            gender: ConstKeys.gender,
            minAge: ConstKeys.minAge,
            maxAge: ConstKeys.maxAge,
            bothGenders: ConstKeys.gender === 'all',
        };
    }

    setMinAge = (value) => {
        this.state.minAge = value;
        this.forceUpdate();
    };

    setMaxAge = (value) => {
        this.state.maxAge = value;
        this.forceUpdate();
    };

    setBothGender = () => {
        if (!this.state.bothGenders) {
            this.setState({gender: 'all', bothGenders: true})
        } else {
            this.setState({gender: ConstKeys.gender, bothGenders: false})
        }
    };

    setGender = (value) => {
        if (value) {
            this.state.gender = 'female';
        } else {
            this.state.gender = 'male'
        }
        this.state.switchState = !this.state.switchState;
        this.forceUpdate();
    };

    updateApp = () => {
        ConstKeys.gender = this.state.gender;
        ConstKeys.minAge = this.state.minAge;
        ConstKeys.maxAge = this.state.maxAge;
        setAppData({gender: ConstKeys.gender, minAge: ConstKeys.minAge, maxAge: ConstKeys.maxAge});
        this.props.navigation.navigate('homePage');
    };

    render() {
        let age = <Text style={styles.label}>
            Search age: {this.state.minAge} - {this.state.maxAge}
        </Text>;
        let gender = <Text style={styles.label}>
            Search gender: {this.state.gender}
        </Text>;
        let update = <Text style={styles.submitText}>UPDATE</Text>;
        let all = <Text style={styles.labelCheck}>Both:</Text>;

        return (
            <LinearGradient colors={['white', '#ddb6ca']} locations={[0, 0.8]} style={styles.gradient}>
                <UserInfo showHamburger={false} navigator={this.props.navigation}/>
                <View style={styles.container}>
                    {age}
                    <MultiSlider values={[this.state.minAge, this.state.maxAge]}
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
                </View>
                <TouchableOpacity style={styles.submitButton} onPress={() => this.updateApp()}>
                    {update}
                </TouchableOpacity>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gradient: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checbkox: {
        padding: 10
    },
    labelCheck: {
        padding: 10,
        color: Colors.black,
        fontSize: 15,
        fontFamily: 'Cabin',
    },
    label: {
        marginTop: 5,
        padding: 5,
        paddingBottom: 0,
        color: Colors.black,
        fontSize: 15,
        fontFamily: 'Cabin',
    },
    submitButton: {
        borderRadius: 5,
        margin: 10,
        marginTop: 35,
        backgroundColor: Colors.theme,
        padding: 15,
        width: '80%',
        height: 70,
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitText: {
        fontSize: 15,
        color: 'white',
        textAlign: 'center',
        letterSpacing: 2
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