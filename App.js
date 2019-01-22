import React from 'react';
import {StatusBar} from 'react-native';
import {createRootNavigator} from './src/config/router'
import {isSignedIn, loadAppData} from "./src/config/authorization";
import ConstKeys from './src/config/app.consts'
import {Font} from "expo";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signedIn: false,
            checkedSignIn: false,
            fontLoaded: false
        };
    }

    async componentDidMount() {
        StatusBar.setHidden(true);
        await Font.loadAsync({
            'Courgette': require('./assets/fonts/Courgette-Regular.ttf'),
            'Dosis': require('./assets/fonts/Dosis-Regular.ttf'),
            'Gloria': require('./assets/fonts/GloriaHallelujah.ttf'),
            'Cabin': require('./assets/fonts/Cabin-Regular.ttf'),
        });
        this.setState({fontLoaded: true});
        isSignedIn()
            .then(res => {
                let data = JSON.parse(res);
                ConstKeys.userInfo = data.userInfo;
                ConstKeys.auth = data.auth;
                ConstKeys.hobbies = data.hobbies;
                ConstKeys.categories = data.categories;
                ConstKeys.userHobbies = data.userHobbies;
                this.setState({signedIn: true, checkedSignIn: true});
            })
            .catch(err => {
                this.setState({checkedSignIn: true});
                this.navigation.navigator.navigate('loginPage')
            });
    }

    render() {
        if (!this.state.checkedSignIn || !this.state.fontLoaded) {
            return null;
        }
        const Layout = createRootNavigator(this.state.signedIn);
        return (
            <Layout/>
        );
    }
}
