import { USER } from "../actions/types";
const initialState = {
	isFetching: true,
	error: "",
	user: {},
	// darkmode: localStorage.getItem("darkmode") === "true" ? true : false
};
const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER.FETCH: {
			return state;
		}
		case USER.FETCH_SUCCESS: {
			return { ...state, isFetching: false, user: action.payload };
		}
		case USER.FETCH_ERROR: {
			return { ...state, isFetching: false, error: action.payload };
		}
		// case USER.CHANGE_THEME: {
		// 	return { ...state, darkmode: !state.darkmode };
		// }
		default:
			return state;
	}
};

export default userReducer;
