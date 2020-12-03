import { TOP_TRACKS } from "../actions/types";
const initialState = {
	isFetching: true,
	error: "",
	tracks: []
};
const topTracksReducer = (state = initialState, action) => {
	switch (action.type) {
		case TOP_TRACKS.FETCH: {
			return state;
		}
		case TOP_TRACKS.FETCH_SUCCESS: {
			return { ...state, isFetching: false, tracks: action.payload };
		}
		case TOP_TRACKS.FETCH_ERROR: {
			return { ...state, isFetching: false, error: action.payload };
		}
		default:
			return state;
	}
};

export default topTracksReducer;
