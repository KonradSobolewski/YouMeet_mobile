import { AsyncStorage } from "react-native";

export const USER_KEY = 'auth-data';
export const APP_DATA = 'app-data';

export const onSignIn = (value) => {
    return AsyncStorage.setItem(USER_KEY, value);
};

export const onSignOut = () =>  {
    return AsyncStorage.removeItem(USER_KEY);
};

export const isSignedIn = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(USER_KEY)
            .then(res => {
                if (res !== null) {
                    resolve(res);
                } else {
                    resolve(false);
                }
            })
            .catch(err => reject(err));
    });
};

export const setAppData = (value) => {
    return AsyncStorage.setItem(APP_DATA, JSON.stringify(value));
};

export const loadAppData = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(APP_DATA)
            .then(res => {
                if (res !== null) {
                    resolve(res);
                } else {
                    reject(false);
                }
            })
            .catch(err => reject(err));
    });
};