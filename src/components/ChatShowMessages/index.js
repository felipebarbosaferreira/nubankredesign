import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, } from 'react-native';

import S from './styles';

const ChatShowMessages = ({ messages = [], }) => {
    const [scrollViewRef, setScrollViewRef] = useState(null);

    const isLastMessage = (length, index) => {
        if (length - 1 != index) {
            return {opacity: 0.5}
        }
        return {opacity: 1}
    }

    return (
        <ScrollView 
            ref={(ref) => setScrollViewRef(ref)}
            style={S.messagesArea} 
            onContentSizeChange={() => scrollViewRef.scrollToEnd({animated: true})}
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
                messages.map((it, index) => (
    
                    <View key={`${index}`} style={
                        it.fromUser 
                        ? {...S.messageUser, ...isLastMessage(messages.length, index) } 
                        : {...S.messageBot, ...isLastMessage(messages.length, index) }
                        }>
                        {
                            it.texts.map((text, index) => (
                                <Text key={`text${index}`} style={S.messageText}>
                                    {text}
                                </Text>
                            ))
                        }
                    </View>
    
                ))
            }
        </ScrollView> 
    )
}

export default ChatShowMessages;