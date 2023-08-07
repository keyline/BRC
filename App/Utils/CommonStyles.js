import { Platform, StyleSheet } from 'react-native';
import { Colors } from './Colors';
import { WIDTH } from '../Services/constants';
import { Font_Family } from './Fonts';


export const CommonStyle = StyleSheet.create({
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
    bodyContent: {
        backgroundColor: Colors.white,
        width: '90%',
        height: '90%',
        alignSelf: 'center',
        marginTop: '4%',
        marginBottom: '5%',
        borderRadius: 10,
        paddingVertical: '5%',
        paddingHorizontal: '5%',
        borderColor: Colors.lightGrey,
        borderWidth: 1,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0,0.5)',
                shadowRadius: 1,
                shadowOpacity: 0.5,
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
            },
            android: {
                elevtion: 6
            }
        }),
    },
    headingtext: {
        alignSelf: 'center',
        fontFamily: Font_Family.NunitoSans_Bold,
        fontSize: 20,
        color: Colors.white,
        // marginVertical:'4%'
    },
    logo: {
        width: 80,
        height: 80,
        borderRadius: 40,
        alignSelf: 'center'
    },
    errName: {
        color: 'red',
        alignSelf: 'flex-start'
    },
    box_effect: {
        borderColor: Colors.lightGrey,
        borderWidth: 1,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0,0.5)',
                shadowRadius: 1,
                shadowOpacity: 0.5,
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
            },
            android: {
                elevtion: 6
            }
        }),
    },
    border: {
        borderColor: Colors.border_grey,
        borderWidth: 0.8,
        width: WIDTH * 0.75,
        alignSelf: 'center'
    },
    borderNew: {
        borderColor: Colors.light_yellow,
        borderWidth: 0.8,
        width: '90%',
        alignSelf: 'center'
    }
})