import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';

import nuSymbol from '../../assets/nu_symbol_offwhite.png';

import S from './styles';

import Carousel from '../../components/Carousel';

import CardStateSpending from '../../components/CardStateSpending';



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

    const cards = [
        CardStateSpending(dataStateSpending),
        CardStateSpending(dataStateSpending),
        CardStateSpending(dataStateSpending),
    ]
    
    return (
        <View style={S.container}>
            <View style={S.hearder}>
                <Image style={S.nuSymbol} source={nuSymbol} />
                <Text style={S.textUserName}>Felipe</Text>
            </View>
            <View style={S.content}>
                <Carousel items={cards}/>
            </View>
            <ScrollView 
                style={S.buttonsList} 
                horizontal={true} 
                showsHorizontalScrollIndicator={false} >
                <View style={S.buttonCardFirst}></View>
                <View style={S.buttonCard}></View>
                <View style={S.buttonCard}></View>
                <View style={S.buttonCard}></View>
                <View style={S.buttonCard}></View>
                <View style={S.buttonCard}></View>
                <View style={S.buttonCard}></View>
                <View style={S.buttonCard}></View>
                <View style={S.buttonCard}></View>
            </ScrollView>
        </View>
    )
}