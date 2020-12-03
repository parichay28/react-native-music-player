import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {withTheme, ThemeContext} from '../theme/ThemeProvider';
import {useNavigation} from '@react-navigation/native';

const ScreenHeight = Dimensions.get('window').height / 100;
const ScreenWidth = Dimensions.get('window').width / 100;

class TrackItem extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.track.id !== this.props.track.id ||
      nextProps.themeMode !== this.props.themeMode
    ) {
      // console.log('trackitem will update');
      return true;
    }
    // console.log('trackitem will not update');

    return false;
  }
  // componentDidMount() {
  //   console.log('trackitem mounted');
  // }

  // componentWillUnmount() {
  //   console.log('trackitem umnounted');
  // }
  handlePress = () => {
    const {playNewSong, sectionName, track} = this.props;
    // return console.log(sectionName);
    if (sectionName === 'New Releases') {
      // console.log('new releases item pressed');
      return;
    } else {
      // navigation.navigate('Player');
      playNewSong(track, sectionName);
    }
  };
  render() {
    // console.log('trackitem render');
    const {track, theme, styles} = this.props;
    const {name, artists} = track;
    const images = track.album ? track.album.images : track.images;
    return (
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.6} onPress={this.handlePress}>
          <Image
            source={{uri: images[1].url}}
            style={styles.trackImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.trackName}>
          {name.length > 22 ? name.substring(0, 20) + ' ...' : name}
        </Text>
        <Text style={styles.artistName}>{artists[0].name}</Text>
      </View>
    );
  }
}
const stylesheet = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginRight: 10,
      width: 165,
      // borderWidth: 1,
    },
    trackImage: {
      width: 165,
      height: 165,
      borderRadius: 5,
      marginBottom: 10,
      // borderWidth: 1,
    },
    trackName: {
      flex: 1,
      fontFamily: 'Roboto-Bold',
      color: theme.TEXT_SECONDARY,
      fontSize: 14,
    },
    artistName: {
      flex: 1,
      fontFamily: 'Roboto-Light',
      color: theme.TEXT_SECONDARY,
      fontSize: 12.8,
    },
  });
export default withTheme(stylesheet)(TrackItem);
