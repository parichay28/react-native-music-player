import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import {useTheme} from '../theme/ThemeProvider';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

// icons
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const ScreenHeight = Dimensions.get('window').height / 100;
const ScreenWidth = Dimensions.get('window').width / 100;

const MiniPlayer = props => {
  const navigation = useNavigation();
  const {styles, theme} = useTheme(stylesheet);
  const handlePress = () => {
    const {playNewSong, resumeSong, pauseSong, seekSong, audio} = props;
    navigation.navigate('Player', {
      audio,
      playNewSong,
      resumeSong,
      pauseSong,
      seekSong,
    });
  };
  const renderPlayButton = theme => {
    const {isPlaying, songId, resumeSong, pauseSong} = props;

    let iconName;
    let iconColor;
    let handleClick = () => {
      // console.log('no miniplayer action');
    };

    if (songId && isPlaying) {
      //render active pause icon
      iconName = 'pause';
      iconColor = theme.TEXT_SECONDARY;
      handleClick = pauseSong;
    } else if (songId && !isPlaying) {
      //render active play icon
      iconName = 'play-arrow';
      iconColor = theme.TEXT_SECONDARY;
      handleClick = resumeSong;
    } else {
      //render inactive play button
      iconName = 'play-arrow';
      iconColor = '#9e9e9e';
    }
    return (
      <TouchableOpacity onPress={handleClick} activeOpacity={0.7}>
        <MaterialIcon
          name={iconName}
          color={iconColor}
          size={ScreenWidth * 9.4}
        />
      </TouchableOpacity>
    );
  };

  // render() {
  const {songDetails} = props;
  return (
    <View style={[styles.container]}>
      {/* <View style={styles.seekProgress} /> */}
      <TouchableOpacity
        style={styles.leftContainer}
        onPress={handlePress}
        activeOpacity={1}>
        <View style={styles.trackImage}>
          <Image
            source={{
              uri: songDetails ? songDetails.album.images[2].url : '',
            }}
            style={
              songDetails
                ? styles.trackImage
                : [styles.trackImage, {borderWidth: 1}]
            }
            resizeMode="cover"
          />
        </View>
        <View style={[styles.detailsContainer]}>
          <Text style={styles.trackName}>
            {songDetails ? songDetails.name : 'Song Name'}
          </Text>
          <Text style={styles.artistName}>
            {songDetails ? songDetails.artists[0].name : 'Artist Name'}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{justifyContent: 'center'}}>
          <MaterialCommunityIcon
            name="heart-outline"
            size={ScreenWidth * 6.4}
            color={theme.TEXT_SECONDARY}
          />
        </TouchableOpacity>
        {renderPlayButton(theme)}
      </View>
    </View>
  );
  // }
};

const stylesheet = theme =>
  StyleSheet.create({
    container: {
      // flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: ScreenWidth,
      borderTopWidth: StyleSheet.hairlineWidth,
      backgroundColor: theme.BG_TERTIARY,
      borderTopColor: theme.SEPARATOR,
      // borderWidth: 1,
      // backgroundColor: '#9c4bb8',
    },
    leftContainer: {
      flex: 4.6,
      flexDirection: 'row',
      // borderWidth: 1,
    },
    seekProgress: {height: StyleSheet.hairlineWidth},
    trackImage: {
      width: ScreenWidth * 14.5,
      height: ScreenWidth * 14.5,
      // borderWidth: 1
    },
    detailsContainer: {
      flex: 1,
      paddingLeft: ScreenWidth * 4,
      justifyContent: 'center',
      // borderWidth: 1,
    },
    iconContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      // borderWidth: 1,
    },
    trackName: {
      color: theme.TEXT_SECONDARY,
      fontFamily: 'Roboto-Bold',
    },
    artistName: {
      color: theme.TEXT_SECONDARY,
      fontFamily: 'Roboto-Light',
    },
  });

const mapStateToProps = state => {
  const {player} = state;
  return {
    isPlaying: player.isPlaying,
    isPaused: player.isPaused,
    timeElapsed: player.timeElapsed,
    songDetails: player.songDetails,
    songId: player.songId,
  };
};

export default connect(
  mapStateToProps,
  null,
)(MiniPlayer);
