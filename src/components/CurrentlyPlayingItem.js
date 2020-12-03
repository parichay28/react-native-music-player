import React from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {useTheme} from '../theme/ThemeProvider';

// icons
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const ScreenHeight = Dimensions.get('window').height / 100;
const ScreenWidth = Dimensions.get('window').width / 100;

const CurrentlyPlayingItem = props => {
  const {songId, isPlaying, playNewSong, resumeSong, pauseSong} = props;

  const {styles, theme} = useTheme(stylesheet);

  // const renderPlayButton = useCallback(
  //   theme => {
  //     let iconName;
  //     let iconColor = theme.TEXT_SECONDARY;
  //     let handleClick = () => {
  //       playNewSong(songDetails);
  //     };

  //     if (songId === songDetails.id && isPlaying) {
  //       //render pause icon
  //       iconName = 'pause';
  //       handleClick = pauseSong;
  //     } else if (songId === songDetails.id && !isPlaying) {
  //       //render play icon
  //       iconName = 'play-arrow';
  //       handleClick = resumeSong;
  //     } else {
  //       //render play button (this will play new song)
  //       iconName = 'play-arrow';
  //     }
  //     return (
  //       <TouchableOpacity onPress={handleClick} activeOpacity={0.7}>
  //         <MaterialIcon
  //           name={iconName}
  //           color={iconColor}
  //           size={ScreenWidth * 9.4}
  //         />
  //       </TouchableOpacity>
  //     );
  //   },
  //   [theme],
  // );

  const handleSongPress = () => {
    playNewSong(songDetails);
  };

  const songDetails = props.songDetails.track
    ? props.songDetails.track
    : props.songDetails;
  // console.log('current playing item', this.props);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleSongPress}
      activeOpacity={0.6}>
      {/* <View style={styles.seekProgress} /> */}
      {/* <View style={styles.trackImageContainer}>
          <Image
            source={{
              uri: songDetails ? songDetails.album.images[2].url : '',
            }}
            style={styles.trackImage}
            // style={
            //   songDetails
            //     ? styles.trackImage
            //     : [styles.trackImage, {borderWidth: 1}]
            // }
            resizeMode="cover"
          />
        </View> */}
      <View style={styles.detailsContainer}>
        <View style={styles.namesContainer}>
          <Text style={styles.trackName}>
            {songDetails ? songDetails.name : 'Song Name'}
          </Text>
          <Text style={styles.artistName}>
            {songDetails ? songDetails.artists[0].name : 'Artist Name'}
          </Text>
        </View>
        <Text style={styles.trackDuration}>
          {`${parseInt(songDetails.duration_ms / 1000 / 60)}:${parseInt(
            (songDetails.duration_ms / 1000) % 60,
          ).toPrecision(2)}`}
        </Text>
      </View>
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
        {/* {this.renderPlayButton(theme)} */}
      </View>
    </TouchableOpacity>
  );
};

const stylesheet = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      height: ScreenWidth * 16.5,
      backgroundColor: theme.BG_TERTIARY,
      marginBottom: ScreenHeight * 1,
      // borderWidth: 1,
    },
    seekProgress: {
      height: StyleSheet.hairlineWidth,
    },
    trackImageContainer: {
      width: ScreenWidth * 16.5,
      height: ScreenWidth * 16.5,
      justifyContent: 'center',
      // borderWidth: 1,
    },
    trackImage: {
      width: ScreenWidth * 14.5,
      height: ScreenWidth * 14.5,
      borderRadius: 4,
      // borderWidth: 1,
    },
    detailsContainer: {
      flex: 3.4,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: ScreenWidth * 4,
      // borderWidth: 1,
    },
    iconContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      // borderWidth: 1,
    },
    namesContainer: {
      flex: 1,
      // borderWidth: 1,
    },
    trackName: {
      fontFamily: 'Roboto-Bold',
      color: theme.TEXT_SECONDARY,
      fontSize: 13,
    },
    artistName: {
      fontFamily: 'Roboto-Light',
      color: theme.TEXT_SECONDARY,
      fontSize: 11,
    },
    trackDuration: {
      fontFamily: 'Roboto-Regular',
      color: theme.TEXT_SECONDARY,
      fontSize: 12,
    },
  });

const mapStateToProps = ({player}) => {
  return {
    isPlaying: player.isPlaying,
    songId: player.songId,
  };
};
export default connect(
  mapStateToProps,
  null,
)(CurrentlyPlayingItem);
