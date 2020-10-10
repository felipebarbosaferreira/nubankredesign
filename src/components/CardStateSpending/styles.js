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
        flexDirection: 'row',
        alignItems: 'center',
    },
     
    labelText: {
        marginLeft: 10,
        color: Colors.textLightGray,
    },
     
    informationArea: {
        flexGrow: 2,
        justifyContent: 'center',
    },
     
    informationLabel: {
        fontSize: 18,
        color: Colors.lightBlue,
    },
     
    informationTextPrimary: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.lightBlue,
    },
     
    informationTextSecondary: {
        ...Typography.textLabel,
        color: Colors.textLightGray,
    },

    informationValueLimit: {
        ...Typography.textImportant,
        fontWeight: 'bold',
        color: Colors.lightGreen,
    },
})

export default styles;