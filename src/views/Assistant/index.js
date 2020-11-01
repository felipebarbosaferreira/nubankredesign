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

export default function Assistant({ navigation }) {

    const [loadOnProgress, setLoadOnProgress] = useState(false);
    const [messages, setMessages] = useState([]);
    const [welcomeMessage, setWelcomeMessage] = useState();
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

    const getMessages = () => {
        console.log(messages)
        return messages
    }

    const setAnimDataReceived = () => {
        // animationMic.current.play(181, 192); // return mic effect
        setTimeout(() => {
            setMessages(
                [
                    ...getMessages(),
                    {
                        texts: [
                            "Quero transferir dindin, consegue me da um help com isso?",
                        ],
                        fromUser: true,
                    },
                ]
            )
            setLoadOnProgressMessageUser(false)
        }, 450);
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

        setLoadOnProgressMessageUser(true);

        setTimeout(() => { animationMic.current.play(172, 180) }, 450); // load spinning effect

        setTimeout(() => { setAnimDataReceived() }, 5000)
    }

    const setAnimRecognizingVoice = () => {
        isLoadingData();

        animationMic.current.play(115, 127); // hide mic effect
        setTimeout(() => { animationMic.current.play(38, 72) }, 450); // recognizing effect

        setTimeout(() => { setAnimDataLoad() }, 5000);
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
            <TouchableOpacity style={S.buttonMic} onPress={() => setAnimRecognizingVoice()}>
                <LottieView
                    ref={animationMic}
                    style={S.animationMic}
                    source={require('../../assets/anim/mic.json')}
                    speed={0.6}
                />
            </TouchableOpacity>
        );
    };

    async function sendMessage(message) {
        // TODO call api
        // TODO reproduce audio
        // TODO return texts api
        return {
            texts: [
                "Oi!",
                "Em que posso te ajudar?"
            ],
        }
    }

    async function getWelcomeMessage() {
        setMicVisible()
        isLoadingData()
        const welcomeMsg = await sendMessage("oi");
        setWelcomeMessage(true)
        setMessages([...messages, {
            firstMessage: true,
            ...welcomeMsg,
        }])
        isLoadingDataFinished()
    }

    function isLoadingData() {
        animationRipple.current.reset() // stop ripple
        setLoadOnProgress(true);
    }

    function isLoadingDataFinished() {
        animationRipple.current.play() // play ripple
        setLoadOnProgress(false);
    }

    useEffect(() => {

        !welcomeMessage && getWelcomeMessage()

        messages.length === 2 && finishMock()

    }, [loadOnProgress, messages])

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