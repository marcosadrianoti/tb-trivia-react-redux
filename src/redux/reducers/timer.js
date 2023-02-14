import { TIMEOUT, TIME } from '../actions/typeActions';

const INITIAL_STATE = {
  timeIsOver: false,
  time: 30,
};

const timer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TIMEOUT:
    return {
      ...state,
      timeIsOver: action.payload,
    };
  case TIME:
    return {
      ...state,
      time: action.payload,
    };
  default:
    return state;
  }
};

export default timer;
