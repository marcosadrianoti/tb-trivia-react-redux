import { combineReducers } from 'redux';
import player from './player';
import timer from './timer';

const rootReducers = combineReducers({ player, timer });

export default rootReducers;
