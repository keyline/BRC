import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { memo } from 'react'
import { styles } from './styles'
import { ImagePath } from '../../Utils/ImagePath'
import { CommonStyle } from '../../Utils/CommonStyles'

const List = ({ item, onPress }) => {
    return (
        <View style={{ marginBottom: '5%' }}>
            <View style={[styles.list_container, { marginHorizontal: '5%' }]}>
                <Text style={styles.list_bodytext}>{item.sl_no}.</Text>
                <Text style={styles.list_bodytext}>{item.month}</Text>
                <TouchableOpacity onPress={() => onPress(item?.link)}>
                    <Image source={ImagePath.eye} style={styles.eyeicon} />
                </TouchableOpacity>
            </View>
            <View style={[CommonStyle.border, { width: '100%' }]} />
        </View>
    )
}

export default memo(List)