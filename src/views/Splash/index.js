import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';

import S from './styles';

import nuSymbol from '../../assets/nu_symbol_offwhite.png';

export default function Splash({ navigation }) {
    // TODO logic
    return (
        <View style={S.container}>
            <View style={S.content}>
                <Image source={nuSymbol} style={S.nuSymbol} />
                <Text style={S.text}>Felipe</Text>
            </View>
        </View>
    )
}