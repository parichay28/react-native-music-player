import { NEW_RELEASES } from "../actions/types";
const initialState = {
	isFetching: true,
	error: "",
	albums: []
};
const newReleasesReducer = (state = initialState, action) => {
	switch (action.type) {
		case NEW_RELEASES.FETCH: {
			return state;
		}
		case NEW_RELEASES.FETCH_SUCCESS: {
			return { ...state, isFetching: false, albums: action.payload };
		}
		case NEW_RELEASES.FETCH_ERROR: {
			return { ...state, isFetching: false, error: action.payload };
		}
		default:
			return state;
	}
};

export default newReleasesReducer;
