
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