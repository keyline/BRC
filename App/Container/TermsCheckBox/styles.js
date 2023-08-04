import { StyleSheet } from "react-native";
import { Font_Family } from "../../Utils/Fonts";
import { Colors } from "../../Utils/Colors";


export const styles = StyleSheet.create({
    checkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical:'4%'
    },
    aceptText: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.black
    },
    termstext: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.light_blue,
        textDecorationLine: 'underline'
    }
})