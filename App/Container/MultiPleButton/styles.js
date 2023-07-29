import { StyleSheet } from 'react-native'
import { HEIGHT, WIDTH } from '../../Services/constants'
import { Colors } from '../../Utils/Colors'
import { Font_Family } from '../../Utils/Fonts'


export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: WIDTH,
        paddingHorizontal: WIDTH * 0.04,
        alignSelf:'center'
    },
    firstbtncontent: {
        backgroundColor: Colors.light_green,
        paddingHorizontal: WIDTH * 0.08,
        paddingVertical: HEIGHT * 0.02,
        borderRadius: 30
    },
    firstbtntext: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.white,
    },
    secondbtncontent: {
        backgroundColor: Colors.dark_yellow,
        paddingHorizontal: WIDTH * 0.06,
        paddingVertical: HEIGHT * 0.02,
        borderRadius: 30
    },
    secondbtntext: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.white,
    }
})