const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case action.SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case action.REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state;
    }
};

export default sessionReducer;
