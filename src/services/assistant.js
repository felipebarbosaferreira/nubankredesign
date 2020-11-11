import Constants from 'expo-constants';
import axios from 'axios';

const baseURL = Constants.manifest.extra.baseUrlAssistant;

const api = () => axios.create({ baseURL });

async function sendMessageText(text) {
    return await api()
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

const assistant = {
    sendMessageText,
}

export default assistant;