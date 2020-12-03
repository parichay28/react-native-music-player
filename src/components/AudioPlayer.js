import React, {createRef} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import Video from 'react-native-video';

import {
  playSong,
  pauseSong,
  resumeSong,
  stopSong,
  updateElapsedTime,
} from '../store/actions/playerActions';

const audio = createRef();

const AudioPlayer = props => {
  const {
    pauseSong,
    stopSong,
    resumeSong,
    updateElapsedTime,
    topTracks,
    recentlyPlayed,
    songDetails,
    isPaused,
  } = props;

  const handleStopSong = () => {
    if (audio.current) {
      stopSong();
      // audio.current.paused(true);
      audio.current.seek(0);
    }
  };

  const handlePauseSong = () => {
    if (audio.current) {
      pauseSong();
      // audio.current.paused(true);
    }
  };

  const handleResumeSong = () => {
    if (audio.current) {
      resumeSong();
      // audio.current.paused(false);
    }
  };

  const handleElapsedTime = timeDetails => {
    if (audio.current) {
      updateElapsedTime(timeDetails.currentTime);
    }
  };

  const handlePlaySong = (track, sectionName) => {
    const song = track.id ? track : track.track;
    let allSongs;
    if (sectionName === 'Top Tracks') {
      allSongs = topTracks;
    } else if (sectionName === 'Recently Played') {
      allSongs = recentlyPlayed;
    }
    if (audio.current) {
      stopSong();
      playSong(song, allSongs);
    }
  };

  return (
    <Video
      source={{uri: songDetails.preview_url}}
      paused={isPaused}
      ref={audio}
      onProgress={handleElapsedTime}
      progressUpdateInterval={1000}
      onEnd={handleStopSong}
      style={{height: 0, width: 0}}
    />
  );
};

const mapStateToProps = state => {
  return {
    user: state.user.user,
    token: state.auth.token,
    newReleases: state.newReleases.albums,
    topTracks: state.topTracks.tracks,
    recentlyPlayed: state.recentlyPlayed.tracks,
    isPaused: state.player.isPaused,
    isPlaying: state.player.isPlaying,
    songDetails: state.player.songDetails,
    // darkMode: state.user.darkmode
  };
};

export default connect(
  mapStateToProps,
  {
    playSong,
    pauseSong,
    resumeSong,
    stopSong,
    updateElapsedTime,
  },
)(AudioPlayer);
