import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, } from 'react-native';

import S from './styles';

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

const Carousel = ({ items = [], itemsPerInterval = 1, typeItem = '', }) => {

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

    useEffect(() => {
        init(width)
        // setInterval(1)
        // TODO render again ScrollView or set position to first item
    }, [items])

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
                        switch (typeItem) {
                            case '//TODO other':
                                return (
                                    <View
                                        key={index}
                                        index={index}
                                        label={item.label}
                                        value={item.value}
                                    >
                                        {index} {item.label} {item.value}
                                    </View>
                                );

                            default:
                                return (
                                    <View style={S.card} key={index}>
                                        {item}
                                    </View>
                                )
                        }
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