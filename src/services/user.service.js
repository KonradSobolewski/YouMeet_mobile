import ConstKeys from '../config/app.consts'
import {onSignOut, onSignIn} from "../config/authorization";

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

export const getCategories = () => {
  return new Promise((resolve, reject) => {
    fetch(ConstKeys.apiUrl + '/api/getCategories', {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: ConstKeys.auth
      },
    })
        .then(res => {
            if(res.status === 200) {
              resolve(res);
            }
            reject(res);
        })
        .catch(err => reject(err))
  });
};

export const getMeetingPlaces = () => {
    return new Promise((resolve, reject) => {
        fetch(ConstKeys.apiUrl + '/api/getMeetings?user_id=' + ConstKeys.userInfo.id, {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: ConstKeys.auth
            },
        })
            .then(res => {
                if (res.status === 200)
                    resolve(res);
                reject(res);
            })
            .catch(err => reject(err))
    });
};


export const signOut = (navigator) => {
    onSignOut()
        .then(() => navigator.navigate('loginPage'))
        .catch(err => console.log(err));
};

export const signIn = (data, navigator) => {
    onSignIn(JSON.stringify(data))
        .then(() => navigator.navigate('homePage', data))
        .catch(err => console.log(err));
};
