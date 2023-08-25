import { StyleSheet } from "react-native";
import { Colors } from "../../Utils/Colors";
import { Font_Family } from "../../Utils/Fonts";
import { CommonStyle } from "../../Utils/CommonStyles";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.brown,
    },
    content: {
        flex: 1,
        backgroundColor: Colors.light_yellow,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        // height:'95%'
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
        width: '95%',
        // height:'100%',
        alignSelf: 'center',
        marginTop: '4%',
        marginBottom: 15,
        borderRadius: 10,
        paddingVertical: '5%',
        paddingHorizontal: '3%',
        // zIndex:1,
        ...CommonStyle.box_effect
    },
    logo: {
        width: 80,
        height: 80,
        borderRadius: 40,
        alignSelf: 'center'
    },
    border: {
        borderColor: Colors.light_yellow,
        borderWidth: 0.8,
        width: '90%',
        alignSelf: 'center',
        marginVertical: '2%'
    },
    subheadingText: {
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: Font_Family.NunitoSans_Bold,
        fontSize: 14,
        color: Colors.light_yellow,
        width: '90%',
        marginVertical: '2%'
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
    tableListContentNotaval: {
        width: '48%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '4%',
        borderWidth: 2,
        borderRadius: 10,
        paddingVertical: '4%',
        borderColor: Colors.light_blue,
        backgroundColor: Colors.lightGrey
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
    listHeadingtxt: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.light_blue
    },
    listHeadingtxtSelected: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.white
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
    btncontainer: {
        // alignSelf: 'center',
        marginTop: '4%',
        // width: '90%'
    },
})