import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  createStackNavigator,
} from 'react-navigation';
import MainScreen from './components/MainScreen';
import LoginScreen from './components/LoginScreen';

import { purple, white } from './utils/colors'


const RootStack = createStackNavigator(
  {
    Home: LoginScreen,
    Profile: MainScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}



