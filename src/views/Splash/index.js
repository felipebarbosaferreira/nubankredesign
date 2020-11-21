import React, { useRef, } from 'react';
import { View, Animated, } from 'react-native';

import S from './styles';

import nuSymbol from '../../assets/nu_symbol_offwhite.png';

function getAnimationConfig(toValue) {
    return {
        toValue: toValue,
        duration: 3500,
        useNativeDriver: true,
    }
}

export default function Splash({ navigation }) {
    const textTransX = useRef(new Animated.Value(0)).current;
    const imageTransX = useRef(new Animated.Value(0)).current;
    const imageScale = useRef(new Animated.Value(1)).current;

    const moveX = 40;
    const sizeMinus = 0.85;

    const gotToHome = () => navigation.navigate('Home');

    Animated.timing(textTransX, getAnimationConfig(moveX)).start();
    Animated.timing(imageTransX, getAnimationConfig(-moveX)).start();
    Animated.timing(imageScale, getAnimationConfig(sizeMinus))
        .start(() => {
            setTimeout(() => { gotToHome() }, 800)
        });

    const userName = 'Felipe';

    return (
        <View style={S.container}>
            <View style={S.content}>
                <Animated.Text style={[S.text, { translateX: textTransX, }]}>
                    {userName}
                </Animated.Text>
                <Animated.Image
                    source={nuSymbol}
                    style={[S.nuSymbol, {
                        translateX: imageTransX,
                        scaleY: imageScale,
                        scaleX: imageScale,
                    }]}
                />
            </View>
        </View>
    )
}