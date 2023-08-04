import { StyleSheet } from 'react-native';
import { Font_Family } from '../../Utils/Fonts';
import { Colors } from '../../Utils/Colors';


export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom:'1%'
    },
    nameText: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.black,
        width: '50%'
    },
    valueText: {
        fontFamily: Font_Family.NunitoSans_Regular,
        color: Colors.text_color,
        width: '50%',
    }
})