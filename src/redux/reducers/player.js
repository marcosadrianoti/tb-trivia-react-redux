import { LOGIN } from '../actions/typeActions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  // const { email, name, score } = action.payload;
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      gravatarEmail: action.payload.email,
      name: action.payload.name,
      score: action.payload.score,
    };
  default:
    return state;
  }
};

export default player;
