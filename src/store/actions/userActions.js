import {USER} from './types';

export const getUserInfo = token => {
  return {
    type: USER.FETCH,
    payload: token,
  };
};

export const setUserInfo = user => {
  return {
    type: USER.FETCH_SUCCESS,
    payload: user,
  };
};

// export const changeTheme = () => {
// 	return {
// 		type: USER.CHANGE_THEME
// 	};
// };

export const userError = error => {
  return {
    type: USER.FETCH_ERROR,
    payload: error,
  };
};
