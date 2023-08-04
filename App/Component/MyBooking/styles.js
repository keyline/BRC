import { StyleSheet } from 'react-native';
import { Colors } from '../../Utils/Colors';
import { CommonStyle } from '../../Utils/CommonStyles';
import { Font_Family } from '../../Utils/Fonts';


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
    listContainer: {
        flex: 1,
        backgroundColor: Colors.light_yellow,
        paddingVertical: '4%'
    },
    listContent: {
        backgroundColor: Colors.white,
        marginBottom: '3%',
        width: '95%',
        alignSelf: 'center',
        borderRadius: 10,
        paddingHorizontal: '4%',
        paddingVertical: '4%',
        ...CommonStyle.box_effect
    },
    cancelText: {
        color: Colors.white,
        fontFamily: Font_Family.NunitoSans_Bold,
        alignSelf: 'center',
        marginRight: '4%',
        marginTop: '6%',
        backgroundColor: Colors.dark_yellow,
        paddingVertical: '1%',
        paddingHorizontal: '2%',
        borderRadius: 5
    },
    playerContainer: {
        // flexDirection: 'row',
        // alignItems:'center'
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    nameText: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.black,
        // width: '50%'
    },
    valueText: {
        fontFamily: Font_Family.NunitoSans_Regular,
        color: Colors.text_color,
    },
    playerRightContent: {
        // width: '100%',
        backgroundColor: Colors.lightGrey,
        paddingHorizontal: '4%',
        paddingVertical: '1%',
        borderRadius: 5,
        marginVertical: '2%'
    },
    playerList: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // width: '50%',
    }
})