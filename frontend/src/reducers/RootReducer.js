import {combineReducers} from 'redux';
import loginReducer from './loginReducer.js';

export const RootReducer = combineReducers({login: loginReducer});