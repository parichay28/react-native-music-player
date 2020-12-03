import {takeLatest, call, put} from 'redux-saga/effects';
import {USER} from '../actions/types';
import {apiCall} from '../../helpers';
import {setUserInfo, userError} from '../actions/userActions';

function* getUser(action) {
  const {response, error} = yield call(apiCall, {
    url: '/me',
    headers: {Authorization: `Bearer ${action.payload}`},
  });
  if (response) {
    yield put(setUserInfo(response.data));
  } else {
    console.log(Object.values(error));
    yield put(userError(error));
  }
}

export function* userWatcher() {
  yield takeLatest(USER.FETCH, getUser);
}
