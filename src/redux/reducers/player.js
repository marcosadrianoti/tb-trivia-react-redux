import { LOGIN } from '../actions/typeActions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  const email = action.payload;
  switch (action.type) {
  case LOGIN:
    return { ...state, email };
  default:
    return state;
  }
};

export default player;
