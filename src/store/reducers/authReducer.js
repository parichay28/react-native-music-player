import {TOKEN} from '../actions/types';
const initialState = {
  isFetching: false,
  error: '',
  isAuthenticated: false,
  token: '',
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOKEN.FETCH: {
      return {...state, isFetching: true};
    }
    case TOKEN.FETCH_SUCCESS: {
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        isFetching: false,
      };
    }

    case TOKEN.FETCH_ERROR: {
      return {...state, error: action.payload, isFetching: false};
    }

    default:
      return state;
  }
};

export default authReducer;
