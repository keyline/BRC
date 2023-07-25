import { StyleSheet } from "react-native";
import { Colors } from "../../Utils/Colors";
import { Font_Family } from "../../Utils/Fonts";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.brown,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '3%',
        paddingVertical: '3%'
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 25,
        resizeMode: 'cover',
    },
    textcontent: {
        marginLeft: '4%'

    },
    boldtext: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.white,
        // fontSize:14
    },
    lighttext: {
        fontFamily: Font_Family.NunitoSans_Regular,
        color: Colors.light_yellow,
        fontSize: 11
    },
    menu:{
        width:20,
        height:20
    }
})