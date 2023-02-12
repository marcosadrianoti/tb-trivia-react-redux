import { LOGIN, TIMEOUT } from './typeActions';

export const LoginAct = (payload) => ({
  type: LOGIN,
  payload,
});

export const TimeIsOver = (payload) => ({
  type: TIMEOUT,
  payload,
});
