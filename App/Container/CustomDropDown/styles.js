import { StyleSheet } from 'react-native';
import { Font_Family } from '../../Utils/Fonts';
import { HEIGHT, WIDTH } from '../../Services/constants';
import { Colors } from '../../Utils/Colors';

export const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        marginVertical: '2%'
    },
    headingtext: {
        color: Colors.text_color,
        fontFamily: Font_Family.NunitoSans_Bold,
        marginBottom: HEIGHT * 0.01,
        marginHorizontal: WIDTH * 0.02
    },
    dropiker: {
        borderWidth: 1,
        // borderBottomWidth: hp(0.03),
        borderRadius: 30,
        borderColor: Colors.border_color,
        width: '80%',
        alignSelf: "center",
        alignItems: "center",
    },
    input1: {
        // marginVertical: 2,
        // marginHorizontal: 5,
        borderRadius: 5,
        // fontSize: FONT_SIZE.LesSize,
        width: '80%',
        paddingHorizontal:'6%',
        color: Colors.text_color,
        fontFamily: Font_Family.NunitoSans_Regular,
    },
    errName: {
        color: 'red',
        alignSelf: 'flex-start',
        marginHorizontal: WIDTH * 0.02,
        marginTop: HEIGHT * 0.002,
    },
})