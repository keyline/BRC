import { StyleSheet } from 'react-native';
import { Font_Family } from '../Utils/Fonts';
import { Colors } from '../Utils/Colors';


export const styles = StyleSheet.create({
    drawerTopContent: {
        marginVertical: '10%',
        alignItems: 'center',
    },
    drawerLogo: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    drawerNametext: {
        fontFamily: Font_Family.NunitoSans_Bold,
        marginVertical: '5%',
        fontSize: 16,
        color: Colors.light_yellow
    },
    border: {
        borderColor: Colors.light_blue,
        borderWidth: 0.8,
        width: '90%',
        alignSelf: 'center'
    },
    menuText: {
        fontFamily: Font_Family.NunitoSans_Bold,
        // fontSize:16
    }
})