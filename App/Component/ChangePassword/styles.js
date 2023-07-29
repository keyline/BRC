import { StyleSheet } from 'react-native';
import { Colors } from '../../Utils/Colors';
import { Font_Family } from '../../Utils/Fonts';
import { CommonStyle } from '../../Utils/CommonStyles';
import { HEIGHT } from '../../Services/constants';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.brown,
    },
    content: {
        flex: 1,
        backgroundColor: Colors.light_yellow,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    mainContent: {
        marginTop: '5%'
    },
    headingtext: {
        alignSelf: 'center',
        fontFamily: Font_Family.NunitoSans_Bold,
        fontSize: 20,
        color: Colors.white
    },
    bodyContent: {
        backgroundColor: Colors.white,
        width: '90%',
        alignSelf: 'center',
        marginTop: '4%',
        borderRadius: 10,
        paddingVertical: '5%',
        ...CommonStyle.box_effect
    },
    logo: {
        width: 80,
        height: 80,
        borderRadius: 40,
        alignSelf: 'center'
    },
    nameText: {
        alignSelf: 'center',
        fontFamily: Font_Family.NunitoSans_Bold,
        fontSize: 18,
        color: Colors.dark_yellow,
        marginVertical: '4%'
    },
    btncontent:{
        marginVertical:HEIGHT*0.03
    }
})