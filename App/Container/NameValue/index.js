import { View, Text } from 'react-native'
import React, { memo } from 'react'
import { styles } from './styles'
import { Colors } from '../../Utils/Colors'

const NameValue = ({ name, nameColor, value, valueColor }) => {
    return (
        <View style={styles.container}>
            <Text style={[styles.nameText, { color: nameColor ? nameColor : Colors.black }]}>{name} :</Text>
            <Text style={[styles.valueText, { color: valueColor ? valueColor : Colors.text_color }]}>{value}</Text>
        </View>
    )
}

export default memo(NameValue)