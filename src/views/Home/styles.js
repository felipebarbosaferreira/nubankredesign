import { StyleSheet } from 'react-native';
import * as Colors from '../../styles/colors';

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
        marginHorizontal: 15,
        backgroundColor: Colors.white,
    },

    buttonsList: {
        flex: 1,
        marginVertical: 15,
        overflow: 'visible',
    },

    buttonCard: {
        flex: 1,
        width: 90,
        height: 90,
        marginRight: 15,
        borderRadius: 8,
        backgroundColor: Colors.cardPurple,
    }, 

    text: {
        color: Colors.baseText,
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
})

export default styles;