import {DARK, LIGHT} from '../theme';
import React, {createContext, useState, useContext} from 'react';
import {AsyncStorage} from 'react-native';

export const ThemeContext = createContext({
  themeMode: 'light',
  themes: {light: LIGHT, dark: DARK},
  toggleTheme: () => {},
});

export class ThemeProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      themeMode: 'light',
      toggleTheme: this.toggleTheme,
    };
  }
  async componentDidMount() {
    this.setState({
      themeMode:
        (await AsyncStorage.getItem('darkmode')) === 'true' ? 'dark' : 'light',
      toggleTheme: this.toggleTheme,
    });
  }

  toggleTheme = async () => {
    const isDarkMode = await AsyncStorage.getItem('darkmode');

    this.setState({
      themeMode: isDarkMode === 'true' ? 'light' : 'dark',
    });

    isDarkMode === 'true'
      ? await AsyncStorage.setItem('darkmode', 'false')
      : await AsyncStorage.setItem('darkmode', 'true');
  };

  render() {
    const {themeMode} = this.state;
    return (
      <ThemeContext.Provider
        value={{
          themeMode,
          themes: {light: LIGHT, dark: DARK},
          toggleTheme: this.toggleTheme,
        }}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

export const useTheme = stylesheetBuilder => {
  const {themeMode, themes, toggleTheme} = useContext(ThemeContext);
  const theme = themes[themeMode];
  const styles = stylesheetBuilder(theme, themeMode);
  return {styles, themeMode, theme, toggleTheme};
};

export const withTheme = stylesheetBuilder => {
  return function(Component) {
    const WithTheme = props => {
      const {styles, themeMode, theme, toggleTheme} = useTheme(
        stylesheetBuilder,
      );
      return (
        <Component
          styles={styles}
          theme={theme}
          themeMode={themeMode}
          toggleTheme={toggleTheme}
          {...props}
        />
      );
    };
    WithTheme.displayName = `withTheme(${getDisplayName(Component)})`;
    return WithTheme;
  };
};

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}
