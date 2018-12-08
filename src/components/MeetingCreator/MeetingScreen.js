import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Font, LinearGradient} from 'expo';
import DoubleClick from 'react-native-double-click';
import {signOut, getCategories} from '../../services/user.service'
export default class MeetingScreen extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          categories: null
      };
      this.getAllCategories();
  }


    getAllCategories = () => {
        getCategories().then(response => response.json().then(data => {
                this.setState({categories: data});
            }).catch(err => signOut(this.props.navigation))
        ).catch(err => signOut(this.props.navigation));
    };

    async componentDidMount() {
        await Font.loadAsync({
            'Courgette': require('../../../assets/fonts/Courgette-Regular.ttf'),
        });
        this.setState({fontLoaded: true});
    }

    render() {
        let byebye = null;
        if (this.state.fontLoaded) {
            byebye = <Text style={styles.goodByeText}>Double-Click to start a meeting</Text>;
        }
        return (
            <View style={styles.wrapper}>
                <LinearGradient colors={['#ebc0fd', '#d9ded8']} style={styles.gradient}
                                locations={[0, 1]} start={[0.2, 0]} end={[0.8, 1.2]}>
                    <View style={styles.container}>
                        <DoubleClick onClick={() => this.props.navigation.navigate('meetingForm', this.state)}>
                            <Image style={styles.hand} source={require('../../../assets/images/people.png')}/>
                        </DoubleClick>
                        {byebye}
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
