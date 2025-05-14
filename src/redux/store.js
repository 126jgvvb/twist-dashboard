import { legacy_createStore } from 'redux';
import { reducerFunction } from './reducer';
import { storageObj } from './reducer';


const store = legacy_createStore(reducerFunction,  window.__INITIAL_STATE__ || storageObj);
export default store; 