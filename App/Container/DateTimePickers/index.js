import { View } from 'react-native'
import React, { memo } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';

const DateTimePickers = ({ value, mode, onConfirm }) => {
    return (
        <View>
            <DateTimePicker
                value={value}
                onChange={(date) => onConfirm(date)}
                mode={mode}
            />
        </View>
    )
}

export default memo(DateTimePickers)