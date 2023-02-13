import { LOGIN, TIMEOUT, TIME, SCORE, CLICKED_ANSWER } from './typeActions';

export const LoginAct = (payload) => ({
  type: LOGIN,
  payload,
});

export const TimeIsOver = (payload) => ({
  type: TIMEOUT,
  payload,
});

export const GetTime = (payload) => ({
  type: TIME,
  payload,
});

export const SaveScore = (payload) => ({
  type: SCORE,
  payload,
});

export const ClickedAnswer = (payload) => ({
  type: CLICKED_ANSWER,
  payload,
});
