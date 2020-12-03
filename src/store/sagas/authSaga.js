import {takeLatest, put, call} from 'redux-saga/effects';
import {TOKEN} from '../actions/types';
import {setToken} from '../actions/authActions';

import {apiCall} from '../../helpers';

import axios from 'axios';

import {CONFIG} from '../../config';
const route = `https://accounts.spotify.com/authorize?client_id=${
  CONFIG.CLIENT_ID
}&redirect_uri=${encodeURIComponent(
  CONFIG.REDIRECT_URL,
)}&scope=${encodeURIComponent(CONFIG.SCOPES.join(' '))}&response_type=token`;

function* getToken(action) {
  yield put(setToken(action.payload));
}

// function* getToken(action) {
//   const {response, error} = yield call(apiCall, {
//     baseURL: 'https://accounts.spotify.com/authorize',

//     // url: '/me/player/recently-played',
//     headers: {Authorization: `Bearer ${action.payload}`},
//     params: {
//       client_id: CONFIG.CLIENT_ID,
//       redirect_uri: encodeURIComponent(CONFIG.SCOPES.join(' ')),
//       response_type: 'token',
//     },
//   });
//   if (response) {
//     console.log(Object.values(response));
//   } else {
//     console.log(Object.values(error));
//   }
// }

export function* authWatcher() {
  yield takeLatest(TOKEN.FETCH, getToken);
}
