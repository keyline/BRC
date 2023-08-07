import { StyleSheet } from 'react-native';
import { Colors } from '../../Utils/Colors';
import { CommonStyle } from '../../Utils/CommonStyles';


export const styles = StyleSheet.create({
    mainContent: {
        marginTop: '5%'
    },
    bodyContent: {
        backgroundColor: Colors.white,
        width: '95%',
        alignSelf: 'center',
        marginTop: '4%',
        marginBottom: '5%',
        borderRadius: 10,
        paddingVertical: '5%',
        ...CommonStyle.box_effect 
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center'
    },
})