import React, { useState, useRef, } from 'react';
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

    const getCardTrasnferMoney = (item, index) => {
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

    const renderItemFirstPosition = (item) => {
        return (
            <View key="welcome" style={S.messageFirst}>
                {
                    item.texts.map((text, index) => (
                        <Text key={`text${index}`} style={(index === (item.texts.length - 1)) ? S.messageTextImportant : S.messageText}>
                            {text}
                        </Text>
                    ))
                }
            </View>
        )
    }

    const renderItemOtherPositions = (item, index) => {
        const styleMessageFrom = item.fromUser ? S.messageUser : S.messageBot;

        const styleItem = {
            ...styleMessageFrom,
            ...isLastMessage(messages.length, index),
        }

        return (
            <View key={`${index}`} style={styleItem}>
                {
                    item.texts.map((text, index) => (
                        <Text key={`text${index}`} style={S.messageText}>
                            {text}
                        </Text>
                    ))
                }
            </View>
        )
    }

    const renderItem = (item, index) => {

        if (item.isAppAction) {
            let toShow;

            switch (item.appAction.showToUser) {
                case CARD_TRANSFER_MONEY:
                    toShow = getCardTrasnferMoney(item, index)

                default:
                    // console.log("nothing to show")
                    break;
            }

            return toShow
        }

        if (index === 0) {
            return renderItemFirstPosition(item)
        }

        return renderItemOtherPositions(item, index);
    }


    return (
        <ScrollView
            ref={(ref) => setScrollViewRef(ref)}
            style={S.messagesArea}
            onContentSizeChange={() => scrollViewRef.scrollToEnd({ animated: true })}
        >
            {
                messages.length > 0 &&
                messages.map((item, index) => renderItem(item, index))
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