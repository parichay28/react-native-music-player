import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Linking,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import {WebView} from 'react-native-webview';

import {getToken} from '../store/actions/authActions';

import {CONFIG} from '../config';

import {getHashParams} from '../helpers';

import store from '../store';

const ScreenHeight = Dimensions.get('window').height / 100;
const ScreenWidth = Dimensions.get('window').width / 100;

const route = `https://accounts.spotify.com/authorize?client_id=${
  CONFIG.CLIENT_ID
}&redirect_uri=${encodeURIComponent(
  CONFIG.REDIRECT_URL,
)}&scope=${encodeURIComponent(CONFIG.SCOPES.join(' '))}&response_type=token`;

export class Login extends Component {
  state = {
    showLoginPage: false,
  };

  handleLoginButton = () => {
    this.setState({showLoginPage: true});
  };

  handleWebViewStateChange = newState => {
    // console.log('webview state', newState);
    const url = getHashParams(newState.url);
    if (url) {
      this.setState({showLoginPage: false});
      store.dispatch(getToken(url));
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="black" />

        {this.state.showLoginPage ? (
          <WebView
            source={{uri: route}}
            style={styles.webview}
            renderLoading={() => <ActivityIndicator />}
            onNavigationStateChange={this.handleWebViewStateChange}
            // onError={syntheticEvent => {
            //   const {nativeEvent} = syntheticEvent;
            // }}
          />
        ) : (
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              this.handleLoginButton();
            }}>
            <Text style={styles.btnText}> Login </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webview: {
    flex: 1,
    height: ScreenHeight * 100,
    width: ScreenWidth * 100,
  },
  buttonContainer: {
    borderRadius: 10,
    backgroundColor: '#1DB954',
    paddingVertical: ScreenWidth * 2.4,
    paddingHorizontal: ScreenWidth * 20,
    // borderWidth: 1,
    borderColor: 'grey',
  },
  btnText: {
    color: 'white',
  },
});
// const mapStateToProps = state => {
//   return {isAuthenticated: state.auth.isAuthenticated};
// };
export default Login;
