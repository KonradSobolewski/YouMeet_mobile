import ConstKeys from '../config/app.consts'
import {onSignOut, onSignIn} from "../config/authorization";
import man from '../../assets/images/man.png'
import girl from '../../assets/images/girl.png'

export const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        fetch(ConstKeys.apiUrl + '/api/getUserByEmail?email=' + email, {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: ConstKeys.auth
            }
        })
            .then(res => {
                if (res.status === 200)
                    resolve(res);
                reject(res);
            })
            .catch(err => reject(err))
    });
};

export const uploadToS3 = (url) => {
    return new Promise((resolve, reject) => {
        fetch(ConstKeys.apiUrl + '/uploadToSThree?id=' + ConstKeys.userInfo.id + '&url=' + url, {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: ConstKeys.auth
            }
        })
            .then(res => {
                if (res.status === 200)
                    resolve(res);
                reject(res);
            })
            .catch(err => reject(err))
    });
};

export const updateUser = () => {
    return new Promise((resolve, reject) => {
        fetch(ConstKeys.apiUrl + '/api/updateUser', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: ConstKeys.auth
            },
            body: JSON.stringify({
                email: ConstKeys.userInfo.email,
                firstName: ConstKeys.userInfo.firstName,
                lastName: ConstKeys.userInfo.lastName,
                params: {
                    photo: ConstKeys.userInfo.photo,
                    hobbies: ConstKeys.userHobbies,
                    age: ConstKeys.userInfo.age,
                    gender: ConstKeys.userInfo.gender,
                    firstTimeLogging: ConstKeys.userInfo.firstTimeLogging
                }
            })
        })
            .then(res => {
                if (res.status === 200) {
                    resolve(res);
                }
                reject(res);
            })
            .catch(err => reject(err))
    });
};

export const signOut = (navigator) => {
    onSignOut()
        .then(() => {
            ConstKeys.auth = '';
            ConstKeys.userInfo = '';
            ConstKeys.userHobbies = [];
            ConstKeys.meetings = [];
            ConstKeys.meetingCounter = 3;
            navigator.navigate('loginPage')
        })
        .catch(err => console.log(err));
};

export const signIn = (navigator) => {
    onSignIn(JSON.stringify({
            auth: ConstKeys.auth,
            userInfo: ConstKeys.userInfo,
            categories: ConstKeys.categories,
            hobbies: ConstKeys.hobbies,
            userHobbies: ConstKeys.userHobbies
        })
    )
        .then(() => {
            if (ConstKeys.userInfo.firstTimeLogging === true)
                navigator.navigate('swiperUpdate');
            else
                navigator.navigate('homePage')
        })
        .catch(err => console.log(err));
};

export const matchResponseToUserInfo = (userData) => {
    return userInfo = {
        id: userData.id,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        name: userData.firstName + ' ' + userData.lastName,
        photo: userData.params.pictureUrl !== null ? userData.params.pictureUrl : image(userData.params.photo),
        age: userData.params.age,
        gender: userData.params.gender,
        meetingCounter: ConstKeys.meetingCounter - userData.params.meetingCounter,
        firstTimeLogging: userData.params.firstTimeLogging
    }
};

export const image = (photo) => {
    if(photo !== null) {
        return photo;
    }
    return null;
};

export const getUserIcon = () => {
    return ConstKeys.userInfo.gender === 'male' ? man : girl;
};

export const getMetUserIcon = (gender) => {
    return gender === 'male' ? man : girl;
};
