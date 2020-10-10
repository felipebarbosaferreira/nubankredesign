import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';

import nuSymbol from '../../assets/nu_symbol_offwhite.png';

import S from './styles';

import { white, } from '../../styles/colors';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    getIconByKey,
    iconRegularChat,
    iconRegularCreditCard,
    iconGift,
    iconCoins,
    iconDonate,
    iconGamepad,
    iconPlus,
} from '../../utils/typeIcons';

import Carousel from '../../components/Carousel';

import CardStateSpending from '../../components/CardStateSpending';
import CardNuAccountState from '../../components/CardNuAccountState';
import CardRewards from '../../components/CardRewards';


export default function Home({ navigation }) {
    // TODO logic get data
    const dataStateSpending = {
        invoiceAmount: 339.4,
        availableLimitValue: 1534,
        barStatus: {
            next: 2,
            current: 4,
            available: 4,
        },
    }
    const dataNuAccountState = {
        nuAccountAmount: 339.4,
        dataChart: {
            labels: [
                'Mai',
                'Jun',
                'Jul',
                'Ago',
                'Set',
                'Out'
            ],
            data: [
                100,
                160,
                85,
                190,
                130,
                180,
            ]
        },
    }
    const dataRewards = {

    }

    const cards = [
        CardStateSpending(dataStateSpending),
        CardNuAccountState(dataNuAccountState),
        CardRewards(dataRewards),
    ]

    const getIcon = iconKey => <FontAwesomeIcon icon={getIconByKey(iconKey)} size={24} color={white} />;

    return (
        <View style={S.container}>
            <View style={S.hearder}>
                <Image style={S.nuSymbol} source={nuSymbol} />
                <Text style={S.textUserName}>Felipe</Text>
            </View>

            <View style={S.content}>
                <Carousel items={cards} />
            </View>

            <ScrollView
                style={S.buttonsList}
                horizontal={true}
                showsHorizontalScrollIndicator={false} >
                <TouchableOpacity style={S.buttonCardFirst}>
                    {getIcon(iconRegularChat)}
                    <Text style={S.textButtonList}>Chat</Text>
                </TouchableOpacity>

                <TouchableOpacity style={S.buttonCard}>
                    {getIcon(iconRegularCreditCard)}
                    <Text style={S.textButtonList}>Cartão Virtual</Text>
                </TouchableOpacity>

                <TouchableOpacity style={S.buttonCard}>
                    {getIcon(iconCoins)}
                    <Text style={S.textButtonList}>Conta</Text>
                </TouchableOpacity>

                <TouchableOpacity style={S.buttonCard}>
                    {getIcon(iconGift)}
                    <Text style={S.textButtonList}>Rewards</Text>
                </TouchableOpacity>

                <TouchableOpacity style={S.buttonCard}>
                    {getIcon(iconDonate)}
                    <Text style={S.textButtonList}>Doar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={S.buttonCard}>
                    {getIcon(iconGamepad)}
                    <Text style={S.textButtonList}>Felipe</Text>
                </TouchableOpacity>

                <TouchableOpacity style={S.buttonCard}>
                    {getIcon(iconPlus)}
                    <Text style={S.textButtonList}>.</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}