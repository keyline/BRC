import { View, Text } from 'react-native'
import React, { memo } from 'react'
import { styles } from './styles'

const EmptyComponent = ({emptyText}) => {
    return (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{emptyText}</Text>
        </View>
    )
}

export default memo(EmptyComponent)