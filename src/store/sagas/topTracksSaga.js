import {takeLatest, call, put} from 'redux-saga/effects';
import {TOP_TRACKS} from '../actions/types';
import {apiCall} from '../../helpers';
import {setTopTracks, topTracksError} from '../actions/topTracksActions';

function* getTopTracksEffect(action) {
  const {response, error} = yield call(apiCall, {
    url: '/me/top/tracks',
    headers: {Authorization: `Bearer ${action.payload}`},
  });
  if (response) {
    yield put(setTopTracks(response.data));
  } else {
    console.log('error in getting top tracks', Object.values(error));
    yield put(topTracksError(error));
  }
}

export function* topTracksWatcher() {
  yield takeLatest(TOP_TRACKS.FETCH, getTopTracksEffect);
}
