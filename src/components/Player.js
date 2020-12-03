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
  Image,
} from 'react-native';
import {withTheme} from '../theme/ThemeProvider';
import {connect} from 'react-redux';
import Slider from 'react-native-slider';

// icons
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import OctIcon from 'react-native-vector-icons/Octicons';

const ScreenHeight = Dimensions.get('window').height / 100;
const ScreenWidth = Dimensions.get('window').width / 100;

export class Player extends Component {
  state = {
    timeElapsed: 0,
    isSeeking: false,
  };
  renderPlayButton = theme => {
    const {isPlaying, songId} = this.props;
    const {resumeSong, pauseSong} = this.props.route.params;

    let iconName;
    let iconColor;
    let handleClick = () => {
      // console.log('no player action');
    };

    if (songId && isPlaying) {
      //render active pause icon
      iconName = 'pause-circle-filled';
      iconColor = theme.TEXT_SECONDARY;
      handleClick = pauseSong;
    } else if (songId && !isPlaying) {
      //render active play icon
      iconName = 'play-circle-filled';
      iconColor = theme.TEXT_SECONDARY;
      handleClick = resumeSong;
    } else {
      //render inactive play button
      iconName = 'play-circle-filled';
      iconColor = '#9e9e9e';
    }
    return (
      <TouchableOpacity onPress={handleClick} activeOpacity={0.7}>
        <MaterialIcon
          name={iconName}
          color={iconColor}
          size={ScreenWidth * 18}
          style={{marginHorizontal: ScreenWidth * 8}}
        />
      </TouchableOpacity>
    );
  };
  renderNextButton = theme => {
    const {songs} = this.props;
    const {playNewSong} = this.props.route.params;
    let iconColor = '#9e9e9e';
    let handleClick = () => {};
    if (songs && this.getSongIndex() < songs.length - 1) {
      iconColor = theme.TEXT_SECONDARY;
      handleClick = this.handleNextButton;
    }
    return (
      <TouchableOpacity activeOpacity={1} onPress={handleClick}>
        <IonIcon
          name="ios-skip-forward"
          size={ScreenWidth * 9}
          color={iconColor}
        />
      </TouchableOpacity>
    );
  };
  renderPrevButton = theme => {
    const {songs} = this.props;
    const {playNewSong} = this.props.route.params;
    let iconColor = '#9e9e9e';
    let handleClick = () => {};
    if (songs && this.getSongIndex() > 0) {
      iconColor = theme.TEXT_SECONDARY;
      handleClick = this.handlePrevButton;
    }
    return (
      <TouchableOpacity activeOpacity={1} onPress={handleClick}>
        <IonIcon
          name="ios-skip-backward"
          size={ScreenWidth * 9}
          color={iconColor}
        />
      </TouchableOpacity>
    );
  };
  handleSliderRelease = time => {
    const {seekSong} = this.props.route.params;
    seekSong(time);
    // console.log('store time', this.props.timeElapsed);
    // console.log('state time', this.state.timeElapsed);

    this.setState({isSeeking: false, timeElapsed: time});
  };
  handleBackButton = () => {
    this.props.navigation.goBack();
  };
  getSongIndex = () => {
    const {songs, songId} = this.props;

    for (let i = 0; i < songs.length; i++) {
      let currSongId = songs[i].id ? songs[i].id : songs[i].track.id;
      if (currSongId === songId) {
        return i;
      }
    }
  };

