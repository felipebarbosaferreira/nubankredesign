import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, } from 'react-native';

import nuSymbol from '../../assets/nu_symbol_offwhite.png';

import S from './styles';

import { white, } from '../../styles/colors';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    getIconByKey,
    iconRegularKeyboard,
} from '../../utils/typeIcons';

import LottieView from 'lottie-react-native';

import ChatShowMessages from '../../components/ChatShowMessages';

import assistant from '../../services/assistant';

export default function Assistant({ navigation }) {

    const [messages, setMessages] = useState([]);
    const [welcomeMessage, setWelcomeMessage] = useState(false);
    const [loadOnProgressMessageUser, setLoadOnProgressMessageUser] = useState(false);
    const [loadOnProgressMessageBot, setLoadOnProgressMessageBot] = useState(false);

    const animationMic = useRef(null);
    const animationRipple = useRef(null);

    const getIcon = ({ iconKey }) => {
        return (
            <FontAwesomeIcon icon={getIconByKey(iconKey)} size={24} color={white} />
        );
    };
    
    const setMicVisible = () => {
        animationMic.current.play(181, 192); // return mic effect
        animationMic.current.play(193, 194);
        animationMic.current.reset();
    }

    const isLoadingData = () => {
        animationRipple.current.reset() // stop ripple
    }

    const isLoadingDataFinished = () => {
        setMicVisible()
        animationRipple.current.play() // play ripple
    }

    const getMessages = () => {
        // console.log(messages)
        return messages
    }

    const setAnimDataReceived = () => {
        isLoadingDataFinished();
    }

    const finishMock = () => {
        setLoadOnProgressMessageBot(true)
        setTimeout(() => { 
            setMessages(
                [
                    ...getMessages(),
                    {
                        texts: [
                            "Qual o valor?",
                        ],
                    },
                    {
                        texts: [
                            "R$ 200",
                        ],
                    },
                    {
                        texts: [
                            "appAction",
                        ],
                        isAppAction: true,
                        appAction: {
                            action: "transferencia.realizar",
                            showToUser: "cardRealizarTransferencia",
                            fields: {
                                person: {
                                    structValue: {
                                        fields: {
                                            name: {
                                                stringValue: "maira",
                                                kind: "stringValue"
                                           }
                                       }
                                   },
                                    kind: "structValue"
                               },
                                currencyName: {
                                    stringValue: "BRL",
                                    kind: "stringValue"
                               },
                                transferir: {
                                    stringValue: "transferir",
                                    kind: "stringValue"
                               },
                                valor: {
                                    numberValue: 100,
                                    kind: "numberValue"
                               },
                                showToUser: {
                                    stringValue: "cardRealizarTransferencia",
                                    kind: "stringValue",
                               },
                           },
                       },
                    },
                ]
            )

        setLoadOnProgressMessageBot(false)
        setMicVisible()
        isLoadingDataFinished();
        }, 2000)
    }

    const setAnimDataLoad = () => {
        animationMic.current.play(160, 172); // enter load effect
        setTimeout(() => { animationMic.current.play(172, 180) }, 450); // load spinning effect
    }

    const setAnimRecognizingVoice = () => {
        isLoadingData();
        animationMic.current.play(115, 127); // hide mic effect
        setTimeout(() => { animationMic.current.play(38, 72) }, 450); // recognizing effect
    }

    async function sendMessage(message) {
        setAnimDataLoad()

        // TODO call api
        const response = await assistant.sendMessageText(message);
        setAnimDataReceived()
        // TODO reproduce audio
        // TODO return texts api
        
        // console.log('response.output.texts', response.output.texts);
        return response;
    }

    async function sendUserMessage() {
        setAnimRecognizingVoice()
        
        setLoadOnProgressMessageUser(true)

        // TODO get input voice user

        isLoadingData()
        const responseToUser = await sendMessage("Quero enviar dinheiro")

        const { textRecognized } = responseToUser.input
        const textsToUser = responseToUser.output

        // TODO reproduce audio from response assistant

        setLoadOnProgressMessageUser(false)
        const msg = [...messages, {
            fromUser: true,
            texts: [
                textRecognized,
            ],
        }];
        setMessages(msg)

        setLoadOnProgressMessageBot(true)
        setTimeout(() => { 
            
            setMessages([...msg, {
                fromUser: false,
                ...textsToUser,
            }])
            setLoadOnProgressMessageBot(false)
        }, 1500);

        isLoadingDataFinished()
    }

    async function getWelcomeMessage() {
        setWelcomeMessage(true)
        
        setLoadOnProgressMessageBot(true)

        isLoadingData()

        const welcomeMsg = await sendMessage("oi")

        setLoadOnProgressMessageBot(false)

        setMessages([...messages, {
            firstMessage: true,
            ...welcomeMsg.output,
        }])

        isLoadingDataFinished()
    }

    const getRippleAnim = () => {
        return (
            <TouchableOpacity style={S.buttonMic}>
                <LottieView
                    ref={animationRipple}
                    style={S.animationRipple}
                    source={require('../../assets/anim/ripple.json')}
                />
            </TouchableOpacity>
        );
    };

    const getMicAnim = () => {
        // Animation by Hicy Wonder https://lottiefiles.com/643-aispeech-mic
        return (
            <TouchableOpacity style={S.buttonMic} onPress={() => sendUserMessage()}>
                <LottieView
                    ref={animationMic}
                    style={S.animationMic}
                    source={require('../../assets/anim/mic.json')}
                    speed={0.6}
                />
            </TouchableOpacity>
        );
    };

    useEffect(() => {

        !welcomeMessage && getWelcomeMessage()

    }, [messages])

    return (
        <View style={S.container}>
            <View style={S.hearder}>
                <Image style={S.nuSymbol} source={nuSymbol} />
                <Text style={S.textUserName}>Felipe</Text>
            </View>

            <View style={S.content}>
                <ChatShowMessages 
                    messages={messages} 
                    showLoadingDotsUser={loadOnProgressMessageUser} 
                    showLoadingDotsBot={loadOnProgressMessageBot} 
                />
            </View>

            <View style={S.actionArea}>
                <View style={S.buttonMicArea}>
                    {getRippleAnim()}
                    {getMicAnim()}
                </View>
            </View>

            <TouchableOpacity style={S.buttonKeyboard}>
                {getIcon({ iconKey: iconRegularKeyboard })}
            </TouchableOpacity>
        </View>
    )
}