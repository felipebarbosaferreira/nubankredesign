import React, { useState, } from 'react';
import { View, Text, ScrollView, } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'; 

import S from './styles';

import { getIconByKey, iconCreditCard } from '../../utils/typeIcons';


/**
 * Carousel base https://medium.com/@rossbulat/react-native-carousels-with-horizontal-scroll-views-60b0587a670c
 *  
 */

const getInterval = (offset, intervals, width) => {
    for (let i = 1; i <= intervals; i++) {
        if (offset < (width / intervals) * i) {
            return i;
        }
        if (i == intervals) {
            return i;
        }
    }
}

const getBullets = (totalIntervals, interval) => {
    const bullets = [];
    for (let i = 1; i <= totalIntervals; i++) {
        bullets.push(
            <Text
                key={i}
                style={{
                    ...S.bullet,
                    opacity: interval === i ? 0.8 : 0.2
                }}
            />
        );
    }
    return bullets;
}

const Carousel = ({ items = [], itemsPerInterval = 1, style = {}, }) => {

    const [intervals, setIntervals] = useState(1);
    const [interval, setInterval] = useState(1);
    const [width, setWidth] = useState(0);

    const init = (width) => {
        // initialise width
        setWidth(width);
        // initialise total intervals
        const totalItems = items.length;
        setIntervals(Math.ceil(totalItems / itemsPerInterval));
    }

    const bullets = getBullets(intervals, interval);

    return (
        <View style={S.carousel}>
            <ScrollView
                horizontal={true}
                contentContainerStyle={{ ...S.scrollView, width: `${100 * intervals}%` }}
                showsHorizontalScrollIndicator={false}
                onContentSizeChange={(w, h) => init(w)}
                scrollEventThrottle={200}
                pagingEnabled
                decelerationRate="fast"
                onScroll={data => {
                    setInterval(getInterval(data.nativeEvent.contentOffset.x, intervals, width));
                }}
            >
                {
                    items.map((item, index) => {
                        return (
                            // <View style={S.card} key={index}>
                            //     <Text style={S.text}>{item.label}</Text>
                            // </View>
                            <View style={S.card} key={index} >
                                <View style={S.container}>
                                    <View style={S.content}>
                                        <View style={S.labelArea}>
                                            <FontAwesomeIcon icon={ getIconByKey(22) } size={24} color='#B5B5B5' />
                                            <Text style={S.labelText}>Cartão de Crédito</Text>
                                        </View>

                                        <View style={S.informationArea}>
                                            <Text style={S.informationLabel}>Fatura atual</Text>
                                            <Text style={S.informationTextPrimary}>R$ 339,04</Text>
                                        </View>

                                        <View>
                                            <Text style={S.informationTextSecondary}>Limite disponível</Text>
                                            <Text style={S.informationValueLimit}>R$ 1.543,96</Text>
                                        </View>
                                    </View>
                                    <View style={S.barStatus}>
                                        <View style={{...S.barStatusNext, flexGrow: 3}}></View>
                                        <View style={{...S.barStatusCurrent, flexGrow: 2}}></View>
                                        <View style={{...S.barStatusAvailable, flexGrow: 5}}></View>
                                    </View>
                                </View>
                            </View>
                        );
                    })
                }
            </ScrollView>
            <View style={S.bulletsArea}>
                {bullets}
            </View>
        </View>
    )
}

export default Carousel;