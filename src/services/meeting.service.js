import ConstKeys from "../config/app.consts";

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


export const createMeeting = (oneToOne, category, description) => {
    return new Promise((resolve, reject) => {
        fetch(ConstKeys.apiUrl + '/api/createMeeting', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: ConstKeys.auth
            },
            body: JSON.stringify({
                inviter_id: parseInt(ConstKeys.userInfo.id),
                is_one_to_one: oneToOne,
                category: parseInt(category),
                place_longitude: "0",
                place_latitude: "0",
                description: description
            })
        })
            .then(res => {
                if (res.status === 200)
                    resolve(res);
                reject(res);
            })
            .catch(err => reject(err))
    });
};