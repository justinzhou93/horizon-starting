import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers/root-reducer.js';

/** Middleware */
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

/** Create/Export the store */
export default createStore(rootReducer, applyMiddleware(
    thunkMiddleware,
    createLogger({collapsed: true})
  ));
