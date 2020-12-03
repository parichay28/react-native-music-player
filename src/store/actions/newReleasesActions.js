import { NEW_RELEASES } from "./types";

export const getNewReleases = token => {
	// console.log('getNewReleases called')
	return {
		type: NEW_RELEASES.FETCH,
		payload: token
	};
};

export const setNewReleases = albums => {
	return {
		type: NEW_RELEASES.FETCH_SUCCESS,
		payload: albums.items
	};
};

export const newReleasesError = error => {
	return {
		type: NEW_RELEASES.FETCH_ERROR,
		payload: error
	};
};
