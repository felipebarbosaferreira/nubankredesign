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
        color: Colors.textWhite,
        fontSize: 20,
        fontWeight: 'bold',
    },

    textButtonList: {
        color: Colors.textWhite,
        ...Typography.button,
    },

    nuSymbol: {
        height: 60,
        width: 60,
        marginRight: 10,
    },
})

export default styles;