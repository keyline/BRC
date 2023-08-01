import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { CommonStyle } from '../../Utils/CommonStyles'
import { Colors } from '../../Utils/Colors'
import SingleButton from '../../Container/SingleButton'

export const HeaderComponent = () => (
    <View style={{ marginVertical: '4%' }}>
        <View style={styles.list_container}>
            <Text style={styles.list_headingtext}>Sl. No</Text>
            <Text style={styles.list_headingtext}>Month</Text>
            <Text style={styles.list_headingtext}>Bill Summary</Text>
        </View>
        <View style={[CommonStyle.border, { width: '100%', borderColor: Colors.light_yellow }]} />
    </View>
)

export const FooterComponent = ({ onPress }) => (
    <View style={{ marginTop: '8%', marginBottom: '4%' }}>
        <SingleButton
            name={'MAKE PAYMENT'}
            onPress={onPress}
        />
    </View>
)
