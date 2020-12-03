import {RECENTLY_PLAYED} from './types';

export const getRecentlyPlayed = token => {
  return {
    type: RECENTLY_PLAYED.FETCH,
    payload: token,
  };
};

export const setRecentlyPlayed = recentlyPlayed => {
  return {
    type: RECENTLY_PLAYED.FETCH_SUCCESS,
    payload: recentlyPlayed.items,
  };
};

export const recentlyPlayedError = error => {
  return {
    type: RECENTLY_PLAYED.FETCH_ERROR,
    payload: error,
  };
};
