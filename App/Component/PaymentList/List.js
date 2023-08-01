import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import NameValue from '../../Container/NameValue';

const List = ({ item, onPress }) => {
    return (
        <TouchableOpacity activeOpacity={0.5} onPress={() => onPress(item?.encoded_id)} style={styles.listContainer}>
            <NameValue name={'Sl No.'} value={item?.sl} />
            <NameValue name={'Payment Gateway'} value={item?.pg_name} />
            <NameValue name={'Pay Type'} value={item?.pay_type} />
            <NameValue name={'Bank Transaction ID'} value={item?.bill_trans_ref_no} />
            <NameValue name={'Amount'} value={item?.amount} />
            <NameValue name={'Transaction Date'} value={item?.transaction_date} />
        </TouchableOpacity>
    )
}

export default memo(List)