import { StyleSheet } from 'react-native';
import * as Colors from '../../styles/colors';
import * as Typography from '../../styles/typography';


const buttonCard = {
    width: 90,
    height: 90,
    marginRight: 15,
    borderRadius: 8,
    padding: 8,
    justifyContent: 'space-between',
    backgroundColor: Colors.cardPurple,
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    hearder: {
        flexGrow: 0.8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },

    textUserName: {
        color: Colors.textWhite,
        fontSize: 20,
        fontWeight: 'bold',
    },

    nuSymbol: {
        height: 60,
        width: 60,
        marginRight: 10,
    },

    content: {
        flex: 1,
        flexGrow: 3,
        marginVertical: 0,
        marginHorizontal: 0,
    },

    messagesArea: {
        flex: 1,
        marginHorizontal: 15,
        backgroundColor: Colors.darkGray,
    },

    actionArea: {
        bottom: 0,
        minHeight: 150,
    },

    buttonMicArea: {
        flex: 1,
        minWidth: 150,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },

    animationRipple: {
        width: 150,
        height: 150,
        marginBottom: -115,
        backgroundColor: Colors.purple,
    },

    animationMic: {
        width: 80,
        height: 80,
    },

    buttonKeyboard: {
        position: 'absolute',
        bottom: 15,
        left: 15,
    },
})

export default styles;