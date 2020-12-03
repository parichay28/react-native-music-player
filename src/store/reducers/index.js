import { combineReducers } from "redux";

import authReducer from "./authReducer";
import userReducer from "./userReducer";
import newReleasesReducer from "./newReleasesReducer";
import recentlyPlayedReducer from "./recentlyPlayedReducer";
import topTracksReducer from "./topTracksReducer";
import playerReducer from "./playerReducer";

const rootReducer = combineReducers({
	auth: authReducer,
	user: userReducer,
	newReleases: newReleasesReducer,
	recentlyPlayed: recentlyPlayedReducer,
	topTracks: topTracksReducer,
	player: playerReducer
});
export default rootReducer;
