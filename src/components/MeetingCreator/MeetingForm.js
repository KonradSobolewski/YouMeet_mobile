import React from 'react'
import {
    StyleSheet,
    Image,
    Picker,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    CheckBox
} from 'react-native';
import {Font, LinearGradient} from "expo";
import {signOut} from '../../services/user.service';
import DoubleClick from 'react-native-double-click';
import {createMeeting} from "../../services/meeting.service";
import {getCategories} from "../../services/category.service";
import DatePicker from 'react-native-datepicker'
import ConstKeys from "../../config/app.consts";
import {updateUserData} from "../../config/authorization";

export default class MeetingForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: null,
            isChecked: true,
            selectedValue: 1,
            description: null,
            isOneToOne: true,
            category: 1,
            place: props.navigation.getParam('place'),
            pickedTime: null,
        };
        this.getAllCategories();
    }

    getAllCategories = () => {
        getCategories().then(response => response.json().then(data => {
                this.setState({categories: data});
            }).catch(err => signOut(this.props.navigation))
        ).catch(err => signOut(this.props.navigation));
    };

    createMyMeeting = () => {
        if (this.state.pickedTime === null)
            this.state.pickedTime = new Date().getHours().toString() + ':' + new Date().getMinutes().toString();

        createMeeting(this.state.isOneToOne, this.state.category, this.state.description, this.state.place, this.state.pickedTime)
            .then(res => {
                ConstKeys.userInfo.meetingCounter = ConstKeys.userInfo.meetingCounter - 1;
                updateUserData();
                this.props.navigation.navigate('meetingCreated')
            })
            .catch(err => console.log(err));
    };

    setMeetingHour = (date) => {
        let newDate = new Date();
        let now = new Date();
        newDate.setHours(date.substring(0,2));
        newDate.setMinutes(date.substring(3,date.length));
        if (newDate < now.getTime())
            this.setState({pickedTime: now.getHours().toString() + ':' + now.getMinutes().toString()});
        else
            this.setState({pickedTime: date})
    };

    render() {
        let time = new Date().getHours().toString() + ':' + new Date().getMinutes().toString();
        let categories = null;
        if (this.state.categories !== null) {
            categories = this.state.categories.map(category => {
                return (
                    <Picker.Item key={category.id} label={category.type} value={category.id}/>
                )
            });
        }
        return (
            <View style={styles.wrapper}>
                <LinearGradient colors={['#b22b7d', '#ddb6ca']} locations={[0, 0.8]} style={styles.gradient}>
                    <View style={styles.container}>
                        <DoubleClick onClick={() => this.props.navigation.navigate('meetingForm')}>
                            <Image style={styles.hand} source={require('../../../assets/images/meetingPerson.png')}/>
                        </DoubleClick>
                        <Text style={styles.place}>{this.state.place.name}</Text>
                        <Text style={styles.textStyle}>Description of the meeting</Text>
                        <TextInput style={styles.input}
                                   placeholder="Enter description of your meeting"
                                   placeholderTextColor="rgba(0,0,0,0.3)"
                                   autoCapitalize="none"
                                   autoCorrect={false}
                                   multiline={true}
                                   onChangeText={(descriptionText) => this.setState({description: descriptionText})}
                        />

                        <Text style={styles.textStyle}> Select the category </Text>
                        <Picker
                            prompt={"Choose category..."}
                            selectedValue={this.state.selectedValue}
                            style={styles.picker}
                            itemStyle={styles.input}
                            onValueChange={(itemValue, itemIndex) => {
                                this.setState({category: itemValue});
                                this.state.selectedValue = itemValue;
                            }}>
                            {categories}
                        </Picker>
                        <Text style={styles.textStyle}>Select Hour:</Text>
                        <DatePicker
                            style={{width: 200, margin: 10}}
                            date={this.state.pickedTime !== null ? this.state.pickedTime : time}
                            is24Hour={true}
                            mode="time"
                            placeholder="Select hour"
                            format='HH:mm'
                            minDate={time}
                            maxDate={'23:59'}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange={(date) => this.setMeetingHour(date)}
                        />
                        <Text style={styles.textStyle}> One-to-one meeting? </Text>
                        <CheckBox
                            value={this.state.isOneToOne}
                            style={styles.checkbox}
                            onChange={() => this.setState({isOneToOne: !this.state.isOneToOne})}
                        />

                        <TouchableOpacity style={styles.buttonContainer} onPress={this.createMyMeeting}>
                            <Text style={styles.buttonText}>Submit!</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>
        )
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
        borderRadius: 5,
        marginTop: 15,
        backgroundColor: '#FFF',
        paddingVertical: 15,
        elevation: 2,
        width: '80%'
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
        fontFamily: 'Courgette',
    },
    hand: {
        width: 50,
        height: 50,
        tintColor: 'white'
    },
    goodByeText: {
        marginTop: 5,
        fontSize: 20,
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: {width: 0, height: 1},
        textShadowRadius: 5,
        fontFamily: 'Courgette'
    },

    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
    text: {
        fontSize: 20
    },
    input: {
        fontSize: 15,
        marginTop: 15,
        borderRadius: 5,
        backgroundColor: 'rgba(255,255,255,0.2)',
        height: 40,
        color: 'white',
        padding: 10,
        width: '80%',
        textAlign: 'center'
    },
    picker: {
        marginTop: 15,
        borderRadius: 15,
        backgroundColor: 'rgba(255,255,255,0.2)',
        height: 40,
        color: 'white',
        padding: 10,
        width: '80%'
    },
    checkboxTitle: {
        fontSize: 15,
        marginTop: 20
    },
    checbkox: {
        paddingLeft: 40
    },
    icon: {
        fontSize: 20,
        marginLeft: 'auto',
        paddingRight: 20
    },
    textStyle: {
        marginTop: 35,
        fontSize: 20,
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: {width: 0, height: 1},
        textShadowRadius: 5,
        fontFamily: 'Courgette'
    },
    place: {
        marginTop: 30,
        fontSize: 25,
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: {width: 0, height: 1},
        textShadowRadius: 5,
        fontFamily: 'Courgette'
    }
});
