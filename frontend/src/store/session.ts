import { csrfFetch } from './csrf';
const SET_USER: string = 'SET_USER';
const REMOVE_USER: string = 'REMOVE_USER';


interface SessionState {
    user: any; // Replace 'any' with the actual type of the user object
}

const actionSetUser = (user: any) => {
    return {
        type: SET_USER,
        user
    };
};

// const actionRemoveUser: Action = () => {
//     return {
//         type: REMOVE_USER,
//     };
// };

export const thunkLogin = (user: any) => async (dispatch: any) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password,
        }),
    });
    const data = await response.json();
    console.log(data)
    dispatch(actionSetUser(data.user));
    return response;
};

const initialState: SessionState = { user: null };

const sessionReducer: Function = (state: SessionState = initialState, action: any) => {
    switch (action.type) {
        case SET_USER: {
            const newState: SessionState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        }
        case REMOVE_USER: {
            const newState: SessionState = Object.assign({}, state);
            newState.user = null;
            return newState;
        }
        default:
            return state;
    }
};

export default sessionReducer;
