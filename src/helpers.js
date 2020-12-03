import axios from 'axios';
import {CONFIG} from './config';

export const getHashParams = url => {
  const r = /([^&;=]+)=?([^&;]*)/g;
  const q = url.substring(1);
  let e = r.exec(url);
  if (url.includes('#access_token=')) {
    return e[2];
  }
};

export const apiCall = params => {
  // console.log('api calling');
  return axios
    .request({baseURL: CONFIG.BASE_URL, ...params})
    .then(response => ({response}))
    .catch(error => ({error}));
};
