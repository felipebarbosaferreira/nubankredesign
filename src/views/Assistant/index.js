import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Audio } from 'expo-av';

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

const GRANTED = 'granted';

export default function Assistant({ navigation }) {

    const [messages, setMessages] = useState([]);
    const [welcomeMessage, setWelcomeMessage] = useState(false);
    const [loadOnProgressMessageUser, setLoadOnProgressMessageUser] = useState(false);
    const [loadOnProgressMessageBot, setLoadOnProgressMessageBot] = useState(false);
    const [recording, setRecording] = useState();

    const animationMic = useRef(null);
    const animationRipple = useRef(null);

    const gotToHome = () => navigation.navigate('Home');

    const showAlertPermissionAudioRecordingNotEnabled = () =>
        Alert.alert(
            "Olá",
            'Você ainda não ativou a permissão de áudio. Para conversamos você pode habilitar a gravação de áudio para esse app ;)',
            [
                { text: "OK", onPress: () => gotToHome() }
            ],
            { cancelable: false }
        );

    async function askForPermissionAudioRecording() {
        const { status, permissions } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        if (status !== GRANTED) {
            return;
        }
        return true;
    }

    async function checkPermissionAudioRecording() {
        const { status } = await Permissions.getAsync(Permissions.AUDIO_RECORDING);
        if (status !== GRANTED) {
            return await askForPermissionAudioRecording();
        }
        return true;
    }



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

    async function recordVoiceUser() {
        setAnimRecognizingVoice()

        try {
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync();
            // You are now recording!
        } catch (error) {
            // An error occurred!
            setMicVisible()
            console.error('recordVoiceUser error', error)
        }

    }

    async function sendUserMessage() {
        setAnimRecognizingVoice()
        
        // await recordVoiceUser();

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

        // TODO make checkPermissionAudioRecording be first thing
        const permissionAudioRecording = await checkPermissionAudioRecording();
        if (!permissionAudioRecording) {
            showAlertPermissionAudioRecordingNotEnabled()
        }
        setRecording(new Audio.Recording());
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