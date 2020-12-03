import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useTheme, withTheme} from '../theme/ThemeProvider';

const ScreenHeight = Dimensions.get('window').height / 100;
const ScreenWidth = Dimensions.get('window').width / 100;

// icons
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

function TabBar({state, descriptors, navigation}) {
  const {styles, theme} = useTheme(stylesheet);
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        let iconName;
        let iconSize = ScreenWidth * 6.5;

        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Browse') {
          iconName = 'search';
        } else if (route.name === 'Favourites') {
          iconName = 'favorite';
        }
        let labelColor;

        return (
          <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabContainer}
            key={index}>
            <MaterialIcon
              name={iconName}
              size={iconSize}
              color={isFocused ? theme.TAB_ACTIVE : theme.TAB_INACTIVE}
            />
            <Text
              style={[
                styles.labelName,
                {
                  color: isFocused ? theme.TAB_ACTIVE : theme.TAB_INACTIVE,
                },
              ]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const stylesheet = (theme, themeMode) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingTop: ScreenHeight * 0.6,
      borderTopWidth: StyleSheet.hairlineWidth,
      backgroundColor: themeMode === 'dark' ? theme.BG_PRIMARY : '#fafafa',
      borderTopColor: theme.SEPARATOR,
      // borderWidth: 1,
    },
    tabContainer: {
      flex: 1,
      // borderWidth: 1,
      alignItems: 'center',
    },
    labelName: {
      fontFamily: 'Roboto-Medium',
      fontSize: ScreenWidth * 3,
    },
  });

export default TabBar;
