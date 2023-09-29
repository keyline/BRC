import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { memo } from 'react'
import { styles } from './styles'
import { ImagePath } from '../../Utils/ImagePath'

const TableList = ({ item, onPress }) => {
    return (
        <>
            {(item?.available == 'not_available') ?
                <View activeOpacity={0.5} style={styles.tableListContentOff}>
                    <Image source={ImagePath.table_white} style={styles.diningLogoOff} />
                    <Text style={styles.listHeadingtxtSelected}>{item?.table_seater}</Text>
                </View>
                :
                <TouchableOpacity activeOpacity={0.5} onPress={() => onPress(item)} style={item?.isSelected ? styles.tableListContentSelected : styles.tableListContent}>
                    <Image source={ImagePath.table} style={item?.isSelected ? styles.diningLogoSelected : styles.diningLogo} />
                    <Text style={item?.isSelected ? styles.listHeadingtxtSelected : styles.listHeadingtxt}>{item?.table_seater}</Text>
                </TouchableOpacity>
            }
        </>
    )
}

export default memo(TableList)