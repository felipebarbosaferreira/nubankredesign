import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Audio } from 'expo-av';
import * as FileSystem from "expo-file-system";
import * as Speech from 'expo-speech';

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

const RECORDING_OPTIONS = {
    // android not currently in use, but parameters are required
    android: {
        extension: '.wav',
        sampleRate: 8000,
        numberOfChannels: 1,
        bitRate: 128000,
    },

    // TODO test config iOS
    ios: {
        extension: '.wav',
        audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
        sampleRate: 8000,
        numberOfChannels: 1,
        bitRate: 128000,
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false,
    },
};


export default function Assistant({ navigation }) {

    const [messages, setMessages] = useState([]);
    const [welcomeMessage, setWelcomeMessage] = useState(false);
    const [loadOnProgressMessageUser, setLoadOnProgressMessageUser] = useState(false);
    const [loadOnProgressMessageBot, setLoadOnProgressMessageBot] = useState(false);
    const [recording, setRecording] = useState(new Audio.Recording());

    const animationMic = useRef(null);
    const animationRipple = useRef(null);

    const gotToHome = () => navigation.navigate('Home');

    // TODO separate responsibilities into other files

    // Permission Audio Recording
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

    
    // Animation control
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

    const setAnimDataReceived = () => {
        isLoadingDataFinished();
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

    // Audio play
    async function playAudioFromRecorded() {
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: false,
            staysActiveInBackground: true,
          });
          const { sound, status } = await recording.createNewLoadedSoundAsync(
            {
              isLooping: true,
              isMuted: false,
              volume: 1.0,
              rate: 1.0,
              shouldCorrectPitch: true,
            }
          );
          sound.playAsync();
    }

    function playAudioFromText(output) {
        const messagesToSpeech = output.texts || [];
        
        messagesToSpeech.forEach(message => {
            Speech.speak(message.replace(/[;:\)\(]/g, ""), {
                language: 'pt-BR',
            })
        });
    }

    // Audio record
    async function recordVoiceUserStop(resolve) {
        try {
            await recording.stopAndUnloadAsync();
        } catch (error) {
            // On Android, calling stop before any data has been collected results in
            // an E_AUDIO_NODATA error. This means no audio data has been written to
            // the output file is invalid.
            if (error.code === "E_AUDIO_NODATA") {
                console.log(
                    `Stop was called too quickly, no data has yet been received (${error.message})`
                );
            } else {
                console.log("STOP ERROR: ", error.code, error.name, error.message);
            }
            return;
        }
        const infoAudioRecorded = await FileSystem.getInfoAsync(recording.getURI() || "");
        // console.log(`FILE INFO: ${JSON.stringify(info)}`);
        // await play() // TODO delete play(), used in test to listen to the recorded audio

        resolve(infoAudioRecorded)
    }

    function recordVoiceUserDelayToStop() {
        return new Promise(resolve => {
            setTimeout(() => {
                recordVoiceUserStop(resolve)
            }, 5000)
        })
    }

    async function recordVoiceUser() {
        setAnimRecognizingVoice()

        try {
            await recording.prepareToRecordAsync(RECORDING_OPTIONS);
            await recording.startAsync();
            // You are now recording!

            // recordVoiceUserStop() // TODO stop recording audio with recognition that the user has stopped speaking, something like react-native-voice
            return await recordVoiceUserDelayToStop()
                .then(response => {
                    console.log('response record', response)
                    return response;
                })
                .catch(error => console.log('error on record', error))

        } catch (error) {
            // An error occurred!
            setMicVisible()
            console.error('recordVoiceUser error', error)
        }

    }


    // Send messages
    async function sendMessage(message, isAudio = false) {
        setAnimDataLoad()

        // TODO call api
        let response;
        if (isAudio) {
            const audioPath = message.uri
            response = await assistant.sendMessageAudio(audioPath)
        } else {
            response = await assistant.sendMessageText(message)
        }
        setAnimDataReceived()
        // TODO reproduce audio
        // TODO return texts api

        // console.log('response.output.texts', response.output.texts);
        return response;
    }

    async function sendUserMessage() {
        setAnimRecognizingVoice()

        const audioRecordInfo = await recordVoiceUser();

        setLoadOnProgressMessageUser(true)

        // TODO get input voice user

        isLoadingData()
        const responseToUser = await sendMessage(audioRecordInfo, true)

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
            playAudioFromText(textsToUser)
            setLoadOnProgressMessageBot(false)
        }, 1500);

        isLoadingDataFinished()
        setRecording(new Audio.Recording());
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

        playAudioFromText(welcomeMsg.output)

        isLoadingDataFinished()

        // TODO make checkPermissionAudioRecording be first thing
        const permissionAudioRecording = await checkPermissionAudioRecording();
        if (!permissionAudioRecording) {
            showAlertPermissionAudioRecordingNotEnabled()
        }
    }


    // Renders
    const getIcon = ({ iconKey }) => {
        return (
            <FontAwesomeIcon icon={getIconByKey(iconKey)} size={24} color={white} />
        );
    };

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

    // TODO delete
    const getMessages = () => {
        // console.log(messages)
        return messages
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
                                                stringValue: "Ana Maira",
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
    // TODO delete

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