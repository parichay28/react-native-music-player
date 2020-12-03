import { SONG } from "./types";

export const playSong = (track, allTracks) => {
	return { type: SONG.PLAY, payload: { track, allTracks } };
};

export const pauseSong = () => {
	return { type: SONG.PAUSE };
};

export const resumeSong = () => {
	return { type: SONG.RESUME };
};

export const stopSong = () => {
	return { type: SONG.STOP };
};

export const updateVolume = volume => {
	return { type: SONG.UPDATE_VOLUME, payload: volume };
};

export const updateElapsedTime = time => {
	return { type: SONG.UPDATE_ELAPSED_TIME, payload: time };
};

// export const seekSong = time => {
// 	return { type: SONG.UPDATE_ELAPSED_TIME, payload: time };
// };
