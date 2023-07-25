import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { Colors } from '../../Utils/Colors'

const Loader = ({ color }) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <ActivityIndicator animating={true} color={color ? color : Colors.dark_yellow} size={'large'} />
            </View>
        </View>
    )
}

export default Loader