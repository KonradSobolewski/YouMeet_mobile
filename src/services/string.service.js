import ConstKeys from "../config/app.consts";

export const getUserNameAndLastName = (name) => {
    console.log(name);
    let index = name.indexOf(' ');
    let firstName = name.substring(0, index);
    let lastName = name.substr(index + 1, name.length);
    return {
        firstName: firstName,
        lastName: lastName
    }
};

export const validateLength = (value) => {
    return value.length >= ConstKeys.minLength;
};

export const validateEmail = (email) => {
    let reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return reg.test(email);
};