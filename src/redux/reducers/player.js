import { LOGIN, SCORE } from '../actions/typeActions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      gravatarEmail: action.payload.email,
      name: action.payload.name,
      score: action.payload.score,
    };
  case SCORE:
    return {
      ...state,
      score: action.payload,
    };
  default:
    return state;
  }
};

export default player;
