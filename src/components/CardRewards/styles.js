import { StyleSheet } from 'react-native';
import * as Colors from '../../styles/colors';
import * as Typography from '../../styles/typography';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },

    content: {
        margin: 15,
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
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

    labelArea: {
        alignItems: 'center',
    },
     
    labelText: {
        marginLeft: 10,
        color: Colors.textLightGray,
    },
     
    informationArea: {
        flex: 1,
        flexGrow: 2,
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 20,
    },
     
    informationLabel: {
        fontSize: 18,
        color: Colors.lightBlue,
    },
     
    informationTextPrimary: {
        fontSize: 26,
        fontWeight: 'bold',
        color: Colors.text,
    },
     
    informationTextSecondary: {
        ...Typography.textLabel,
        color: Colors.text,
        textAlign: 'center',
    },

    enableRewards: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.cardPurple,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
     
    textEnableRewards: {
        ...Typography.button,
        color: Colors.cardPurple,
    },
})

export default styles;