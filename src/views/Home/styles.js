import { StyleSheet } from 'react-native';
import * as Colors from '../../styles/colors';


const buttonCard = {
    width: 90,
    height: 90,
    marginRight: 15,
    borderRadius: 8,
    backgroundColor: Colors.cardPurple,
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
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

    content: {
        flex: 1,
        flexGrow: 3,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 0,
        marginHorizontal: 0,
    },

    buttonsList: {
        flex: 1,
        marginVertical: 15,
        overflow: 'visible',
    },

    buttonCard: {
        ...buttonCard,
    }, 

    buttonCardFirst: {
        ...buttonCard,
        marginLeft: 15,
    }, 

    text: {
        color: Colors.darkText,
    },

    textUserName: {
        color: Colors.baseText,
        fontSize: 20,
        fontWeight: 'bold',
    },

    nuSymbol: {
        height: 60,
        width: 60,
        marginRight: 10,
    },


    carousel: {
    },

    scrollView: {
    },

    cardDark: {
        backgroundColor: Colors.darkPurple,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    cardLight: {
        backgroundColor: Colors.white,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    bulletsArea: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        backgroundColor: Colors.background,
    },

    bullet: {
        height: 10,
        width: 10,
        marginHorizontal: 5,
        backgroundColor: Colors.white,
        borderRadius: 20,
    },
})

export default styles;