import { all } from "redux-saga/effects";
import { authWatcher, setToken } from "./authSaga";
import { userWatcher, getUserInfo } from "./userSaga";
import { newReleasesWatcher } from "./newReleasesSaga";
import { recentlyPlayedWatcher } from "./recentlyPlayedSaga";
import { topTracksWatcher } from "./topTracksSaga";
// import { playerWatcher } from "./playerSaga";

export default function* rootSaga() {
	yield all([
		authWatcher(),
		userWatcher(),
		newReleasesWatcher(),
		recentlyPlayedWatcher(),
		topTracksWatcher(),
		// playerWatcher()
	]);
}
