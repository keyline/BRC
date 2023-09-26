import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { memo } from 'react'
import { ImagePath } from '../../Utils/ImagePath'
import { styles } from './styles'
import { Colors } from '../../Utils/Colors'

const TimeSlotList = ({ item, onPress, SelectedItem }) => {
    return (
        <>
            {item?.available == "not_available" ?
                <View activeOpacity={0.5} style={styles.tableListContentNotaval}>
                    <Image source={ImagePath.sports} style={styles.diningLogoSelected} />
                    <Text numberOfLines={1} style={styles.listHeadingtxtSelected}>{item?.time_period}</Text>
                </View>
                :
                <TouchableOpacity activeOpacity={0.5} onPress={() => onPress(item)} style={item == SelectedItem ? styles.tableListContentSelected : styles.tableListContent}>
                    <Image source={ImagePath.sports} style={item == SelectedItem ? styles.diningLogoSelected : styles.diningLogo} />
                    <Text numberOfLines={1} style={item == SelectedItem ? styles.listHeadingtxtSelected : styles.listHeadingtxt}>{item?.time_period}</Text>
                </TouchableOpacity>
            }
        </>
    )
}

export default memo(TimeSlotList)