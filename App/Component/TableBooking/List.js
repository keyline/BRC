import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { memo } from 'react'
import { styles } from './styles'
import { ImagePath } from '../../Utils/ImagePath'

const List = ({ item, onPress, SelectedItem }) => {
    return (
        <TouchableOpacity activeOpacity={0.5} onPress={() => onPress(item)} style={SelectedItem == item ? styles.listContainerSelected : styles.listContainer}>
            <Image source={ImagePath.dining} style={SelectedItem == item ? styles.diningLogoSelected : styles.diningLogo} />
            <View style={styles.listTextcontent}>
                <Text style={SelectedItem == item ? styles.listHeadingtxtSelected : styles.listHeadingtxt}>{item?.timeslot_name}</Text>
                <Text style={SelectedItem == item ? styles.listDesctxtSelected : styles.listDesctxt}>{item?.time_period}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default memo(List)