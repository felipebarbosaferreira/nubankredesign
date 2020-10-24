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
        // this.animationMic.play();
        // Or set a specific startFrame and endFrame with:
        // this.animation.play(30, 120);
    }

    _getIcon({ iconKey }) {
        return (
            <FontAwesomeIcon icon={getIconByKey(iconKey)} size={24} color={white} />
        );
    };

    _setAnimDataReceived() {
        this.animationMic.play(181, 192); // return mic effect
        setTimeout(() => { 
            this.animationMic.play(193, 194);
            this.animationMic.reset();

            this.animationRipple.play();
        }, 450);
    }

    _setAnimDataLoad() {
        this.animationMic.play(160, 172); // enter load effect
        setTimeout(() => { this.animationMic.play(172, 180) }, 450); // load spinning effect

        setTimeout(() => { this._setAnimDataReceived() }, 5000)
    }

    _setAnimRecognizingVoice() {
        this.animationRipple.reset(); // stop ripple

        this.animationMic.play(115, 127); // hide mic effect
        setTimeout(() => { this.animationMic.play(38, 72) }, 450); // recognizing effect

        setTimeout(() => { this._setAnimDataLoad() }, 5000);
    }


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
        // Animation by Hicy Wonder https://lottiefiles.com/643-aispeech-mic
        return (
            <TouchableOpacity style={S.buttonMic} onPress={() => this._setAnimRecognizingVoice()}>
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