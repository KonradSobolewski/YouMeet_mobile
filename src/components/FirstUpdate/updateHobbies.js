import React from "react";
import ConstKeys from "../../config/app.consts";
import {Picker, Slider, StyleSheet, Switch, Text, TouchableOpacity, View} from "react-native";
import {LinearGradient} from "expo";
import Colors from "../../config/colors";
import HobbyItem from "../Settings/HobbyItem";

export default class UpdateHobbies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: 1,
            hobbies: ConstKeys.hobbies,
        };
    };

    addUserHobby = (hobby) => {
        if (ConstKeys.userHobbies.indexOf(hobby) < 0) {
            ConstKeys.userHobbies.push(hobby);
        }
        this.forceUpdate();
    };

    deleteUserHobby = (hobby) => {
        const index = ConstKeys.userHobbies.indexOf(hobby);
        if (index >= 0) {
            ConstKeys.userHobbies.splice(index, 1);
        }
        this.forceUpdate();
    };

    render() {
        let yourHobby = <Text style={styles.label}>
            Your hobbies:
        </Text>;
        let chooseHobby = <Text style={styles.label}>
            Choose hobby:
        </Text>;
        let hobbies = null;
        if ( this.state.hobbies.length > 0  ) {
            hobbies = this.state.hobbies.map(hobby => {
                return (
                    <Picker.Item key={hobby.id} label={hobby.name} value={hobby.name}/>
                )
            });
        }
        return (
            <LinearGradient colors={['white', '#ddb6ca']} locations={[0.3, 1]} style={styles.gradient}>
                <Text style={styles.header}>
                    Your hobbies
                </Text>
                <View style={styles.contentContainer}>
                    {chooseHobby}
                    <Picker
                        selectedValue={this.state.selectedValue}
                        prompt={"Choose hobby..."}
                        style={styles.picker}
                        itemStyle={styles.input}
                        onValueChange={(itemValue, itemIndex) => {
                            this.addUserHobby(itemValue);
                            this.state.selectedValue = itemValue;
                        }}>
                        {hobbies}
                    </Picker>
                    {yourHobby}
                    <View style={styles.hobbyContainer}>
                        { ConstKeys.userHobbies.length > 0 ? ConstKeys.userHobbies.map(hobby => {
                            return (
                                <HobbyItem itemName={hobby} deleteHobby={(value) => this.deleteUserHobby(value)}
                                           showDeleteButton={true}/>
                            )
                        }) : (<Text style={styles.label}>You have no hobbies - please add to find related people</Text>)
                        }
                    </View>
                    <Text style={styles.description}>
                        Using the information about your hobbies, we're able to find people with similar interests for you.
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
    hobbyContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    picker: {
        marginTop: 15,
        backgroundColor: 'rgba(255,255,255,0.5)',
        height: 40,
        color: Colors.black,
        padding: 10,
        width: '80%',
        elevation: 1,
    },
});