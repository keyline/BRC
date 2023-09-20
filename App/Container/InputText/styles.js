import { StyleSheet,Platform } from 'react-native';
import { Colors } from '../../Utils/Colors';
import { Font_Family } from '../../Utils/Fonts';
import { HEIGHT, WIDTH } from '../../Services/constants';


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
    inputcontent: {
        width: '90%',
        borderWidth: 1,
        borderRadius: 30,
        borderColor: Colors.border_color,
        flexDirection: 'row',
        paddingHorizontal: '6%',
        alignItems: 'center',
        alignSelf: 'center',
        ...Platform.select({
            ios:{
                paddingVertical:'4%'
            }
        })
    },
    inputimg: {
        width: 20,
        height: 20,
        resizeMode: 'center',
        marginRight: 15,

    },
    input: {
        color: Colors.text_color,
        width: '85%',
        fontFamily: Font_Family.NunitoSans_Regular,
        
    },
    errName: {
        color: 'red',
        alignSelf: 'flex-start',
        marginHorizontal: WIDTH * 0.02,
        marginTop: HEIGHT * 0.002,
    },
})