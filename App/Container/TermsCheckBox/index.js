import { View, Text, Linking } from 'react-native'
import React, { useCallback } from 'react'
import CheckBox from '@react-native-community/checkbox'
import Toast from 'react-native-simple-toast';
import { styles } from './styles';
import { Colors } from '../../Utils/Colors';

const TermsCheckBox = ({ value, onValueChange, TermsLink }) => {

    const onTermsCondition = useCallback(async () => {
        try {
            if (TermsLink) {
                await Linking.openURL(TermsLink);
            }
        } catch (error) {
            if (__DEV__) {
                console.log(error)
            }
            Toast.show('Something Went Wrong', Toast.LONG)
        }
    })

    return (
        <View style={styles.checkContainer}>
            <CheckBox
                value={value}
                disabled={false}
                onValueChange={(value) => onValueChange(value)}
                tintColors={{ true: Colors.brown, false: Colors.black }}
                tintColor={Colors.black}
                onCheckColor={Colors.brown}
            />
            <Text style={styles.aceptText}>  I accept the <Text onPress={onTermsCondition} style={styles.termstext}>Terms and Conditions</Text></Text>
        </View>
    )
}

export default TermsCheckBox