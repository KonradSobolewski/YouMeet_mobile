import { AsyncStorage } from "react-native";

export const USER_KEY = 'auth-data';

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