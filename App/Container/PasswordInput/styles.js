import { StyleSheet, Platform } from "react-native";
import { Colors } from "../../Utils/Colors";
import { Font_Family } from "../../Utils/Fonts";
import { HEIGHT, WIDTH } from "../../Services/constants";

export const styles = StyleSheet.create({
    container: {
        width: WIDTH * 0.75,
        alignSelf: 'center',
        marginVertical: HEIGHT * 0.009
    },
    headingtext: {
        color: Colors.text_color,
        fontFamily: Font_Family.NunitoSans_Bold,
        marginBottom: HEIGHT * 0.01,
        marginHorizontal: WIDTH * 0.02
    },
    content: {
        borderWidth: 1,
        borderRadius: 30,
        borderColor: Colors.border_color,
        flexDirection: 'row',
        paddingHorizontal: '6%',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                paddingVertical: '4%'
            }
        })
    },
    inputimg: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    input: {
        color: Colors.text_color,
        marginLeft: 15,
        width: '85%',
        fontFamily: Font_Family.NunitoSans_Regular
    },
    eyeicon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        ...Platform.select({
            android: {
                tintColor: Colors.light_yellow
            }
        })
    },
    errName: {
        color: 'red',
        alignSelf: 'flex-start',
        fontFamily: Font_Family.NunitoSans_Regular,
        marginTop: HEIGHT * 0.004,
        marginHorizontal: WIDTH * 0.02
    },
})