  handleNextButton = () => {
    const {songs} = this.props;
    const {playNewSong} = this.props.route.params;

    const index = this.getSongIndex();
    if (index < songs.length - 1) {
      playNewSong(songs[index + 1]);
    }
  };
  handlePrevButton = () => {
    const {songs} = this.props;
    const {playNewSong} = this.props.route.params;

    const index = this.getSongIndex();

    if (index > 0) {
      playNewSong(songs[index - 1]);
    }
  };
  render() {
    const {theme, styles, isPlaying, timeElapsed} = this.props;
    const {isSeeking} = this.state;
    let songDetails = this.props.songDetails;
    if (songDetails && songDetails.track) {
      songDetails = songDetails.track;
    }

    return (
      <View style={[styles.container]}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={this.handleBackButton} activeOpacity={0.6}>
            <MaterialIcon
              name="keyboard-arrow-down"
              size={30}
              color={theme.TEXT_SECONDARY}
              // style={{borderWidth: 1}}
            />
          </TouchableOpacity>

          <Text style={[styles.headerTitle, {color: theme.TEXT_SECONDARY}]}>
            PLAYING FROM YOUR LIBRARY
          </Text>
          <OctIcon
            name="kebab-vertical"
            size={25}
            color={theme.TEXT_SECONDARY}
          />
        </View>
        <View style={[styles.trackImage, {boderBottomWidth: 2, elevation: 10}]}>
          <Image
            source={{
              uri: songDetails ? songDetails.album.images[0].url : '',
            }}
            style={styles.trackImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.namesContainer}>
            <Text style={[styles.trackName, {color: theme.TEXT_SECONDARY}]}>
              {songDetails ? songDetails.name : 'Song Name'}
            </Text>
            <Text style={[styles.artistName, {color: theme.TEXT_SECONDARY}]}>
              {songDetails ? songDetails.album.artists[0].name : 'Artist Name'}
            </Text>
          </View>
          <MaterialCommunityIcon
            name="heart-outline"
            size={ScreenWidth * 6.4}
            color={theme.TEXT_SECONDARY}
            // style={{flex: 1}}
          />
        </View>
        <View style={styles.seekbarContainer}>
          <View style={styles.durationContainer}>
            <Text style={[styles.currentTime, {color: theme.TEXT_SECONDARY}]}>
              {timeElapsed < 10
                ? `00:0${Math.round(timeElapsed)}`
                : `00:${Math.round(timeElapsed)}`}
            </Text>
            <Text style={[styles.totalTime, {color: theme.TEXT_SECONDARY}]}>
              00:30
            </Text>
          </View>
          <Slider
            value={isSeeking ? this.state.timeElapsed : timeElapsed}
            minimumValue={0}
            maximumValue={30}
            onSlidingStart={() => {
              this.setState({isSeeking: true, timeElapsed});
            }}
            onValueChange={timeElapsed => {
              this.setState({timeElapsed});
            }}
            onSlidingComplete={this.handleSliderRelease}
            // disabled={!isPlaying}
            minimumTrackTintColor={theme.TEXT_PRIMARY}
            maximumTrackTintColor={theme.SLIDER_REMAINING}
            style={styles.slider}
            thumbStyle={[styles.thumb, {backgroundColor: theme.TEXT_SECONDARY}]}
            trackStyle={styles.track}
          />
        </View>
        <View style={styles.playerControlsContainer}>
          <TouchableOpacity activeOpacity={0.7}>
            <MaterialIcon
              name="shuffle"
              size={ScreenWidth * 6.4}
              color={theme.TEXT_SECONDARY}
            />
          </TouchableOpacity>
          <View style={styles.mainControlsContainer}>
            {this.renderPrevButton(theme)}
            {this.renderPlayButton(theme)}
            {this.renderNextButton(theme)}
          </View>
          <TouchableOpacity activeOpacity={0.7}>
            <MaterialIcon
              name="repeat"
              size={ScreenWidth * 6.4}
              color={theme.TEXT_SECONDARY}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const stylesheet = theme =>
  StyleSheet.create({
    track: {
      height: 2,
      borderRadius: 1,
    },
    thumb: {
      width: 8,
      height: 8,
      borderRadius: 4,
      // backgroundColor: 'white',
    },
    slider: {
      marginTop: -12,
      // borderWidth: 1
    },
    container: {
      flex: 1,
      paddingVertical: ScreenWidth * 2,
      paddingHorizontal: ScreenWidth * 6,
      // alignItems: 'center',
      backgroundColor: theme.BG_SECONDARY,
      justifyContent: 'space-around',
      // borderWidth: 1,
    },
    headerContainer: {
      // flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      // borderWidth: 1,
    },
    headerTitle: {
      fontFamily: 'Roboto-Bold',
      fontSize: ScreenWidth * 3,
      // borderWidth: 1,
    },
    trackImage: {
      height: ScreenWidth * 80,
      width: ScreenWidth * 80,
      alignSelf: 'center',
      // borderWidth: 1,
    },
    detailsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      // borderWidth: 1,
    },
    namesContainer: {
      // borderWidth: 1,
    },
    trackName: {
      fontFamily: 'Roboto-Bold',
      fontSize: ScreenWidth * 4.3,
    },
    artistName: {
      fontFamily: 'Roboto-Medium',
      fontSize: ScreenWidth * 4,
      opacity: 0.6,
    },
    seekbarContainer: {
      // borderWidth: 1,
    },
    durationContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    currentTime: {
      fontFamily: 'Roboto-Medium',
      fontSize: ScreenWidth * 3,
      opacity: 0.6,
    },
    totalTime: {
      fontFamily: 'Roboto-Medium',
      fontSize: ScreenWidth * 3,
      opacity: 0.6,
    },
    playerControlsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: ScreenHeight * 4,
      // borderWidth: 1,
    },
    mainControlsContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      // borderWidth: 1,
    },
  });

const mapStateToProps = ({player}) => {
  return {
    isPlaying: player.isPlaying,
    timeElapsed: player.timeElapsed,
    songs: player.songs,
    songDetails: player.songDetails,
    songId: player.songId,
  };
};
export default connect(
  mapStateToProps,
  null,
)(withTheme(stylesheet)(Player));
