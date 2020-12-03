import {takeLatest, call, put} from 'redux-saga/effects';
import {RECENTLY_PLAYED} from '../actions/types';
import {apiCall} from '../../helpers';
import {
  setRecentlyPlayed,
  recentlyPlayedError,
} from '../actions/recentlyPlayedActions';

function* getRecentlyPlayed(action) {
  const {response, error} = yield call(apiCall, {
    url: '/me/player/recently-played',
    headers: {Authorization: `Bearer ${action.payload}`},
  });
  if (response) {

    yield put(setRecentlyPlayed(response.data));
  } else {
    console.log('error in getting recently played', Object.values(error));

    yield put(recentlyPlayedError(error));
  }
}

export function* recentlyPlayedWatcher() {
  yield takeLatest(RECENTLY_PLAYED.FETCH, getRecentlyPlayed);
}
