import React, { useState, useRef, useEffect, } from 'react';
import { View, Text, ScrollView, } from 'react-native';

import LottieView from 'lottie-react-native';

import S from './styles';

import { iconGray, } from '../../styles/colors';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    getIconByKey,
    iconRegularUserCircle,
    iconDollarSign,
} from '../../utils/typeIcons';

import { getValueFormatted, } from '../../utils/formatCurrency';

const CARD_TRANSFER_MONEY = 'cardRealizarTransferencia';

const ChatShowMessages = ({ messages = [], showLoadingDotsUser = false, showLoadingDotsBot = false, }) => {
    const animationDotsLoadingBot = useRef(null);
    const animationDotsLoadingUser = useRef(null);

    const [scrollViewRef, setScrollViewRef] = useState(null);

    const isLastMessage = (length, index) => {
        if (length - 1 != index) {
            return { opacity: 0.5 }
        }
        return { opacity: 1 }
    }

    const getIcon = ({ iconKey }) => {
        return (
            <FontAwesomeIcon icon={getIconByKey(iconKey)} size={24} color={iconGray} />
        );
    };

    const getDotsLoadingBot = () => {
        // Animation by Daniel Tremontini Santiago https://lottiefiles.com/593-dot-preloader
        return (
            <LottieView
                    ref={animationDotsLoadingBot}
                    style={S.animationDots}
                    source={require('../../assets/anim/dots.json')}
                    autoPlay={true}
                />
        );
    };

    const getDotsLoadingUser = () => {
        return (
            <LottieView
                    ref={animationDotsLoadingUser}
                    style={S.animationDotsUser}
                    source={require('../../assets/anim/dots.json')}
                    autoPlay={true}
                />
        );
    };

    const getCardTrasnferMoney = (it, index) => {
        const messageConfirmation = 'Tudo certo?'; // TODO get from response API
        const contact = 'Maria Silva';
        const numberAg = '0001';
        const numberCt = '123654-7';
        const amountMoney = 200; 

        return (
            <View key={`${index}`}>
                <View style={S.cardTrasnferMoney}>
                    <View style={S.cardTrasnferMoneyLine}>
                        {getIcon({ iconKey: iconRegularUserCircle })}
                        <View style={S.cardTrasnferMoneyContact}>
                            <Text style={S.cardTrasnferMoneyContactName}>{contact}</Text>
                        </View>
                    </View>
                    <View style={S.cardTrasnferMoneyLine}>
                        <View style={S.cardTrasnferMoneyContactAreaInfo}>
                            <Text style={S.cardTrasnferMoneyContactInfo}>Agência {numberAg}</Text>
                            <Text style={S.cardTrasnferMoneyContactInfo}>Conta {numberCt}</Text>
                        </View>
                    </View>
                    <View style={S.cardTrasnferMoneyLine}>
                        {getIcon({ iconKey: iconDollarSign })}
                        <Text style={S.cardTrasnferMoneyAmount}>{getValueFormatted(amountMoney)}</Text>
                    </View>
                </View>
                <Text style={S.messageText}>{messageConfirmation}</Text>
            </View>
        )
    }

    const renderItem = (it, index) => {

        if (it.isAppAction) {
            let toShow;

            switch (it.appAction.showToUser) {
                case CARD_TRANSFER_MONEY:
                    toShow = getCardTrasnferMoney(it, index)
                    
                default:
                    console.log("nothing to show")
                    break;
            }

            return toShow
        }

        return (
            <View key={`${index}`} style={
                it.fromUser
                    ? { ...S.messageUser, ...isLastMessage(messages.length, index) }
                    : { ...S.messageBot, ...isLastMessage(messages.length, index) }
            }>
                {
                    it.texts.map((text, index) => (
                        <Text key={`text${index}`} style={S.messageText}>
                            {text}
                        </Text>
                    ))
                }
            </View>
        )
    }


    return (
        <ScrollView
            ref={(ref) => setScrollViewRef(ref)}
            style={S.messagesArea}
            onContentSizeChange={() => scrollViewRef.scrollToEnd({ animated: true })}
        >
            {
                messages.length === 1 &&
                <View key="welcome" style={S.messageFirst}>
                    {
                        messages.map(it => (
                            it.texts.map((text, index) => (
                                <Text key={`text${index}`} style={(index === (it.texts.length - 1)) ? S.messageTextImportant : S.messageText}>
                                    {text}
                                </Text>
                            ))
                        ))
                    }
                </View>
            }
            {
                messages.length > 1 &&
                messages.map((it, index) => renderItem(it, index))
            }

            {
                showLoadingDotsUser &&
                <View key="dotsUser" style={S.messageUser}>
                    {getDotsLoadingUser()}
                </View>
            }

            {
                showLoadingDotsBot &&
                <View key="dots" style={S.messageBot}>
                    {getDotsLoadingBot()}
                </View>
            }
        </ScrollView>
    )
}

export default ChatShowMessages;