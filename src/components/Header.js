import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {useTheme, withTheme} from '../theme/ThemeProvider';

const ScreenWidth = Dimensions.get('window').width / 100;

const Header = props => {
  const {title, theme, style} = props;
  const {styles: themedStyles} = useTheme(stylesheet);
  return (
    <View>
      <Text style={[themedStyles.titleText, style]}>{title}</Text>
    </View>
  );
};

const stylesheet = theme =>
  StyleSheet.create({
    titleText: {
      fontFamily: 'Roboto-Bold',
      fontSize: ScreenWidth * 5,
      color: theme.TEXT_SECONDARY,
      marginBottom: ScreenWidth * 3,
    },
  });

export default Header;
