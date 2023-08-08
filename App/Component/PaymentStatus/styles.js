import { StyleSheet } from 'react-native';
import { Colors } from '../../Utils/Colors';
import { CommonStyle } from '../../Utils/CommonStyles';
import { Font_Family } from '../../Utils/Fonts';


export const styles = StyleSheet.create({
    mainContent: {
        marginTop: '5%'
    },
    bodyContent: {
        backgroundColor: Colors.white,
        width: '95%',
        alignSelf: 'center',
        marginTop: '4%',
        marginBottom: '5%',
        borderRadius: 10,
        paddingVertical: '5%',
        ...CommonStyle.box_effect
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center'
    },
    border: {
        borderColor: Colors.light_yellow,
        borderWidth: 0.8,
        width: '90%',
        alignSelf: 'center',
        marginVertical: '4%'
    },
    successText: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.light_green,
        fontSize: 18,
        textAlign: 'center',
        marginVertical: '3%'
    },
    failText: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: 'red',
        fontSize: 18,
        textAlign: 'center',
        marginVertical: '4%'
    },
    tnxText: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.light_blue,
        // fontSize: 18,
        textAlign: 'center',
        marginTop: '2%',
        marginBottom:'6%'
    },
    detailsContent: {
        // width:'85%'
        paddingHorizontal: '10%',
        // alignItems:'center',
        // alignSelf:'center'
    }
})