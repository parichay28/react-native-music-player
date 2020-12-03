import {TOKEN} from './types';

export const getToken = token => {
  return {type: TOKEN.FETCH, payload: token};
};

export const setToken = token => {
  return {type: TOKEN.FETCH_SUCCESS, payload: token};
};

// SETTING ERROR OBJECT IN REDUX. COULD RESIDE IN STATE AS WELL IF NOT SHARED AMONG COMPONENTS

export const tokenError = error => {
  return {type: TOKEN.FETCH_ERROR, isError: true, payload: error};
};
