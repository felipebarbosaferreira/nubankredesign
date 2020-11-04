import { StyleSheet } from 'react-native';
import * as Colors from '../../styles/colors';
import * as Typography from '../../styles/typography';

const DOTS_SIZE = {
    width: 30,
    height: 30,
}

const styles = StyleSheet.create({
    messagesArea: {
        flex: 1,
        marginHorizontal: 15,
    },

    messageFirst: {
        marginTop: 100,
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


    cardTrasnferMoney: {
        backgroundColor: Colors.white,
        paddingHorizontal: 15,
        paddingTop: 15,
        marginVertical: 10,
        borderRadius: 10,
    },

    cardTrasnferMoneyLine: {
        flexDirection: 'row',
        marginBottom: 15,
        alignItems: 'center',
    },

    cardTrasnferMoneyContact: {
        marginHorizontal: 15,
    },

    cardTrasnferMoneyContactName: {
        ...Typography.cardTextImportant,
        color: Colors.mediumGray,
    },

    cardTrasnferMoneyContactAreaInfo: {
        marginTop: -15,
        marginHorizontal: 39,
    },

    cardTrasnferMoneyContactInfo: {
        ...Typography.paragraphText,
        color: Colors.mediumGray,
    },

    cardTrasnferMoneyAmount: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.mediumBlue,
        marginHorizontal: 15,
    },



    animationDots: {
        ...DOTS_SIZE,
        backgroundColor: Colors.purple,
    },

    animationDotsUser: {
        ...DOTS_SIZE,
        backgroundColor: Colors.mediumPurple,
    },
})

export default styles;