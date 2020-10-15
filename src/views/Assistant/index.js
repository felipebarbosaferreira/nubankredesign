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



export default function Assistant({ navigation }) {

    const getIcon = iconKey => <FontAwesomeIcon icon={getIconByKey(iconKey)} size={24} color={white} />;

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
                    <TouchableOpacity style={S.buttonMic}>
                        <Text>mic</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={S.buttonKeyboard}>
                    {getIcon(iconRegularKeyboard)}
                </TouchableOpacity>
            </View>
        </View>
    )
}