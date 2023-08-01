import { StyleSheet } from 'react-native';
import { Colors } from '../../Utils/Colors';
import { Font_Family } from '../../Utils/Fonts';
import { CommonStyle } from '../../Utils/CommonStyles';


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
        // backgroundColor: Colors.white,
        width: '90%',
        height: '83%',
        alignSelf: 'center',
        marginTop: '4%',
        marginBottom: '2%',
        // borderRadius: 10,
        // paddingVertical: '5%',
        // paddingHorizontal: '5%',
        // ...CommonStyle.box_effect
    },
    listContainer: {
        backgroundColor: Colors.white,
        marginBottom: '3%',
        borderRadius: 10,
        paddingHorizontal: '4%',
        paddingVertical: '4%',
        ...CommonStyle.box_effect

    },
    btnContent: {
        width: '90%',
        alignSelf: 'center',
        marginTop: '1.5%'
    }
})