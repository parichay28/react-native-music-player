import {TOP_TRACKS} from './types';

export const getTopTracks = token => {
  return {
    type: TOP_TRACKS.FETCH,
    payload: token,
  };
};

export const setTopTracks = topTracks => {
  return {
    type: TOP_TRACKS.FETCH_SUCCESS,
    payload: topTracks.items,
  };
};

export const topTracksError = error => {
  return {
    type: TOP_TRACKS.FETCH_SUCCESS,
    payload: error,
  };
};
