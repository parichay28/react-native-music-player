import { RECENTLY_PLAYED } from "../actions/types";
const initialState = {
	isFetching: true,
	error: "",
	tracks: []
};
const recentlyPlayedReducer = (state = initialState, action) => {
	switch (action.type) {
		case RECENTLY_PLAYED.FETCH: {
			return state;
		}
		case RECENTLY_PLAYED.FETCH_SUCCESS: {
			return { ...state, isFetching: false, tracks: action.payload };
		}
		case RECENTLY_PLAYED.FETCH_ERROR: {
			return { ...state, isFetching: false, error: action.payload };
		}
		default:
			return state;
	}
};

export default recentlyPlayedReducer;
