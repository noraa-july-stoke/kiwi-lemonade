import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
// AnyAction type is an interface provided by the redux library in TypeScript that represents any action that can be dispatched to a Redux store.
import { AnyAction } from 'redux'; //

// this tells Typescript not to get mad about the optional redux devtools
// interface Window declaration ensures that TypeScript knows that this
// property exists on the window object, and it also provides some type
// information about the property. It specifies that the
// property should be typeof compose, which means it should be a
// reference to the compose function from the redux library.
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

// lays out shape of the states my reducers are creating so TS can track it
//and check for problems;
interface RootState {


}

const rootReducer = combineReducers < RootState > ({

});

let enhancer: any;

if (process.env.NODE_ENV === 'production') {
    // "thunk as ThunkMiddleware<RootState, AnyAction>" is telling typescript  what thunk is and the props it is receiving
    enhancer = applyMiddleware(thunk as ThunkMiddleware<RootState, AnyAction>);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk as ThunkMiddleware<RootState, AnyAction>, logger));
}

const configureStore = (preloadedState?: RootState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
