import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { memo } from 'react'
import { styles } from './styles'
import { Colors } from '../../Utils/Colors'

const SingleButton = ({ name, onPress, width, loader }) => {
    return (
        <>
            {loader ?
                <View style={[styles.container, { width: width ? width : '100%' }]}>
                    <ActivityIndicator color={Colors.white} animating={loader} size={'small'} />
                </View>
                :
                <TouchableOpacity activeOpacity={0.5} onPress={onPress} style={[styles.container, { width: width ? width : '100%' }]}>
                    <Text style={styles.text}>{name}</Text>
                </TouchableOpacity>
            }
        </>
    )
}

export default SingleButton

