import { StyleSheet } from 'react-native';
import { Font_Family } from '../../Utils/Fonts';
import { CommonStyle } from '../../Utils/CommonStyles';
import { Colors } from '../../Utils/Colors';


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
        height:'90%',
        alignSelf: 'center',
        marginTop: '4%',
        marginBottom: '5%',
        borderRadius: 10,
        paddingVertical: '5%',
        paddingHorizontal: '5%',
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
    list_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginBottom: '4%'
    },
    list_headingtext: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.light_yellow,
        // alignSelf:'flex-start'
        // width:'30%',
        // alignSelf:'center'
    },
    list_bodytext: {
        fontFamily: Font_Family.NunitoSans_Regular,
        color: Colors.text_color,
        // alignSelf:'flex-start'
        // width:'35%',
        // alignSelf:'center'
    },
    eyeicon: {
        width: 25,
        height: 25,
        resizeMode: 'contain'
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: '20%'
    },
    emptyText: {
        fontFamily: Font_Family.NunitoSans_Bold,
        fontSize: 16
    }
})