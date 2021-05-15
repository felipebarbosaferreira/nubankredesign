import React, { useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import DraggableFlatList from "react-native-draggable-flatlist";

import nuSymbol from '../../assets/nu_symbol_offwhite.png';

import S from './styles';

import { white, cardPurple, darkPurple } from '../../styles/colors';

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
    iconMobile,
} from '../../utils/typeIcons';

import Carousel from '../../components/Carousel';

import CardStateSpending from '../../components/CardStateSpending';
import CardNuAccountState from '../../components/CardNuAccountState';
import CardRewards from '../../components/CardRewards';

const toDoSomething = () => { return; };

export default function Home({ navigation }) {

    const navigationToChat = () => navigation.navigate('Assistant');

    const buttonsMock = [
        {
            id: "assistenteVirtual",
            label: "Assistente Virtual",
            icon: iconRegularChat,
            onPress: navigationToChat,
        },
        {
            id: "conta",
            label: "Conta",
            icon: iconCoins,
            onPress: toDoSomething,
        },
        {
            id: "rewards",
            label: "Rewards",
            icon: iconGift,
            onPress: toDoSomething,
        },
        {
            id: "recarga",
            label: "Recarga",
            icon: iconMobile,
            onPress: toDoSomething,
        },
        {
            id: "cartaoVirtual",
            label: "Cartão Virtual",
            icon: iconRegularCreditCard,
            onPress: toDoSomething,
        },
        {
            id: "doar",
            label: "Doar",
            icon: iconDonate,
            onPress: toDoSomething,
        },
        {
            id: "felipe",
            label: "Felipe",
            icon: iconGamepad,
            onPress: toDoSomething,
        },
        {
            id: "plus",
            label: "...",
            icon: iconPlus,
            onPress: toDoSomething,
        },
    ];

    const [buttons, setButtons] = useState(buttonsMock);

    const renderItem = useCallback(
        ({ item, index, drag, isActive }) => {
            return (
                <TouchableOpacity
                    key={item.id}
                    style={[
                        S.buttonCard, 
                        {
                            transform: isActive ? [{ rotate: "15deg" }] : [{ rotate: "0deg" }],
                            backgroundColor: isActive ? darkPurple : cardPurple,
                        },
                    ]}
                    onLongPress={drag}
                    onPress={item.onPress} >
                    {getIcon(item.icon)}
                    <Text style={S.textButtonList}>
                        {item.label}
                    </Text>
                </TouchableOpacity>
            );
        },
        []
    );
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
        nuAccountAmount: 821.3,
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
    const dataRewards = {}

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

            <View style={S.buttonsList}>
                <DraggableFlatList
                    horizontal
                    data={buttons}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `draggable-item-${item.id}`}
                    onDragEnd={({ data }) => setButtons(data)}
                />
            </View>
        </View>
    )
}