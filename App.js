import React from 'react';
import {StatusBar} from 'react-native';
import {createRootNavigator} from './src/config/router'
import {isSignedIn, loadAppData} from "./src/config/authorization";
import ConstKeys from './src/config/app.consts'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signedIn: false,
            data: null,
            checkedSignIn: false,
        };
    }

    componentDidMount() {
        StatusBar.setHidden(true);
        isSignedIn()
            .then(res => {
                if (res !== false) {
                    let data = JSON.parse(res);
                    ConstKeys.userInfo = data.userInfo;
                    ConstKeys.auth = data.auth;
                    loadAppData().then(appData => {
                        let appDataJson = JSON.parse(appData);
                        ConstKeys.gender = appDataJson.gender;
                        ConstKeys.minAge = appDataJson.minAge;
                        ConstKeys.maxAge = appDataJson.maxAge;
                        this.setState({signedIn: true, data: data, checkedSignIn: true});
                    }).catch(err => {
                        console.log('Cant load app settings');
                        this.setState({signedIn: true, data: data, checkedSignIn: true});
                    });
                }
                this.setState({checkedSignIn: true});
            })
            .catch(err => alert("An error occurred"));
    }

    render() {
        if (!this.state.checkedSignIn) {
            return null;
        }
        const Layout = createRootNavigator(this.state.signedIn, this.state.data);
        return (
            <Layout/>
        );
    }
}
