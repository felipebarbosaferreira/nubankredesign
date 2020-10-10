import { StyleSheet } from 'react-native';
import * as Colors from '../../styles/colors';
import * as Typography from '../../styles/typography';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        overflow: "hidden",
    },

    content: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'stretch',
        margin: 15,
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
        flex: 1,
        marginLeft: 10,
        color: Colors.textLightGray,
    },
     
    informationArea: {
        justifyContent: 'center',
        marginVertical: 15,
    },
     
    informationLabel: {
        fontSize: 18,
        color: Colors.lightBlue,
    },
     
    informationTextPrimary: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.text,
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

    chartArea: {
        flex: 1,
    },

    chart: {
        // height: 200,
        // width: 200,
        backgroundColor: '#fff',
        justifyContent: 'center'
    }

})

export default styles;