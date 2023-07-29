import { Platform, StyleSheet } from 'react-native';
import { Colors } from './Colors';
import { WIDTH } from '../Services/constants';


export const CommonStyle = StyleSheet.create({
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
                elevtion: 4
            }
        }),
    },
    border: {
        borderColor: Colors.border_grey,
        borderWidth: 0.8,
        width: WIDTH * 0.75,
        alignSelf: 'center'
    }
})