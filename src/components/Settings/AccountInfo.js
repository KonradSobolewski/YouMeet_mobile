import React from "react";
import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Text, Picker, Slider, Switch
} from "react-native";
import {Font, LinearGradient, ImagePicker} from "expo";
import ConstKeys from '../../config/app.consts'
import {getAllUserHobbies} from "../../services/hobby.service";
import {matchResponseToUserInfo, updateUser} from "../../services/user.service";
import {validateLength} from "../../services/string.service";
import UserInfo from "../HomeMap/UserInfo";
import HobbyItem from './HobbyItem';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Dialog, {DialogContent, ScaleAnimation, DialogTitle} from "react-native-popup-dialog";
import Colors from '../../config/colors'
import {RNS3} from 'react-native-aws3';

export default class AccountInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {
                firstName: ConstKeys.userInfo.firstName,
                lastName: ConstKeys.userInfo.lastName,
                photo: ConstKeys.userInfo.photo,
                age: ConstKeys.userInfo.age,
                gender: ConstKeys.userInfo.gender,
                userHobbies: []
            },
            selectedValue: 1,
            switchState: ConstKeys.userInfo.gender !== 'male',
            hobbies: ConstKeys.hobbies,
            valid: true,
            dialogVisible: ConstKeys.userInfo.firstTimeLogging === true,
            uriImage: null
        };
        this.getUserHobbies();
    }

    pickImage = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4,3],
      });
      if(!result.cancelled) {
        this.setState({uriImage: result.uri});
        const file = {
          uri: this.state.uriImage,
          name: ConstKeys.fileName,
          type: ConstKeys.format
        }
        const config = {
          bucket: ConstKeys.bucketName,
          region: ConstKeys.region,
          accessKey: ConstKeys.accessKey,
          secretKey: ConstKeys.secretKey,
          successActionStatus: 201
        }
        const response = await RNS3.put(file,config)
          .then(response => {
            console.log(response);
          }).catch(err => {
            console.log(err);
          })
      }
    }


    getUserHobbies = () => {
        getAllUserHobbies(ConstKeys.userInfo.email).then(res => res.json().then(data => {
            const tempHobbies = [];
            data.map(hobby => tempHobbies.push(hobby.name));
            this.state.userInfo.userHobbies = tempHobbies;
            this.forceUpdate();
        }))
            .catch(err => {
                console.log(err);
            })
    };

    addUserHobby = (hobby) => {
        if (this.state.userInfo.userHobbies.indexOf(hobby) < 0) {
            this.state.userInfo.userHobbies.push(hobby);
        }
        this.forceUpdate();
    };

    deleteUserHobby = (hobby) => {
        const index = this.state.userInfo.userHobbies.indexOf(hobby);
        if (index >= 0) {
            this.state.userInfo.userHobbies.splice(index, 1);
        }
        this.forceUpdate();
    };

    updateUserInfo = () => {
        if (this.validate()) {
            updateUser(this.state.userInfo)
                .then(res => {
                    res.json().then(data => {
                        ConstKeys.userInfo = matchResponseToUserInfo(data);
                    });
                    this.props.navigation.navigate('homePage')
                })
                .catch(err => console.log(err));
        } else {
            this.setState({valid: false});
        }
    };

    validate = () => {
        return !!(validateLength(this.state.userInfo.firstName) && validateLength(this.state.userInfo.lastName));
    };

    setFirstName = (value) => {
        this.state.userInfo.firstName = value;
    };

    setLastName = (value) => {
        this.state.userInfo.lastName = value;
    };

    setAge = (value) => {
        this.state.userInfo.age = value;
        this.forceUpdate();
    };

    setGender = (value) => {
        if (value) {
            this.state.userInfo.gender = 'female';
        } else {
            this.state.userInfo.gender = 'male'
        }
        this.state.switchState = !this.state.switchState;
        this.forceUpdate();
    };

    render() {
        let firstName = <Text style={styles.label}>
            First Name:
        </Text>;
        let lastName = <Text style={styles.label}>
            Last Name:
        </Text>;
        let age = <Text style={styles.label}>
            Your age: {this.state.userInfo.age}
        </Text>;
        let gender = <Text style={styles.label}>
            Your gender:
        </Text>;
        let yourHobby = <Text style={styles.label}>
            Your hobbies:
        </Text>;
        let chooseHobby = <Text style={styles.label}>
            Choose hobby:
        </Text>;
        let update = <Text style={styles.submitText}>UPDATE</Text>;
        let getImage = <Text style={styles.submitText}>SET LOGO</Text>;
        let hobbies = null;
        if ( this.state.hobbies.length > 0  ) {
            hobbies = this.state.hobbies.map(hobby => {
                return (
                    <Picker.Item key={hobby.id} label={hobby.name} value={hobby.name}/>
                )
            });
        }
        return (
            <LinearGradient colors={['white', '#ddb6ca']} locations={[0, 0.8]} style={styles.gradient}>
                <UserInfo navigator={this.props.navigation} showHamburger={false}/>
                <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <ScrollView>
                        <Dialog
                            visible={this.state.dialogVisible}
                            dialogAnimation={new ScaleAnimation({
                                toValue: 0, // optional
                                useNativeDriver: true, // optional
                            })}
                            onTouchOutside={() => {
                                this.setState({dialogVisible: false});
                            }}
                            dialogStyle={styles.dialog}
                            width={0.8}
                            height={0.2}
                            dialogTitle={<DialogTitle hasTitleBar={false} title="Welcome to YouMeet application"/>}
                        >
                            <DialogContent style={{justifyContent:'center', alignItems:'center'}}>
                                <Text style={{alignSelf: 'center', textAlign: 'center'}}>Please set your personal information to find new
                                    meetings!</Text>
                            </DialogContent>
                        </Dialog>
                        <View style={styles.scrollView}>
                            {firstName}
                            <TextInput
                                style={[styles.input, this.state.valid ? null : styles.inputInvalid]}
                                placeholder="First name"
                                placeholderTextColor="rgba(0,0,0,0.4)"
                                autoCorrect={false}
                                onChangeText={(value) => this.setFirstName(value)}
                                defaultValue={this.state.userInfo.firstName}
                            />
                            {lastName}
                            <TextInput
                                style={[styles.input, this.state.valid ? null : styles.inputInvalid]}
                                placeholder="Last name"
                                placeholderTextColor="rgba(0,0,0,0.4)"
                                autoCorrect={false}
                                onChangeText={(value) => this.setLastName(value)}
                                defaultValue={this.state.userInfo.lastName}
                            />
                            {age}
                            <Slider value={this.state.userInfo.age}
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
                                { this.state.userInfo.userHobbies.length > 0 ? this.state.userInfo.userHobbies.map(hobby => {
                                    return (
                                        <HobbyItem itemName={hobby} deleteHobby={(value) => this.deleteUserHobby(value)}
                                                   showDeleteButton={true}/>
                                    )
                                }) : (<Text style={styles.label}>You have no hobbies - please add to find related people</Text>)
                                }
                            </View>
                            <TouchableOpacity style={styles.submitButton} onPress={() => this.pickImage()}>
                                {getImage}
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.submitButton} onPress={() => this.updateUserInfo()}>
                                {update}
                            </TouchableOpacity>

                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
    scrollView: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
        marginTop: 100
    },
    dialog: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    label: {
        marginTop: 5,
        padding: 5,
        paddingBottom: 0,
        color: Colors.black,
        fontSize: 15,
        fontFamily: 'Cabin'
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
    input: {
        width: '80%',
        borderRadius: 5,
        borderBottomWidth: 1,
        borderBottomColor: Colors.black,
        height: 40,
        color: Colors.black,
        padding: 10
    },
    inputInvalid: {
        backgroundColor: 'rgba(255,51,0,0.2)'
    },
    submitButton: {
        flex: 1,
        borderRadius: 5,
        marginTop: 35,
        marginBottom: 35,
        backgroundColor: Colors.theme,
        padding: 15,
        width: '80%',
        elevation: 2,
    },
    submitText: {
        fontSize: 15,
        color: 'white',
        textAlign: 'center',
        letterSpacing: 2
    },
    hobbyContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
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
