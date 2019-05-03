import {combineReducers} from 'redux';
import loginReducer from './loginReducer.js';
import emploginReducer from './emploginReducer.js';

export const RootReducer = combineReducers({login: loginReducer}, {emplogin: emploginReducer});