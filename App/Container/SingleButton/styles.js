import { StyleSheet } from 'react-native'
import { Colors } from '../../Utils/Colors'


export const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.dark_yellow,
        paddingVertical: 15,
        borderRadius: 30
    },
    text: {
        color: Colors.white,
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 16
    }
})