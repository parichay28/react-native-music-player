import React, {Fragment, useContext, useMemo} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Video from 'react-native-video';

import {connect} from 'react-redux';

import {useTheme, withTheme} from './theme/ThemeProvider';

import {
  playSong,
  pauseSong,
  resumeSong,
  stopSong,
  updateElapsedTime,
} from './store/actions/playerActions';

// containers
import Login from './containers/Login';
import Home from './containers/Home';

// components
import RootTab from './components/RootTab';
import AudioPlayer from './components/AudioPlayer';
import Player from './components/Player';

// icons
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const ScreenHeight = Dimensions.get('window').height / 100;
const ScreenWidth = Dimensions.get('window').width / 100;

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

export function AuthStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={Login} />
    </Stack.Navigator>
  );
}

const AppStack = props => {
  const {theme} = useTheme(() => {});
  return (
    <View style={{backgroundColor: theme.BG_PRIMARY, flex: 1}}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Root" component={RootTab} />
        <Stack.Screen name="Player" component={Player} />
      </Stack.Navigator>
      {/* <View style={styles.miniPlayer}>
          <Text>Player</Text>
        </View> */}
    </View>
  );
};

// class RootTab extends React.Component {
//   audio = React.createRef();

//   handleStopSong = () => {
//     if (this.audio.current) {
//       this.props.stopSong();
//       // audio.current.paused(true);
//       this.audio.current.seek(0);
//     }
//   };

//   handlePauseSong = () => {
//     if (this.audio.current) {
//       this.props.pauseSong();
//       // audio.current.paused(true);
//     }
//   };

//   handleResumeSong = () => {
//     if (this.audio.current) {
//       this.props.resumeSong();
//       // audio.current.paused(false);
//     }
//   };

//   handleElapsedTime = timeDetails => {
//     if (this.audio.current) {
//       this.props.updateElapsedTime(timeDetails.currentTime);
//     }
//   };

//   handlePlaySong = (track, sectionName) => {
//     const {playSong, stopSong, topTracks, recentlyPlayed} = this.props;
//     const song = track.id ? track : track.track;
//     let allSongs;
//     if (sectionName === 'Top Tracks') {
//       allSongs = topTracks;
//     } else if (sectionName === 'Recently Played') {
//       allSongs = recentlyPlayed;
//     }
//     if (this.audio.current) {
//       stopSong();
//       playSong(song, allSongs);
//     }
//   };
//   getHomeComponent = props => (
//     <Home
//       playNewSong={this.handlePlaySong}
//       pauseSong={this.handlePauseSong}
//       resumeSong={this.handleResumeSong}
//       stopSong={this.handleStopSong}
//       updateElapsedTime={this.handleElapsedTime}
//       audio={this.audio}
//     />
//   );

//   render() {
//     console.log('rootTba');
//     const {theme} = this.props;
//     const {songDetails, isPaused} = this.props;
//     const audioElement = (
//       <Video
//         source={{uri: songDetails ? songDetails.preview_url : ''}}
//         paused={isPaused}
//         ref={this.audio}
//         onProgress={this.handleElapsedTime}
//         progressUpdateInterval={1000}
//         onEnd={this.handleStopSong}
//         style={{height: 0, width: 0}}
//       />
//     );
//     return (
//       <Fragment>
//         <Tab.Navigator
//           screenOptions={({route}) => ({
//             tabBarIcon: ({focused, color, size}) => {
//               let iconName;
//               let iconSize = ScreenWidth * 6.5;

//               if (route.name === 'Home') {
//                 iconName = 'home';
//               } else if (route.name === 'Browse') {
//                 iconName = 'search';
//               } else if (route.name === 'Favourites') {
//                 iconName = 'favorite';
//               }
//               return (
//                 <MaterialIcon name={iconName} size={iconSize} color={color} />
//               );

//               // You can return any component that you like here!
//             },
//           })}
//           tabBarOptions={{
//             // activeTintColor: 'theme.ICON_SECONDARY',
//             // inactiveTintColor: theme.TEXT_SECONDARY,
//             // tabStyle: {backgroundColor: theme.BG_TERTIARY},

//             // activeTintColor: '#E34677',
//             // inactiveTintColor: '#FFFFFF',
//             // tabStyle: {backgroundColor: '#141634'},

//             labelStyle: {fontSize: ScreenWidth * 3.2},
//           }}>
//           <Tab.Screen name="Home" component={Home} />
//           <Tab.Screen name="Browse" component={Home} />
//           <Tab.Screen name="Favourites" component={Home} />
//         </Tab.Navigator>
//         {audioElement}
//       </Fragment>
//     );
//   }
// }

class Router extends React.Component {
  render() {
    const {isAuthenticated, theme} = this.props;
    return isAuthenticated ? <AppStack /> : <AuthStack />;
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};
export default connect(
  mapStateToProps,
  null,
)(Router);
