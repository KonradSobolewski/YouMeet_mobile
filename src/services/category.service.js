import ConstKeys from "../config/app.consts";

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
                if (res.status === 200) {
                    resolve(res);
                }
                reject(res);
            })
            .catch(err => reject(err))
    });
};