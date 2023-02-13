import { CLICKED_ANSWER } from '../actions/typeActions';

const INITIAL_STATE = {
  clickedAnswer: false,
};

const answer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CLICKED_ANSWER:
    return {
      ...state,
      clickedAnswer: action.payload,
    };
  default:
    return state;
  }
};

export default answer;
