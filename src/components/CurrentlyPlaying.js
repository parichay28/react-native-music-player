import React, {useCallback} from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';

import {useTheme, withTheme} from '../theme/ThemeProvider';

// components
import CurrentlyPlayingItem from './CurrentlyPlayingItem';
import MiniPlayer from './MiniPlayer';
import Header from './Header';

const ScreenWidth = Dimensions.get('window').width / 100;

const CurrentlyPlaying = props => {
  const {
    isPlaying,
    songId,
    playNewSong,
    resumeSong,
    pauseSong,
    seekSong,
    songs,
  } = props;

  const {styles} = useTheme(stylesheet);

  const keyExtractor = useCallback((item, index) => item.id, []);

  const renderItem = useCallback(({item}) => {
    return (
      <CurrentlyPlayingItem
        songDetails={item}
        resumeSong={resumeSong}
        pauseSong={pauseSong}
        playNewSong={playNewSong}
      />
    );
  }, []);

  // console.log('currently playing ', this.props);

  return songs ? (
    <View style={[styles.container]}>
      <Header title=" Currently Playing" style={styles.header} />
      <FlatList
        data={songs}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        style={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      <MiniPlayer
        resumeSong={resumeSong}
        pauseSong={pauseSong}
        playNewSong={playNewSong}
        seekSong={seekSong}
      />
    </View>
  ) : (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No Items Currently Playing</Text>
    </View>
  );
};

const stylesheet = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.BG_PRIMARY,
      // borderWidth: 1,
    },
    header: {
      padding: ScreenWidth * 2,
      marginTop: 10,
      marginBottom: 20,
      // borderWidth: 1,
    },
    listContainer: {
      // height: ScreenHeight * 40,
      padding: ScreenWidth * 2,
      paddingBottom: 0,
      // borderWidth: 1,
    },
    emptyContainer: {
      flex: 1,
      backgroundColor: theme.BG_PRIMARY,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      color: theme.TEXT_SECONDARY,
    },
  });

const mapStateToProps = state => {
  const {player} = state;
  return {
    isPlaying: player.isPlaying,
    isPaused: player.isPaused,
    songs: player.songs,
    songDetails: player.songDetails,
    songId: player.songId,
  };
};

export default connect(
  mapStateToProps,
  null,
)(CurrentlyPlaying);
