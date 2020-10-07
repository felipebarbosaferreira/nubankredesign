import { StyleSheet } from 'react-native';
import * as Colors from '../../styles/colors';

const styles = StyleSheet.create({
    carousel: {
    },

    scrollView: {
    },

    card: {
        flex: 1,
        marginHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
        borderRadius: 5,
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

    container: {
        flex: 1,
        flexDirection: 'row',
    },

    content: {
        margin: 15,
        flex: 1,
    },

    barStatus: {
        marginVertical: 15,
        marginRight: 15,
        width: 10,
    },

    barStatusNext: {
        backgroundColor: Colors.orange,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },

    barStatusCurrent: {
        backgroundColor: Colors.lightBlue,
    },

    barStatusAvailable: {
        backgroundColor: Colors.lightGreen,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
})

export default styles;