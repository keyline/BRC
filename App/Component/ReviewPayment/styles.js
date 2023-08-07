import { StyleSheet } from "react-native";
import { Colors } from "../../Utils/Colors";
import { CommonStyle } from "../../Utils/CommonStyles";
import { Font_Family } from "../../Utils/Fonts";

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
    nameText: {
        alignSelf: 'center',
        fontFamily: Font_Family.NunitoSans_Bold,
        fontSize: 18,
        color: Colors.dark_yellow,
        marginVertical: '4%'
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginLeft: '10%',
        marginTop: '4%',
        alignSelf: 'center'
    },
    lighttext: {
        fontFamily: Font_Family.NunitoSans_Regular,
        color: Colors.text_color
    },
    hdfclogo: {
        width: 120,
        height: 20,
        resizeMode: 'contain',
        marginVertical: '2%'
    }
})