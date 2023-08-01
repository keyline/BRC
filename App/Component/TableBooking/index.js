import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React, { useContext, useState, useCallback } from 'react'
import Header from '../../Container/Header'
import { styles } from './styles'
import AuthContext from '../../Services/Context'
import Loader from '../../Container/Loader'
import DateInput from '../../Container/DateInput'
import DateTimePickers from '../../Container/DateTimePickers'
import { dateConvert, dateConvertYear } from '../../Services/CommonFunction'
import { ImagePath } from '../../Utils/ImagePath'
import { KEY, SOURCE } from '../../Services/constants'
import Apis from '../../Services/apis'
import Toast from 'react-native-simple-toast';
import CustomDropDown from '../../Container/CustomDropDown'

const TableBooking = ({ navigation }) => {

    const Context = useContext(AuthContext);

    const [state, setState] = useState({
        loading: false,
        accessToken: Context?.allData?.accesstoken,
        data: null,
        date: '',
        dateErr: '',
        datePicker: false,
        diningSpace: '',
        diningSpaceErr: '',
        timeSlots: '',
        timeSlotsList: [],
        timeSlotsErr: ''

    })

    const [diningpacePicker, setdiningpacePicker] = useState(false);
    const [diningSpaceList, setdiningSpaceList] = useState([]);

    const openDatePicker = useCallback(async () => {
        setState(prevState => ({
            ...prevState,
            datePicker: true
        }))
    }, [state.datePicker])

    const onDateSelect = useCallback(async (value) => {
        console.log('dateSelect', value)
        let time = value?.nativeEvent?.timestamp;
        if (value.type == 'set') {
            setState(prevState => ({
                ...prevState,
                loading: true,
                date: dateConvertYear(time),
                datePicker: false,
                diningSpace: ''
            }))
            onGetDiningSpace(dateConvertYear(time))
        } else {
            setState(prevState => ({
                ...prevState,
                datePicker: false
            }))
        }
    }, [state.date])

    const onGetDiningSpace = useCallback(async (date) => {
        try {
            let datas = {
                key: KEY,
                source: SOURCE,
                app_access_token: state.accessToken,
                booking_date: date
            }
            const response = await Apis.get_tableDiningSpace(datas)
            if (__DEV__) {
                console.log('DiningSpaceResponse', JSON.stringify(response))
            }
            if (response.status) {
                let list = []
                let length = response?.data?.length
                if (length > 0) {
                    for (let i = 0; i < length; i++) {
                        let li = { label: response.data[i].value, value: response.data[i].key }
                        list.push(li)
                    }
                    setdiningSpaceList(list);
                } else {
                    setdiningSpaceList([]);
                }
                setState(prevState => ({
                    ...prevState,
                    loading: false
                }));
            } else {
                setdiningSpaceList([]);
                setState(prevState => ({
                    ...prevState,
                    loading: false
                }));
                Toast.show(response.message, Toast.LONG);
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
    }, [state.date])

    const onChangeDiningSpace = useCallback(async (value) => {
        setState(prevState => ({
            ...prevState,
            diningSpace: value?.value,
            diningSpaceErr: '',
            loading: true
        }))
        getTimeSlots(value?.value)
    })

    const getTimeSlots = useCallback(async (id) => {
        try {
            let datas = {
                key: KEY,
                source: SOURCE,
                app_access_token: state.accessToken,
                dining_id: id,
                booking_date: state?.date
            }
            const response = await Apis.get_tableTimeSlots(datas)
            if (__DEV__) {
                console.log('TimeSlotResponse', JSON.stringify(response))
            }
            if (response.status) {
                setState(prevState => ({
                    ...prevState,
                    timeSlotsList: response?.data,
                    loading: false
                }));
            } else {
                setState(prevState => ({
                    ...prevState,
                    loading: false
                }));
                Toast.show(response.message, Toast.LONG);
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
    }, [state.diningSpace])

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} />
            <View style={styles.content}>
                {state.loading ? <Loader /> :
                    <ScrollView>
                        <View style={styles.mainContent}>
                            <Text style={styles.headingtext}>TABLE BOOKING</Text>
                            <View style={styles.bodyContent}>
                                <Image source={ImagePath.logo} style={styles.logo} />
                                <Text style={styles.subheadingText}>Book your A-La-Carte Table in advance to avoid rush and long waitings at the Club</Text>
                                <DateInput
                                    // name={'Date'}
                                    placeholder={'Select Date'}
                                    onPress={openDatePicker}
                                    value={state.date}
                                    error={state.dateErr}
                                />
                                <View style={{ marginVertical: '5%' }}>
                                    <CustomDropDown
                                        // name={'DiningSpace'}
                                        placeholder={'Select DiningSpace'}
                                        items={diningSpaceList}
                                        value={state.diningSpace}
                                        open={diningpacePicker}
                                        dropDownDirection={'TOP'}
                                        setItems={setdiningSpaceList}
                                        setOpen={setdiningpacePicker}
                                        onChangeValue={onChangeDiningSpace}
                                        error={state.diningSpaceErr ? 'Select DiningSpace' : ''}
                                    />
                                </View>
                                <View style={styles.border} />
                                <Text style={styles.subheadingText}>Select Timeslot</Text>
                                <View>

                                </View>
                            </View>
                        </View>
                    </ScrollView>
                }
            </View>
            {state.datePicker && (
                <DateTimePickers
                    value={state?.date ? new Date(state?.date) : new Date()}
                    mode={'date'}
                    onConfirm={onDateSelect}
                />
            )}
        </SafeAreaView>
    )
}

export default TableBooking