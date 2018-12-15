import ConstKeys from "../config/app.consts";

export const getAllHobbies = () => {
    return new Promise((resolve, reject) => {
        fetch(ConstKeys.apiUrl + '/api/getAllHobbies', {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: ConstKeys.auth
            },
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


export const getAllUserHobbies = (email) => {
    return new Promise((resolve, reject) => {
        fetch(ConstKeys.apiUrl + '/api/getUserHobbies?email=' + email, {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: ConstKeys.auth
            },
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