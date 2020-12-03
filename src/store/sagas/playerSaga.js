import { takeLatest, put, takeEvery, select } from "redux-saga/effects";
import { SONG } from "../actions/types";
import {
	playSong,
	stopSong,
	resumeSong,
	pauseSong,
	updateElapsedTime,
	updateVolume
} from "../actions/playerActions";

const getAudioObj = state => {
	return state.player.audio;
};

function* stopSongEffect(action) {
	const audio = yield select(getAudioObj);
	if (audio) {
		yield put(stopSong());
		audio.pause();
	}
}

function* pauseSongEffect(action) {
	const audio = yield select(getAudioObj);
	if (audio) {
		yield put(pauseSong());
		audio.pause();
	}
}

function* resumeSongEffect(action) {
	const audio = yield select(getAudioObj);
	if (audio) {
		yield put(resumeSong());
		audio.play();
	}
}

function* playNewSongEffect(action) {
	const audio = yield select(getAudioObj);
	const { track, allTracks } = action.payload;
	const audioObj = new Audio(track.preview_url);
	if (audio === undefined) {
		yield put(playSong(track, allTracks, audioObj));
		audioObj.play();
	} else {
		stopSong();
		audio.pause();
		yield put(playSong(track, allTracks, audioObj));
		audioObj.play();
	}
}

function* updateVolumeEffect(action) {
	yield put(updateVolume(action.payload));
}

function* updateElapsedTimeEffect(action) {
	yield put(updateElapsedTime(action.payload))
}

export function* playerWatcher() {
	yield takeEvery(SONG.REQUEST_PLAY, playNewSongEffect);
	yield takeEvery(SONG.REQUEST_PAUSE, pauseSongEffect);
	yield takeEvery(SONG.REQUEST_RESUME, resumeSongEffect);
	yield takeEvery(SONG.REQUEST_STOP, stopSongEffect);
	yield takeEvery(SONG.REQUEST_UPDATE_VOLUME, updateVolumeEffect);
	yield takeEvery(SONG.REQUEST_UPDATE_ELAPSED_TIME, updateElapsedTimeEffect);
}
