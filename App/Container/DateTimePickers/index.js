import { View,Platform } from 'react-native'
import React, { memo } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';

const DateTimePickers = ({ value, mode, onConfirm, disabled }) => {
    return (
        <View>
            <DateTimePicker
                value={value}
                onChange={(date) => onConfirm(date)}
                // disabled={true}
                mode={mode}
            />
        </View>
    )
}

export default memo(DateTimePickers)