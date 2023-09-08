import { View, Text, SafeAreaView, ScrollView, Image, Linking } from 'react-native'
import React, { useContext, useState, useCallback, useRef } from 'react'
import Header from '../../Container/Header'
import { styles } from './styles'
import AuthContext from '../../Services/Context'
import Loader from '../../Container/Loader'
import DateInput from '../../Container/DateInput'
import DateTimePickers from '../../Container/DateTimePickers'
import { dateConvert, dateConvertYear } from '../../Services/CommonFunction'
import { ImagePath } from '../../Utils/ImagePath'
import { KEY, SOURCE, TABLEBOOKING_TERMS } from '../../Services/constants'
import Apis from '../../Services/apis'
import Toast from 'react-native-simple-toast';
import CustomDropDown from '../../Container/CustomDropDown'
import List from './List'
import { CommonStyle } from '../../Utils/CommonStyles'
import SingleButton from '../../Container/SingleButton'
import TableList from './TableList'
import CheckBox from '@react-native-community/checkbox'

const TableBooking = ({ navigation }) => {

    const Context = useContext(AuthContext);

    const [state, setState] = useState({
        loading: false,
        btnLoading: false,
        accessToken: Context?.allData?.accesstoken,
        data: null,
        date: '',
        dateErr: '',
        datePicker: false,
        diningSpace: '',
        diningSpaceErr: '',
        timeSlots: '',
        timeSlotsList: [],
        timeSlotsErr: '',
        table: [],
        tableList: [],
        tableErr: '',
        checkBoxValue: false
    })

    const setInitialState = useCallback(async () => {
        setState(prevState => ({
            ...prevState,
            loading: false,
            btnLoading: false,
            accessToken: Context?.allData?.accesstoken,
            data: null,
            date: '',
            dateErr: '',
            datePicker: false,
            diningSpace: '',
            diningSpaceErr: '',
            timeSlots: '',
            timeSlotsList: [],
            timeSlotsErr: '',
            table: [],
            tableList: [],
            tableErr: '',
            checkBoxValue: false
        }))
    })

    const [diningpacePicker, setdiningpacePicker] = useState(false);
    const [diningSpaceList, setdiningSpaceList] = useState([]);
    const scrollViewRef = useRef();

    const scrollToTop = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
        }
    };

    const openDatePicker = useCallback(async () => {
        setState(prevState => ({
            ...prevState,
            datePicker: true
        }))
    }, [state.datePicker])

    const onDateSelect = useCallback(async (value) => {
        // console.log('dateSelect', value)
        let time = value?.nativeEvent?.timestamp;
        if (value.type == 'set') {
            setState(prevState => ({
                ...prevState,
                loading: true,
                date: dateConvertYear(time),
                dateErr: '',
                datePicker: false,
                diningSpace: '',
                diningSpaceErr: '',
                timeSlotsList: [],
                timeSlots: '',
                tableList: [],
                table: [],
                tableErr: '',
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
            timeSlotsErr: '',
            tableList: [],
            table: [],
            tableErr: '',
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
                    timeSlots: '',
                    tableList: [],
                    table: [],
                    tableErr: '',
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

    const onSelectSlot = useCallback(async (item) => {
        if (state.timeSlots != item) {
            setState(prevState => ({
                ...prevState,
                timeSlots: item,
                timeSlotsErr: '',
                tableList: [],
                table: [],
                tableErr: ''
            }))
        }
    }, [state.timeSlots])

    const checkAvailibility = useCallback(async () => {
        if (state.data == '') {
            setState(prevState => ({
                ...prevState,
                dateErr: 'error',
            }));
            return;
        } else if (state.diningSpace == '') {
            setState(prevState => ({
                ...prevState,
                diningSpaceErr: 'error'
            }))
            return;
        } else if (state.timeSlots == '') {
            setState(prevState => ({
                ...prevState,
                timeSlotsErr: 'error'
            }))
            return;
        } else {
            try {
                setState(prevState => ({
                    ...prevState,
                    btnLoading: true
                }))
                let datas = {
                    key: KEY,
                    source: SOURCE,
                    app_access_token: state.accessToken,
                    dining_id: state.diningSpace,
                    booking_date: state?.date,
                    timeslot_id: state?.timeSlots?.id,
                    dining_type: '3',
                    type: '1'
                }
                const response = await Apis.get_table(datas);
                if (__DEV__) {
                    console.log('TableListResponse', JSON.stringify(response))
                }
                if (response.status) {
                    let length = response?.data?.dining_table_data.length
                    if (length > 0) {
                        let arr = response?.data?.dining_table_data
                        for (let i = 0; i < length; i++) {
                            arr[i].isSelected = false
                        }
                        setState(prevState => ({
                            ...prevState,
                            tableList: arr,
                            tableErr: '',
                            btnLoading: false
                        }))
                    } else {
                        setState(prevState => ({
                            ...prevState,
                            tableList: [],
                            btnLoading: false
                        }))
                    }
                } else {
                    setState(prevState => ({
                        ...prevState,
                        tableList: [],
                        btnLoading: false
                    }));
                    Toast.show(response.message, Toast.LONG);
                }
            } catch (error) {
                setState(prevState => ({
                    ...prevState,
                    btnLoading: false
                }))
                if (__DEV__) {
                    console.log(error)
                }
                Toast.show('Something Went Wrong', Toast.LONG);
            }
        }
    })

    const onTableSelect = useCallback(async (item) => {
        var myArr = state.tableList
        if (item.table_id) {
            let tableIndex = myArr.findIndex(obj => obj.table_id == item.table_id)
            if (tableIndex != -1) {
                let value = myArr[tableIndex].isSelected
                myArr[tableIndex].isSelected = !value
                setState(prevState => ({
                    ...prevState,
                    tableList: myArr,
                    tableErr: ''
                }))
            }
        }
    })

    const selectedTableLength = useCallback(async () => {
        let myArr = state.tableList
        if (myArr.length > 0) {
            let filterArray = myArr.filter(obj => obj.isSelected == true);
            return filterArray.length
        } else {
            return 0
        }
    })

    const onChangeCheckbox = useCallback(() => {
        setState(prevState => ({
            ...prevState,
            checkBoxValue: !state.checkBoxValue
        }))
    }, [state.checkBoxValue])

    const onTermsCondition = useCallback(async () => {
        try {
            await Linking.openURL(TABLEBOOKING_TERMS);
        } catch (error) {
            if (__DEV__) {
                console.log(error)
            }
            Toast.show('Something Went Wrong', Toast.LONG)
        }
    })

    const onGetSelectedTable = useCallback(async () => {
        let myArr = state.tableList
        if (myArr.length > 0) {
            let filterArray = myArr.filter(obj => obj.isSelected == true);
            let tableIdArray = filterArray.map(obj => obj.table_id)
            console.log('tableIdArray', tableIdArray);
            return tableIdArray;
        } else {
            return [];
        }
    })

    const onBookNow = useCallback(async () => {
        let lngth = await selectedTableLength()
        if (lngth < 1) {
            setState(prevState => ({
                ...prevState,
                tableErr: 'error'
            }))
            return;
        } else if (state.checkBoxValue == false) {
            Toast.show('Please Agree to the term and conditions', Toast.LONG);
            return;
        } else {
            try {
                setState(prevState => ({
                    ...prevState,
                    btnLoading: true
                }))
                let datas = {
                    key: KEY,
                    source: SOURCE,
                    app_access_token: state.accessToken,
                    dining_areas_id: state.diningSpace,
                    booking_date: state?.date,
                    timeslot_id: state?.timeSlots?.id,
                    dining_type: '3',
                    type: '1',
                    dining_tables_id: await onGetSelectedTable()
                }
                // console.log('BookNowPostBody', JSON.stringify(datas))
                const response = await Apis.book_table(datas);
                if (__DEV__) {
                    console.log('BookNowResponse', JSON.stringify(response))
                }
                // setState(prevState => ({
                //     ...prevState,
                //     btnLoading: false
                // }))
                Toast.show(response.message, Toast.LONG);
                if (response.status) {
                    await setInitialState();
                    scrollToTop();
                    navigation.navigate('MyProfile');
                }
            } catch (error) {
                setState(prevState => ({
                    ...prevState,
                    btnLoading: false
                }))
                if (__DEV__) {
                    console.log(error)
                }
                Toast.show('Something Went Wrong', Toast.LONG);
            }
        }
    })

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} />
            <View style={styles.content}>
                {state.loading ? <Loader /> :
                    <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
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
                                    error={state.dateErr ? 'Select Date' : ''}
                                />
                                <View style={{ marginVertical: '5%', paddingHorizontal: '1.5%' }}>
                                    <CustomDropDown
                                        // name={'Dining Space'}
                                        placeholder={'Select Dining Space'}
                                        items={diningSpaceList}
                                        value={state.diningSpace}
                                        open={diningpacePicker}
                                        dropDownDirection={'AUTO'}
                                        setItems={setdiningSpaceList}
                                        setOpen={setdiningpacePicker}
                                        onChangeValue={onChangeDiningSpace}
                                        error={state.diningSpaceErr ? 'Select Dining Space' : ''}
                                    />
                                </View>
                                <View style={styles.border} />
                                {state?.timeSlotsList.length > 0 && (
                                    <View>
                                        <Text style={styles.subheadingText}>Select Timeslot</Text>
                                        {state.timeSlotsList.map((item, key) => (
                                            <List
                                                item={item}
                                                key={item.id}
                                                SelectedItem={state.timeSlots}
                                                onPress={onSelectSlot}
                                            />
                                        ))}
                                        {state.timeSlotsErr && (
                                            <Text style={[CommonStyle.errName, { alignSelf: 'center' }]}>Select Timeslot</Text>
                                        )}
                                        {state.tableList.length <= 0 ?
                                            (
                                                <View style={styles.btncontainer}>
                                                    <SingleButton
                                                        name={'CHECK AVAILIBILITY'}
                                                        onPress={checkAvailibility}
                                                        loader={state.btnLoading}
                                                        width={'85%'}
                                                    />
                                                </View>
                                            )
                                            :
                                            (
                                                <View>
                                                    <View style={styles.border} />
                                                    {state.tableList.length > 0 && (
                                                        <View>
                                                            <Text style={styles.subheadingText}>Select Table</Text>
                                                            <View style={styles.tableListContainer}>
                                                                {state.tableList.map((item, key) => (
                                                                    <TableList
                                                                        item={item}
                                                                        key={key}
                                                                        onPress={onTableSelect}
                                                                    />
                                                                ))}
                                                            </View>
                                                            {state.tableErr && (
                                                                <Text style={[CommonStyle.errName, { alignSelf: 'center', marginVertical: '2%' }]}>Select Table</Text>
                                                            )}
                                                            <View style={styles.checkContainer}>
                                                                <CheckBox
                                                                    value={state.checkBoxValue}
                                                                    disabled={false}
                                                                    onValueChange={onChangeCheckbox}
                                                                />
                                                                <Text style={styles.aceptText}>I accept the <Text onPress={onTermsCondition} style={styles.termstext}>Terms and Conditions</Text></Text>
                                                            </View>
                                                            <View style={styles.btncontainer}>
                                                                <SingleButton
                                                                    name={'BOOK NOW'}
                                                                    onPress={onBookNow}
                                                                    loader={state.btnLoading}
                                                                    width={'85%'}
                                                                />
                                                            </View>
                                                        </View>
                                                    )}
                                                </View>
                                            )
                                        }
                                    </View>
                                )}
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
                // disabled={isDateDisabled}
                />
            )}
        </SafeAreaView>
    )
}

export default TableBooking