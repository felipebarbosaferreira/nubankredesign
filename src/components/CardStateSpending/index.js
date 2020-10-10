import React from 'react';
import { View, Text, } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { lightGray, } from '../../styles/colors';

import S from './styles';

import { getIconByKey, iconCreditCard, } from '../../utils/typeIcons';
import { getValueFormatted, } from '../../utils/formatCurrency';


const CardStateSpending = ({ invoiceAmount = 0, availableLimitValue = 0, barStatus = {}, styleCard = {} }) => {
    const { next, current, available } = barStatus;

    return (
        <View style={S.container}>
            <View style={S.content}>
                <View style={S.labelArea}>
                    <FontAwesomeIcon icon={getIconByKey(iconCreditCard)} size={24} color={lightGray} />
                    <Text style={S.labelText}>Cartão de Crédito</Text>
                </View>

                <View style={S.informationArea}>
                    <Text style={S.informationLabel}>Fatura atual</Text>
                    <Text style={S.informationTextPrimary}>{getValueFormatted(invoiceAmount)}</Text>
                </View>

                <View>
                    <Text style={S.informationTextSecondary}>Limite disponível</Text>
                    <Text style={S.informationValueLimit}>{getValueFormatted(availableLimitValue)}</Text>
                </View>
            </View>
            <View style={S.barStatus}>
                <View style={{ ...S.barStatusNext, flexGrow: next || 0 }}></View>
                <View style={{ ...S.barStatusCurrent, flexGrow: current || 0 }}></View>
                <View style={{ ...S.barStatusAvailable, flexGrow: available || 0 }}></View>
            </View>
        </View>
    )
}

export default CardStateSpending;