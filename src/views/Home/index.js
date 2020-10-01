import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';

import nuSymbol from '../../assets/nu_symbol_offwhite.png';

import S from './styles';

export default function Home({ navigation }) {
    // TODO logic
    return (
        <View style={S.container}>
            <View style={S.hearder}>
                <Image style={S.nuSymbol} source={nuSymbol} />
                <Text style={S.textUserName}>Felipe</Text>
            </View>
            <View style={S.content}>
                <Text style={S.text}>Open up App.js to start working on your app!</Text>
            </View>
            <ScrollView style={S.buttonsList} horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={S.buttonCardFirst}></View>
                <View style={S.buttonCard}></View>
                <View style={S.buttonCard}></View>
                <View style={S.buttonCard}></View>
                <View style={S.buttonCard}></View>
                <View style={S.buttonCard}></View>
                <View style={S.buttonCard}></View>
                <View style={S.buttonCard}></View>
                <View style={S.buttonCard}></View>
            </ScrollView>
        </View>
    )
}