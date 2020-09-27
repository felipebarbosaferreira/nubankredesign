import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';

import S from './styles';

import nuSymbol from '../../assets/nu_symbol_offwhite.png';

const {
    Clock,
    Value,
    set,
    cond,
    startClock,
    clockRunning,
    timing,
    debug,
    stopClock,
    block,
} = Animated;

function runTiming(clock, value, dest) {
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0),
    };

    const config = {
        duration: 4000,
        toValue: new Value(0),
        easing: Easing.inOut(Easing.ease),
    };

    return block([
        cond(
            clockRunning(clock),
            [
                // if the clock is already running we update the toValue, in case a new dest has been passed in
                set(config.toValue, dest),
            ],
            [
                // if the clock isn't running we reset all the animation params and start the clock
                set(state.finished, 0),
                set(state.time, 0),
                set(state.position, value),
                set(state.frameTime, 0),
                set(config.toValue, dest),
                startClock(clock),
            ]
        ),
        // we run the step here that is going to update position
        timing(clock, state, config),
        // if the animation is over we stop the clock
        cond(state.finished, debug('stop clock', stopClock(clock))),
        // we made the block return the updated position
        state.position,
    ]);
}


export default function Splash({ navigation }) {
    // we create a clock node
    clockText = new Clock();
    clockImageX = new Clock();
    clockImageY = new Clock();
    // and use runTiming method defined above to create a node that is going to be mapped
    // to the translateX transform.
    const moveX = 40;
    textTransX = runTiming(this.clockText, 0, moveX);
    imageTransX = runTiming(this.clockImageX, 0, -moveX);
    imageTransScale = runTiming(this.clockImageY, 1, 0.85);

    const userName = 'Felipe';

    return (
        <View style={S.container}>
            <View style={S.content}>
                <Animated.Text style={[S.text, { transform: [{ translateX: this.textTransX }] }]}>
                    { userName }
                </Animated.Text>
                <Animated.Image
                    source={nuSymbol}
                    style={[S.nuSymbol, { 
                        transform: [
                            { 
                                translateX: this.imageTransX, 
                                scaleY: this.imageTransScale, 
                                scaleX: this.imageTransScale, }
                        ] 
                    }]}
                />
            </View>
        </View>
    )
}