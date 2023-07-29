import { View, Text, TouchableOpacity } from 'react-native'
import React, { memo } from 'react'
import { styles } from './styles'

const MultiPleButton = ({ firstName, secondName, onPressFirst, onPressSecond }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => onPressFirst()} activeOpacity={0.5} style={styles.firstbtncontent}>
                <Text style={styles.firstbtntext}>{firstName}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onPressSecond()} activeOpacity={0.5} style={styles.secondbtncontent}>
                <Text style={styles.secondbtntext}>{secondName}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default memo(MultiPleButton)