import {takeLatest, call, put} from 'redux-saga/effects';
import {NEW_RELEASES} from '../actions/types';
import {apiCall} from '../../helpers';
import {setNewReleases, newReleasesError} from '../actions/newReleasesActions';

function* getNewReleases(action) {
  const {response, error} = yield call(apiCall, {
    url: '/browse/new-releases',
    headers: {Authorization: `Bearer ${action.payload}`},
    params: {country: 'IN'},
  });
  if (response) {
    yield put(setNewReleases(response.data.albums));
  } else {
    console.log("error in getting new releases", Object.values(error));
    yield put(newReleasesError(error));
  }
}

export function* newReleasesWatcher() {
  yield takeLatest(NEW_RELEASES.FETCH, getNewReleases);
}
