import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  SectionList,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import Video from 'react-native-video';

import {connect} from 'react-redux';
import {withTheme} from '../theme/ThemeProvider';

// actions
import {getUserInfo} from '../store/actions/userActions';
import {getNewReleases} from '../store/actions/newReleasesActions';
import {getTopTracks} from '../store/actions/topTracksActions';
import {getRecentlyPlayed} from '../store/actions/recentlyPlayedActions';

// components
import Header from '../components/Header';
import TrackList from '../components/TrackList';
import TrackItem from '../components/TrackItem';
import MiniPlayer from '../components/MiniPlayer';

// icons
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const ScreenHeight = Dimensions.get('window').height / 100;
const ScreenWidth = Dimensions.get('window').width / 100;

export class Home extends Component {
  // state = {
  //   isPlaying: this.props.isPlaying,
  //   isPaused: this.props.isPaused,
  // };
  // componentWillUnmount() {
  //   console.log('home unmounted');
  // }
  // audio = React.createRef();
  componentDidMount() {
    // console.log('home mounted');
    if (
      this.props.newReleases?.length > 0 &&
      this.props.topTracks?.length > 0 &&
      this.props.recentlyPlayed?.length > 0
    ) {
      return;
    }
    console.log('home.js didmount', this.props.getUserInfo);
    this.props.getUserInfo(this.props.token);

    this.props.getNewReleases(this.props.token);
    this.props.getTopTracks(this.props.token);
    this.props.getRecentlyPlayed(this.props.token);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      token,
      isPaused,
      isPlaying,
      user,
      recentlyPlayed,
      topTracks,
      newReleases,
      theme,
    } = this.props;
    if (
      nextProps.token !== token ||
      nextProps.isPaused !== isPaused ||
      nextProps.isPlaying !== isPlaying ||
      typeof nextProps.user !== typeof user ||
      nextProps.recentlyPlayed.length !== recentlyPlayed.length ||
      nextProps.topTracks.length !== topTracks.length ||
      nextProps.newReleases.length !== newReleases.length ||
      nextProps.theme.isDark !== theme.isDark
    ) {
      // console.log('home will update');
      return true;
    }
    // console.log('home will not update');

    return false;
  }

  // stopSong = () => {
  //   if (this.audio.current) {
  //     this.props.stopSong();
  //     // this.audio.current.paused(true);
  //     this.audio.current.seek(0);
  //   }
  // };

  // pauseSong = () => {
  //   if (this.audio.current) {
  //     this.props.pauseSong();
  //     // this.audio.current.paused(true);
  //   }
  // };

  // resumeSong = () => {
  //   if (this.audio.current) {
  //     this.props.resumeSong();
  //     // this.audio.current.paused(false);
  //   }
  // };

  // playNewSong = (track, sectionName) => {
  //   const {playSong, stopSong, topTracks, recentlyPlayed} = this.props;
  //   const song = track.id ? track : track.track;
  //   let allSongs;
  //   if (sectionName === 'Top Tracks') {
  //     allSongs = topTracks;
  //   } else if (sectionName === 'Recently Played') {
  //     allSongs = recentlyPlayed;
  //   }
  //   if (this.audio.current) {
  //     this.stopSong();
  //     this.playSong(song, allSongs);
  //   }
  // };

  // updateElapsedTime = timeDetails => {
  //   if (this.audio.current) {
  //     this.props.updateElapsedTime(timeDetails.currentTime);
  //   }
  // };

  renderItem = data => {
    return (
      <TrackList
        data={data.item}
        sectionName={data.section.title}
        playNewSong={this.props.playNewSong}
      />
    );
  };
  keyExtractor = (item, id) => id;
  renderSectionHeader = ({section}) => {
    if (section.data && section.data[0] === 0) {
      return null;
    }

    return <Header title={section.title} />;
  };
  render() {
    // console.log('home render', this.props);
    const {
      styles,
      theme,
      toggleTheme,
      newReleases,
      topTracks,
      recentlyPlayed,
      user,
      resumeSong,
      pauseSong,
      isPaused,
      songDetails,
      playNewSong,
      seekSong,
      audio,
    } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="black" />
        <SectionList
          sections={[
            {
              data: [0],
              renderItem: () => (
                <View style={styles.headerContainer}>
                  <Text style={styles.headerTitle}>
                    {`Hey ${user?.display_name}`}
                  </Text>
                  <TouchableOpacity onPress={toggleTheme} activeOpacity={0.3}>
                    <MaterialCommunityIcon
                      name={theme.isDark ? 'brightness-7' : 'brightness-4'}
                      size={ScreenWidth * 7}
                      color={theme.TEXT_SECONDARY}
                    />
                  </TouchableOpacity>
                </View>
              ),
            },
            {title: 'New Releases', data: [newReleases]},
            {title: 'Top Tracks', data: [topTracks]},
            {title: 'Recently Played', data: [recentlyPlayed]},
          ]}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          showsVerticalScrollIndicator={false}
          style={styles.allTracksContainer}
        />
        <MiniPlayer
          playNewSong={playNewSong}
          resumeSong={resumeSong}
          pauseSong={pauseSong}
          seekSong={seekSong}
          audio={audio}
        />
      </SafeAreaView>
    );
  }
}

const stylesheet = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.BG_PRIMARY,
      // borderWidth: 1,
      // height: ScreenHeight * 60,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
      marginBottom: 20,
      // borderWidth: 1,
    },
    headerTitle: {
      fontFamily: 'Roboto-Bold',
      color: theme.TEXT_SECONDARY,
      fontSize: 20,
    },
    allTracksContainer: {
      height: ScreenHeight * 73,
      padding: ScreenWidth * 2,
      paddingBottom: 0,
    },
  });

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
    getUserInfo,
    getNewReleases,
    getRecentlyPlayed,
    getTopTracks,
    // playSong,
    // pauseSong,
    // resumeSong,
    // stopSong,
    // updateElapsedTime,
  },
)(withTheme(stylesheet)(Home));
