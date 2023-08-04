import { StyleSheet, View, ActivityIndicator } from 'react-native'
import React, { memo } from 'react'
import { Colors } from '../../Utils/Colors'

const LoaderFullScreen = ({ color }) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator animating={true} color={color ? color : Colors.dark_yellow} size={'large'} />
        </View>
    )
}

export default memo(LoaderFullScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        // height:HEIGHT,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    }
})