import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';

import nuSymbol from '../../assets/nu_symbol_offwhite.png';

import S from './styles';

import { white, } from '../../styles/colors';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    getIconByKey,
    iconRegularKeyboard,
} from '../../utils/typeIcons';

import LottieView from 'lottie-react-native';



export default class Assistant extends React.Component {
    componentDidMount() {
        this.animationRipple.play();
        this.animationMic.play();
        // Or set a specific startFrame and endFrame with:
        // this.animation.play(30, 120);
    }

    _getIcon({ iconKey }) {
        return (
            <FontAwesomeIcon icon={getIconByKey(iconKey)} size={24} color={white} />
        );
    };

    _getRippleAnim() {
        return (
            <TouchableOpacity style={S.buttonMic}>
                <LottieView
                    ref={animationRipple => {
                        this.animationRipple = animationRipple;
                    }}
                    style={S.animationRipple}
                    source={require('../../assets/anim/ripple.json')}
                />
            </TouchableOpacity>
        );
    };

    _getMicAnim() {
        return (
            <TouchableOpacity style={S.buttonMic}>
                <LottieView
                    ref={animationMic => {
                        this.animationMic = animationMic;
                    }}
                    style={S.animationMic}
                    source={require('../../assets/anim/mic.json')}
                />
            </TouchableOpacity>
        );
    };

    render() {
        return (
            <View style={S.container}>
                <View style={S.hearder}>
                    <Image style={S.nuSymbol} source={nuSymbol} />
                    <Text style={S.textUserName}>Felipe</Text>
                </View>

                <View style={S.content}>
                    <ScrollView style={S.messagesArea}>
                        <Text>
                            Bom dia!
                    </Text>
                        <Text>
                            Como posso te ajudar?
                    </Text>
                    </ScrollView>
                </View>

                <View style={S.actionArea}>
                    <View style={S.buttonMicArea}>
                        {this._getRippleAnim()}
                        {this._getMicAnim()}
                    </View>
                </View>

                <TouchableOpacity style={S.buttonKeyboard}>
                    {this._getIcon({ iconKey: iconRegularKeyboard })}
                </TouchableOpacity>
            </View>
        )
    }
}