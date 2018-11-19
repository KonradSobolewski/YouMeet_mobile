import React from 'react';
import {StatusBar} from 'react-native';
import {createRootNavigator} from './src/config/router'
import {isSignedIn} from "./src/config/authorization";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signedIn: false,
            userInfo: null,
            checkedSignIn: false,
        };
    }

    componentDidMount() {
        StatusBar.setHidden(true);
        isSignedIn()
            .then(res => {
                if(res !== false)
                    this.setState({signedIn: true, userInfo: JSON.parse(res), checkedSignIn: true});
                this.setState({checkedSignIn: true});
            })
            .catch(err => alert("An error occurred"));
    }

    render() {
        if (!this.state.checkedSignIn) {
            return null;
        }
        const Layout = createRootNavigator(this.state.signedIn, this.state.userInfo);
        return (
            <Layout/>
        );
    }
}
