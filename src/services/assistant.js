import Constants from 'expo-constants';
import axios from 'axios';

const baseURL = Constants.manifest.extra.baseUrlAssistant;

const baseConfigAxios = { baseURL };

const api = config => axios.create(config);

async function sendMessageText(text) {
    return await api(baseConfigAxios)
        .post('/api/message/text/send', {
            text,
            email: "felipebarbosaferreira@gmail.com", // TODO get from user
            sessionId: "123", // TODO make uuid for session conversation
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error : sendMessageText', error)
            // TODO throw exception, and catch to render message user
            return;
        });
}

async function sendMessageAudio(audioPath) {
    const formData = new FormData();
    formData.append(
        'audioFile',
        {
            uri: audioPath,
            type: 'audio/x-wav',
            name: 'audioFile.wav'
        },
        `audioFile.wav`
    );
    formData.append('email', 'felipebarbosaferreira@gmail.com');
    formData.append('sessionId', '1233');

    return await api(baseConfigAxios)
        .post('/api/message/audio/send', formData)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error : sendMessageAudio', error)
            // TODO throw exception, and catch to render message user
            return;
        });
}

const assistant = {
    sendMessageText,
    sendMessageAudio,
}

export default assistant;