import { TIMEOUT } from '../actions/typeActions';

const INITIAL_STATE = {
  timeIsOver: false,
};

const timer = (state = INITIAL_STATE, action) => {
  // const { email, name, score } = action.payload;
  switch (action.type) {
  case TIMEOUT:
    return {
      ...state,
      timeIsOver: action.payload,
    };
  default:
    return state;
  }
};

export default timer;
