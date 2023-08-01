import { StyleSheet } from 'react-native';
import { Font_Family } from '../../Utils/Fonts';

export const styles = StyleSheet.create({
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