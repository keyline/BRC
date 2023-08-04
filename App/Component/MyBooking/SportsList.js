import { View, Text, Alert, FlatList } from 'react-native'
import React, { useState, useCallback, useContext } from 'react'
import AuthContext from '../../Services/Context';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import { KEY, SOURCE } from '../../Services/constants';
import Apis from '../../Services/apis';
import { styles } from './styles';
import NameValue from '../../Container/NameValue';
import Loader from '../../Container/Loader';
import LoaderFullScreen from '../../Container/LoaderFullScreen';
import EmptyComponent from '../../Container/EmptyComponent';

const SportsList = ({ navigation }) => {
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
            const response = await Apis.sportsBookingList(datas);
            if (__DEV__) {
                console.log('SportsBookingList', JSON.stringify(response))
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
            const response = await Apis.sportsBooking_Cancel(datas);
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
            <NameValue name={'Sports name'} value={item?.sports_name} />
            <View style={styles.playerContainer}>
                <Text style={styles.nameText}>Players Detail :</Text>
                <View style={styles.playerRightContent}>
                    <View style={styles.playerList}>
                        <Text style={styles.nameText}>Member</Text>
                        <Text style={styles.nameText}>Amount</Text>
                    </View>
                    {item.member_details.map((items, key) => (
                        <View key={key} style={styles.playerList}>
                            <Text style={styles.valueText}>{items?.Name}</Text>
                            <Text style={styles.valueText}>₹ {items?.amount}</Text>
                        </View>
                    ))}
                </View>
            </View>
            <NameValue name={'Booking Date'} value={item?.booking_date} />
            <NameValue name={'Submitted Date'} value={item?.submited_date} />
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
                    ListEmptyComponent={<EmptyComponent emptyText={'No Sports Booking Found !!'} />}
                    showsVerticalScrollIndicator={false}
                />
            }
            {state.loadingNew && (
                <LoaderFullScreen />
            )}
        </View>
    )
}

export default SportsList