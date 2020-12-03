import React, {Fragment, Component} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Video from 'react-native-video';

import {connect} from 'react-redux';

// actions
import {
  playSong,
  pauseSong,
  resumeSong,
  stopSong,
  updateElapsedTime,
} from '../store/actions/playerActions';

// components
import Home from '../containers/Home';
import CurrentlyPlaying from '../components/CurrentlyPlaying';
import TabBar from '../components/TabBar';

// icons
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const ScreenHeight = Dimensions.get('window').height / 100;
const ScreenWidth = Dimensions.get('window').width / 100;

const Tab = createBottomTabNavigator();

class RootTab extends Component {
  audio = React.createRef();

  handleStopSong = () => {
    if (this.audio.current) {
      this.props.stopSong();
      // audio.current.paused(true);
      this.audio.current.seek(0);
    }
  };

  handlePauseSong = () => {
    // console.log('pause song');
    if (this.audio.current) {
      this.props.pauseSong();
      // audio.current.paused(true);
    }
  };

  handleResumeSong = () => {
    // console.log('resume song');
    if (this.audio.current) {
      this.props.resumeSong();
      // audio.current.paused(false);
    }
  };

  handleSeek = time => {
    if (this.audio.current) {
      this.props.updateElapsedTime(time);
      this.audio.current.seek(time);
    }
  };

  handleElapsedTime = timeDetails => {
    if (this.audio.current) {
      this.props.updateElapsedTime(timeDetails.currentTime);
    }
  };

  handlePlaySong = (track, sectionName) => {
    const {playSong, stopSong, topTracks, recentlyPlayed} = this.props;
    const song = track.id ? track : track.track;
    let allSongs;
    if (sectionName === 'Top Tracks') {
      allSongs = topTracks;
    } else if (sectionName === 'Recently Played') {
      allSongs = recentlyPlayed;
    }
    if (this.audio.current) {
      // stopSong();
      playSong(song, allSongs);
    }
  };
  getComponentWithPlayerControls = Component => (
    <Component
      playNewSong={this.handlePlaySong}
      pauseSong={this.handlePauseSong}
      resumeSong={this.handleResumeSong}
      stopSong={this.handleStopSong}
      updateElapsedTime={this.handleElapsedTime}
      seekSong={this.handleSeek}
      audio={this.audio}
    />
  );

  render() {
    // console.log('rootTba');
    const {theme, songId, songDetails, isPaused} = this.props;
    const audioElement = (
      <Video
        source={{uri: songDetails ? songDetails.preview_url : ''}}
        paused={isPaused}
        ref={this.audio}
        onProgress={this.handleElapsedTime}
        progressUpdateInterval={250}
        onEnd={this.handleStopSong}
        style={{height: 0, width: 0}}
      />
    );

    return (
      <Fragment>
        <Tab.Navigator
          tabBar={props => <TabBar {...props} />}
          // screenOptions={({route}) => ({
          //   tabBarIcon: ({focused, color, size}) => {
          //     let iconName;
          //     let iconSize = ScreenWidth * 6.5;

          //     if (route.name === 'Home') {
          //       iconName = 'home';
          //     } else if (route.name === 'Browse') {
          //       iconName = 'search';
          //     } else if (route.name === 'Favourites') {
          //       iconName = 'favorite';
          //     }
          //     return (
          //       <MaterialIcon name={iconName} size={iconSize} color={color} />
          //     );

          //     // You can return any component that you like here!
          //   },
          // })}
          // tabBarOptions={{
          //   // activeTintColor: 'theme.ICON_SECONDARY',
          //   // inactiveTintColor: theme.TEXT_SECONDARY,
          //   // tabStyle: {backgroundColor: theme.BG_TERTIARY},

          //   // activeTintColor: '#E34677',
          //   // inactiveTintColor: '#FFFFFF',
          //   // tabStyle: {backgroundColor: '#141634'},

          //   labelStyle: {fontSize: ScreenWidth * 3.2},
          // }}
        >
          <Tab.Screen name="Home">
            {() => this.getComponentWithPlayerControls(Home)}
          </Tab.Screen>
          <Tab.Screen name="Browse">
            {() => this.getComponentWithPlayerControls(CurrentlyPlaying)}
          </Tab.Screen>
          <Tab.Screen name="Favourites">
            {() => this.getComponentWithPlayerControls(Home)}
          </Tab.Screen>
        </Tab.Navigator>
        {audioElement}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    newReleases: state.newReleases.albums,
    topTracks: state.topTracks.tracks,
    recentlyPlayed: state.recentlyPlayed.tracks,
    isPaused: state.player.isPaused,
    isPlaying: state.player.isPlaying,
    songDetails: state.player.songDetails,
    songId: state.player.songId,
  };
};

export default connect(
  mapStateToProps,
  {playSong, pauseSong, resumeSong, stopSong, updateElapsedTime},
)(RootTab);
