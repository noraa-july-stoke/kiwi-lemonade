// frontend/src/store/session.js

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

export const removeUser = () => {
    return {
        type: REMOVE_USER,
    };
};
