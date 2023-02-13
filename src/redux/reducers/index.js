import { combineReducers } from 'redux';
import player from './player';
import timer from './timer';
import answer from './answer';

const rootReducers = combineReducers({ player, timer, answer });

export default rootReducers;
