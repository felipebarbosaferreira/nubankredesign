import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Splash from './src/views/Splash';
import Home from './src/views/Home';
import Assistant from './src/views/Assistant';

const Routes = createAppContainer(
  createSwitchNavigator({
    Splash,
    Home,
    Assistant,
  })
);

export default function App() {
  return (
    <SafeAreaView style={S.safeAreaView}>
      <Routes />
    </SafeAreaView>
  );
}

const S = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
});
