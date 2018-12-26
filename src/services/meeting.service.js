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

export const joinMeeting = (meetingId) => {
  return new Promise((resolve, reject) => {
      fetch(ConstKeys.apiUrl + '/api/joinMeeting?id=' + meetingId + '&joiner_id=' + ConstKeys.userInfo.id, {
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

export const createMeeting = (oneToOne, category, description, place) => {
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
                place_longitude: place.coordinate.longitude,
                place_latitude: place.coordinate.latitude,
                description: description,
                placeDescription: place.name.replace(/(\r\n\t|\n|\r\t)/gm,' ')
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

export const getSubscribedToMeetings = (id) => {
    return new Promise((resolve, reject) => {
        fetch(ConstKeys.apiUrl + '/api/getMeetingWithSubscribers?id=' + id, {
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

export const getMeetingWithNewJoiners = (id) => {
    return new Promise((resolve, reject) => {
        fetch(ConstKeys.apiUrl + '/api/getMeetingsWithNewJoiners?id=' + id, {
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

export const acceptJoinerMeeting = (id, joinerId) => {
    return new Promise((resolve, reject) => {
        fetch(ConstKeys.apiUrl + '/api/acceptNewJoinerInMeeting?id=' + id + '&newJoinerId=' + joinerId, {
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

export const getMeetingHistory = (email) => {
    return new Promise((resolve, reject) => {
        fetch(ConstKeys.apiUrl + '/api/getUserMeetingHistory?email=' + email, {
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
