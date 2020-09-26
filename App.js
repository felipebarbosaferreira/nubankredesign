import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Home from './src/views/Home';

const Routes = createAppContainer(
  createSwitchNavigator({
    Home,
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
