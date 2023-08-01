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
        marginVertical: '3%'
    },
})