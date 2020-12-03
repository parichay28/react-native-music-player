import {SONG} from '../actions/types';

const initialState = {
  audio: undefined,
  isPlaying: false,
  timeElapsed: 0,
  songs: undefined,
  songId: undefined,
  songDetails: undefined,
  isPaused: true,
  volume: 100,
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SONG.PLAY:
      return {
        ...state,
        isPlaying: true,
        songs: action.payload.allTracks
          ? action.payload.allTracks
          : state.songs,
        songDetails: action.payload.track,
        songId: action.payload.track.id,
        timeElapsed: 0,
        isPaused: false,
        audio: action.payload.audio,
      };

    case SONG.PAUSE:
      return {
        ...state,
        isPlaying: false,
        isPaused: true,
      };

    case SONG.RESUME:
      return {
        ...state,
        isPlaying: true,
        isPaused: false,
      };

    case SONG.STOP:
      return {
        ...state,
        isPlaying: false,
        isPaused: true,
        // songs: null,
        // songId: null,
        // songDetails: null,
        timeElapsed: 0,
      };

    case SONG.UPDATE_ELAPSED_TIME: {
      return {...state, timeElapsed: action.payload};
    }

    case SONG.UPDATE_VOLUME:
      return {...state, volume: action.payload};

    // case SONG.SEEK:
    // 	return { ...state, timeElapsed: action.payload };

    default:
      return state;
  }
};

export default playerReducer;
