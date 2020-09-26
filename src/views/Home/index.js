import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';

import S from './styles';

export default function Home({ navigation }) {
    // TODO logic
    return (
        <View style={S.container}>
            <View style={S.content}>
                <Text>Open up App.js to start working on your app!</Text>
                <StatusBar style="auto" />
            </View>
        </View>
    )
}