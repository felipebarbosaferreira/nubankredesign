import { StyleSheet } from 'react-native';
import * as Colors from '../../styles/colors';
import * as Typography from '../../styles/typography';

const styles = StyleSheet.create({
    messagesArea: {
        flex: 1,
        marginHorizontal: 15,
    },

    messageFirst: {
        marginTop: 100,
        alignSelf: 'center',
    },
    
    messageBot: {
        alignSelf: 'flex-start',
        padding: 10,
    },
    
    messageUser: {
        marginVertical: 20,
        alignSelf: 'flex-end',
        padding: 10,
        borderRadius: 20,
        maxWidth: '80%',
        backgroundColor: Colors.mediumPurple,
    },

    messageText: {
        fontSize: 18,
        color: Colors.white,
    },

    messageTextImportant: {
        fontSize: 24,
        color: Colors.white,
    },
})

export default styles;