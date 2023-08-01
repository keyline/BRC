import { View, Text } from 'react-native'
import React, { memo } from 'react'
import { styles } from './styles'

const NameValue = ({ name, value }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.nameText}>{name} :</Text>
            <Text style={styles.valueText}>{value}</Text>
        </View>
    )
}

export default memo(NameValue)