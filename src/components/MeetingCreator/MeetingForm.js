import React from 'react'
import {StyleSheet,Image, Text, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, CheckBox} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {LinearGradient} from "expo";
import DoubleClick from 'react-native-double-click';

export default class MeetingForm extends React.Component {

    state = {
      isChecked: true
    }


    render() {
        return (

          <View style={styles.wrapper}>
              <LinearGradient colors={['#ebc0fd', '#d9ded8']} style={styles.gradient}
                              locations={[0, 1]} start={[0.2, 0]} end={[0.8, 1.2]}>
                  <View style={styles.container}>
                      <DoubleClick onClick={() => this.props.navigation.navigate('meetingForm')}>
                          <Image style={styles.hand} source={require('../../../assets/images/meetingPerson.png')}/>
                      </DoubleClick>
                      <Text style={styles.textStyle}>Description of the meeting</Text>
                      <TextInput style={styles.input}
                                 placeholder="Enter description of your meeting"
                                 placeholderTextColor="rgba(0,0,0,0.3)"
                                 autoCapitalize="none"
                                 autoCorrect={false}
                                 multinline={true}
                      />
                      <Text style={styles.textStyle}> One-to-one meeting? </Text>
                      <CheckBox
                        value={this.state.isChecked}
                        style={styles.checkbox}
                      />

                      <Text style={styles.textStyle}> Select the category </Text>
                      <TouchableOpacity style={styles.buttonContainer} >
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
      width: 50,
      height: 50
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
    },
    text: {
        fontSize: 20
    },
    input: {

        fontSize: 15,
        marginTop: 15,
        borderRadius: 15,
        backgroundColor: 'rgba(255,255,255,0.2)',
        height: 40,
        color: 'black',
        padding: 10,
        width:'80%'
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
      color: 'black',
      fontFamily: 'Courgette'
    },
    buttonContainer: {
        borderRadius: 15,
        borderColor: 'black',
        marginTop: 60,
        backgroundColor: 'rgba(255,255,255,0.5)',
        padding: 15
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
        fontFamily: 'Courgette'
    }
});
