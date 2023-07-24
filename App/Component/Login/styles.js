import { StyleSheet, Platform } from 'react-native'
import { Colors } from '../../Utils/Colors'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light_yellow,
    },
    content: {
        backgroundColor: Colors.white,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 20,
        marginTop: '55%',
        marginBottom: '5%',
        paddingBottom: '15%',
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
                elevation: 4,
            }
        })
    },
    imgcontainer: {
        alignSelf: 'center',
        backgroundColor: Colors.white,
        marginTop: '-25%',
        width: 180,
        height: 180,
        borderRadius: 90,
        justifyContent: 'center',
        alignItems: 'center',
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
                elevation: 6,
            }
        })
    },
    img: {
        width: 140,
        height: 140,
        borderRadius: 70,
        resizeMode: 'cover',
    },
    inputcontainer: {
        alignItems: 'center',
        marginTop: 40
    },
    inputcontent: {
        width: '85%',
        borderWidth: 1,
        borderRadius: 30,
        borderColor: Colors.border_color,
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems: 'center'
    },
    inputimg: {
        width: 20,
        height: 20,
        resizeMode: 'center'
    },
    input: {
        color: Colors.text_color,
        marginLeft: 15,
        width: '85%',
    },
    eyeicon: {
        width: 25,
        height: 25,
        resizeMode: 'center',
        tintColor: Colors.light_yellow
    },
    forgottext: {
        marginVertical: 15,
        alignSelf: 'flex-end',
        marginHorizontal: 35,
        fontWeight: 'bold',
        color: Colors.black
    },
})