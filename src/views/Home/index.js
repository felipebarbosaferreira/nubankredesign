import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';

import nuSymbol from '../../assets/nu_symbol_offwhite.png';

import S from './styles';

import Carousel from '../../components/Carousel';



export default function Home({ navigation }) {
    // TODO logic
    const data = [
        {
            label: "Limite",
            value: "Av",
        },
        {
            label: "Fatura",
            value: "Bv",
        },
        {
            label: "Promo",
            value: "Cv",
        },
    ]
    return (
        <View style={S.container}>
            <View style={S.hearder}>
                <Image style={S.nuSymbol} source={nuSymbol} />
                <Text style={S.textUserName}>Felipe</Text>
            </View>
            <View style={S.content}>
                <Carousel items={data}/>
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