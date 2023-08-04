import { View, Text, FlatList, Alert } from 'react-native'
import React, { useState, useCallback, useContext } from 'react'
import { styles } from './styles'
import { useFocusEffect } from '@react-navigation/native'
import Toast from 'react-native-simple-toast';
import { KEY, SOURCE } from '../../Services/constants';
import AuthContext from '../../Services/Context';
import EmptyComponent from '../../Container/EmptyComponent';
import Apis from '../../Services/apis';
import Loader from '../../Container/Loader';
import NameValue from '../../Container/NameValue';
import LoaderNew from '../../Container/LoaderNew';
import LoaderFullScreen from '../../Container/LoaderFullScreen';

const TableList = ({ navigation }) => {

    const Context = useContext(AuthContext);

    const [state, setState] = useState({
        loading: false,
        loadingNew: false,
        data: [],
        accessToken: Context?.allData?.accesstoken
    })

    useFocusEffect(
        useCallback(() => {
            const unsubscribe = onGetdata();
            return () => unsubscribe
        }, [navigation])
    )

    const onGetdata = useCallback(async () => {
        try {
            setState(prevState => ({
                ...prevState,
                loading: true
            }))
            let datas = {
                key: KEY,
                source: SOURCE,
                app_access_token: state.accessToken
            }
            const response = await Apis.tableBookingList(datas);
            if (__DEV__) {
                console.log('TableBookingList', JSON.stringify(response))
            }
            if (response.status) {
                setState(prevState => ({
                    ...prevState,
                    data: response.data,
                    loading: false
                }))
            } else {
                setState(prevState => ({
                    ...prevState,
                    data: [],
                    loading: false
                }))
                Toast.show(response.message, Toast.LONG)
            }
        } catch (error) {
            setState(prevState => ({
                ...prevState,
                loading: false
            }))
            if (__DEV__) {
                console.log(error)
            }
            Toast.show('Something Went Wrong', Toast.LONG);
        }
    })

    const onCancelAlert = useCallback((item) => {
        Alert.alert(
            'Cancel !!',
            'Are You Really Want to Cancel this Booking?', [{
                text: 'No',
                onPress: () => null,
                style: 'cancel'
            }, {
                text: 'Yes',
                onPress: () => onCancel(item)
            },], {
            cancelable: false
        }
        )
    })
    const onCancel = useCallback(async (item) => {
        try {
            setState(prevState => ({
                ...prevState,
                loadingNew: true
            }))
            let datas = {
                key: KEY,
                source: SOURCE,
                app_access_token: state.accessToken,
                booking_id: item?.booking_id
            }
            const response = await Apis.tableBooking_Cancel(datas);
            if (__DEV__) {
                console.log('TableBookingCancel', JSON.stringify(response))
            }
            if (response.status) {
                let myArr = state.data
                let itemindex = myArr.findIndex(obj => obj.booking_id == item.booking_id)
                myArr[itemindex].status = "3"
                setState(prevState => ({
                    ...prevState,
                    data: myArr,
                    loadingNew: false
                }))
            } else {
                setState(prevState => ({
                    ...prevState,
                    loadingNew: false
                }))
            }
            Toast.show(response.message, Toast.LONG)

        } catch (error) {
            setState(prevState => ({
                ...prevState,
                loadingNew: false
            }))
            if (__DEV__) {
                console.log(error)
            }
            Toast.show('Something Went Wrong', Toast.LONG);
        }
    })

    const Item = ({ item }) => (
        <View style={styles.listContent}>
            <NameValue name={'Sl No.'} value={item?.sl_no} />
            <NameValue name={'Time Slot'} value={item?.timeslot_name} />
            <NameValue name={'Dining name'} value={item?.dining_name} />
            <NameValue name={'No of Table'} value={item?.table_count} />
            <NameValue name={'Heads'} value={item?.heads_count} />
            <NameValue name={'Booking Date'} value={item?.booking_date} />
            <NameValue name={'Submitted Date'} value={item?.submited_date} />
            {/* <NameValue name={'Status'} value={item?.status == "2" ? "Confirmed" : "Cancelled"} /> */}
            <View style={styles.flex}>
                <Text style={[styles.nameText, { width: '50%' }]}>Status :</Text>
                {(item?.status == "2") ?
                    <Text style={[styles.nameText, { width: '50%', color: 'green' }]}>Confirmed</Text>
                    :
                    <Text style={[styles.nameText, { width: '50%', color: 'red' }]}>Cancelled</Text>
                }
            </View>
            {(item?.status == "2") && (
                <Text onPress={() => onCancelAlert(item)} style={styles.cancelText}>Cancel Booking</Text>
            )}
        </View>
    )

    return (
        <View style={styles.listContainer}>
            {state.loading ? <Loader /> :
                <FlatList
                    data={state.data}
                    keyExtractor={(item, index) => item.booking_id}
                    renderItem={Item}
                    ListEmptyComponent={<EmptyComponent emptyText={'No Table Booking Found !!'} />}
                    showsVerticalScrollIndicator={false}
                />
            }
            {state.loadingNew && (
                <LoaderFullScreen />
            )}
        </View>
    )
}

export default TableList