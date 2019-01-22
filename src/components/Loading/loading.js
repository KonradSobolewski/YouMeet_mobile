import React from 'react';
import {
    StyleSheet, ActivityIndicator
} from 'react-native';
import {LinearGradient} from "expo";
import {getCategories} from "../../services/category.service";
import ConstKeys from "../../config/app.consts";
import {getAllHobbies, getAllUserHobbies} from "../../services/hobby.service";
import {signIn, signOut} from "../../services/user.service";
import {loadAppData, setAppData} from "../../config/authorization";


export default class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoriesLoaded: false,
            hobbiesLoaded: false,
            userHobbiesLoaded: false,
        };

    };

    componentDidMount = () => {
        this.getUserHobbies();
    };

    getUserHobbies = () => {
        getAllUserHobbies(ConstKeys.userInfo.email).then(res => res.json().then(data => {
            const tempHobbies = [];
            data.map(hobby => tempHobbies.push(hobby.name));
            ConstKeys.userHobbies = tempHobbies;
            this.setState({userHobbiesLoaded: true});
            this.getHobbies();
        }))
            .catch(err => {
                signOut(this.props.navigation)
            })
    };

    getHobbies = () => {
        getAllHobbies().then(res => res.json().then(data => {
                ConstKeys.hobbies = data;
                this.setState({hobbiesLoaded: true});
                this.getAllCategories();
            }).catch(err => signOut(this.props.navigation))
        ).catch(err => signOut(this.props.navigation))
    };

    getAllCategories = () => {
        getCategories().then(response => response.json().then(data => {
                ConstKeys.categories = data;
                this.setState({categoriesLoaded: true});
            this.forceUpdate();
            }).catch(err => signOut(this.props.navigation))
        ).catch(err => signOut(this.props.navigation));
    };

    render() {
        if (this.state.categoriesLoaded && this.state.hobbiesLoaded && this.state.userHobbiesLoaded){
            loadAppData().then(appData => {
                let appDataJson = JSON.parse(appData);
                ConstKeys.gender = appDataJson.gender;
                ConstKeys.minAge = appDataJson.minAge;
                ConstKeys.maxAge = appDataJson.maxAge;
                signIn(this.props.navigation);
            }).catch(err => {
                console.log('Cant load app settings');
                setAppData({gender: ConstKeys.gender, minAge: ConstKeys.minAge, maxAge: ConstKeys.maxAge});
                signIn(this.props.navigation);
            });
        }

        return (
            <LinearGradient colors={['white', '#ddb6ca']} locations={[0.3, 1]} style={styles.gradient}>
                <ActivityIndicator size={80} color="black" style={styles.spinner}/>
            </LinearGradient>
        );
    }
}
const styles = StyleSheet.create({
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
    spinner: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        alignSelf: 'center'
    },
});