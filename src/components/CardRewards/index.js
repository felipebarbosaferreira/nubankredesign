import React from 'react';
import { View, Text, TouchableOpacity, } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { lightGray, } from '../../styles/colors';

import S from './styles';

import { getIconByKey, iconGift, } from '../../utils/typeIcons';


const CardRewards = ({ rewardsEnable = false, }) => {

    return (
        <View style={S.container}>
            <View style={S.content}>
                <View style={S.labelArea}>
                    <FontAwesomeIcon icon={getIconByKey(iconGift)} size={24} color={lightGray} />
                </View>

                <View style={S.informationArea}>
                    <Text style={S.informationTextPrimary}>Nubank Rewards</Text>
                    <Text style={S.informationTextSecondary}>Acumule pontos que nunca expiram e troque por passagens aéreas ou serviços que você realmente usa.</Text>
                </View>

                <TouchableOpacity style={S.enableRewards}>
                    <Text style={S.textEnableRewards}>ATIVE O SEU REWARDS</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CardRewards;