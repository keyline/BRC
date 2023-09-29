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
    bodyContent: {
        backgroundColor: Colors.white,
        width: '90%',
        // height:'100%',
        alignSelf: 'center',
        marginTop: '4%',
        marginBottom: '5%',
        borderRadius: 10,
        paddingVertical: '5%',
        paddingHorizontal: '3%',
        ...CommonStyle.box_effect
    },
    logo: {
        width: 80,
        height: 80,
        borderRadius: 40,
        alignSelf: 'center'
    },
    subheadingText: {
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: Font_Family.NunitoSans_Bold,
        fontSize: 14,
        color: Colors.light_yellow,
        width: '90%',
        marginVertical: '4%'
    },
    border: {
        borderColor: Colors.light_yellow,
        borderWidth: 0.8,
        width: '90%',
        alignSelf: 'center',
        marginVertical: '2%'
    },
    diningLogo: {
        width: 50,
        height: 50,
        tintColor: Colors.light_blue
    },
    diningLogoSelected: {
        width: 50,
        height: 50,
        tintColor: Colors.white
    },
    diningLogoOff: {
        width: 50,
        height: 50,
    },
    listContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 10,
        paddingVertical: '4%',
        width: '70%',
        marginBottom: '4%',
        alignSelf: 'center',
        justifyContent: 'space-evenly',
        borderColor: Colors.light_blue,
        backgroundColor: Colors.morelight_yellow
    },
    listContainerSelected: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: '4%',
        width: '70%',
        marginBottom: '4%',
        alignSelf: 'center',
        justifyContent: 'space-evenly',
        borderColor: Colors.light_blue,
        backgroundColor: Colors.light_blue
    },
    listTextcontent: {
        // marginLeft: '4%'
    },
    listHeadingtxt: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.light_blue
    },
    listHeadingtxtSelected: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.white
    },
    listDesctxt: {
        fontFamily: Font_Family.NunitoSans_Italic,
        color: Colors.light_blue
    },
    listDesctxtSelected: {
        fontFamily: Font_Family.NunitoSans_Italic,
        color: Colors.white
    },
    btncontainer: {
        // alignSelf: 'center',
        marginTop: '4%',
        // width: '90%'
    },
    tableListContainer: {
        // paddingHorizontal: '5%',
        width: '85%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        // borderWidth:2
    },
    tableListContent: {
        width: '48%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '4%',
        borderWidth: 2,
        borderRadius: 10,
        paddingVertical: '4%',
        borderColor: Colors.light_blue,
        backgroundColor: Colors.morelight_yellow
    },
    tableListContentSelected: {
        width: '48%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '4%',
        borderWidth: 2,
        borderRadius: 10,
        paddingVertical: '4%',
        borderColor: Colors.light_blue,
        backgroundColor: Colors.light_blue
    },
    tableListContentOff: {
        width: '48%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '4%',
        borderWidth: 2,
        borderRadius: 10,
        paddingVertical: '4%',
        borderColor: Colors.lightGrey,
        backgroundColor: Colors.lightGrey
    },
    checkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: '4%'
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