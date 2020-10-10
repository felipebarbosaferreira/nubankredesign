import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';

import { LineChart, } from 'expo-chart-kit';

import S from './styles';
import { lightGray, white, } from '../../styles/colors';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { getIconByKey, iconMoneySavings, iconEye, iconEyeSlash } from '../../utils/typeIcons';
import { getValueFormatted, getValueFormattedHideNumbers, } from '../../utils/formatCurrency';

// TODO think make component lineChart
const getChartNuAccountMovement = (dataChart) => {
    return (
        <LineChart
            bezier
            showVerticalLabel={true}
            showHorizontalLabel={false}
            showVerticalLine={false}
            showHorizontalLine={false}
            withVerticalLabels={false}
            withShadow={false}
            fromZero={true}
            data={{
                labels: dataChart.labels,
                datasets: [{
                    data: dataChart.data
                }]
            }}
            width={Dimensions.get('window').width - 60} // Dimensions from react-native
            height={170}
            chartConfig={{
                decimalPlaces: 0, // optional, defaults to 2dp
                backgroundColor: white,
                backgroundGradientFrom: white,
                backgroundGradientTo: white,
                color: (opacity = 1) => `rgba(55, 8, 72, ${opacity})`,
                style: {},
            }}
            style={{
                left: -20,
                flex: 1,
            }}
        />
    );
}


const CardNuAccountState = ({ nuAccountAmount = 0, dataChart = 0, }) => {

    const [showValue, setShowValue] = useState(true);
    const [accountAmount, setAccountAmount] = useState(getValueFormatted(nuAccountAmount));

    const chart = getChartNuAccountMovement(dataChart);

    useEffect(() => {
        if (showValue) {
            setAccountAmount(getValueFormatted(nuAccountAmount))
        } else {
            setAccountAmount(getValueFormattedHideNumbers(nuAccountAmount))
        }
    }, [showValue])

    return (
        <View style={S.container}>
            <View style={S.content}>
                <View style={S.labelArea}>
                    <FontAwesomeIcon icon={getIconByKey(iconMoneySavings)} size={24} color={lightGray} />
                    <Text style={S.labelText}>Dinheiro guardado</Text>

                    <TouchableOpacity onPress={() => setShowValue(!showValue)}>
                        <FontAwesomeIcon icon={getIconByKey(showValue ? iconEye : iconEyeSlash)} size={24} color={lightGray} />
                    </TouchableOpacity>
                </View>

                <View style={S.informationArea}>
                    <Text style={S.informationTextPrimary}>{accountAmount}</Text>
                </View>

                <View style={S.chartArea}>
                    {chart}
                </View>
            </View>
        </View>
    )
}

export default CardNuAccountState;