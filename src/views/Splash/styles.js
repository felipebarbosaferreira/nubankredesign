import { StyleSheet } from 'react-native';
import * as Colors from '../../styles/colors';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: Colors.background,
    },

    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        color: Colors.baseText,
        fontSize: 18,
    },

    nuSymbol: {
        position: 'absolute',
        width: 100,
        height: 100,
        backgroundColor: Colors.background,
    },
})

export default styles;