import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React, { useCallback, useContext, useRef, useState } from 'react'
import { styles } from './styles'
import Header from '../../Container/Header'
import AuthContext from '../../Services/Context'
import { ImagePath } from '../../Utils/ImagePath'
import DateInput from '../../Container/DateInput'
import DateTimePickers from '../../Container/DateTimePickers'
import { dateConvertYear } from '../../Services/CommonFunction'
import Toast from 'react-native-simple-toast';
import { useFocusEffect } from '@react-navigation/native'
import { KEY, SOURCE, SPORTBOOKING_TERMS } from '../../Services/constants'
import Apis from '../../Services/apis'
import Loader from '../../Container/Loader'
import CustomDropDown from '../../Container/CustomDropDown'
import TimeSlotList from './TimeSlotList'
import TermsCheckBox from '../../Container/TermsCheckBox'
import SingleButton from '../../Container/SingleButton'
import { CommonStyle } from '../../Utils/CommonStyles'

const SportsBooking = ({ navigation }) => {

    const Context = useContext(AuthContext);

    const [state, setState] = useState({
        loading: false,
        btnLoading: false,
        userdata: Context?.allData?.userdata,
        accessToken: Context?.allData?.accesstoken,
        data: null,
        date: '',
        dateErr: '',
        datePicker: false,
        sports: '',
        sportsErr: '',
        timeSlots: '',
        timeSlotsList: [],
        timeSlotsErr: '',
        sqMarkertimeSlotsList: [],
        sqMarkertimeSlots: '',
        sqMarkertimeSlotsErr: '',
        sqPlayertype: '',
        // sqPlayerList: [],
        sqPlayertypeErr: '',
        sqMember: '',
        sqMemberErr: '',
        baMember2: '',
        baMember2Err: '',
        baMember3: '',
        baMember3Err: '',
        baMember4: '',
        baMember4Err: '',
        checkBoxValue: false
    })
    const [sportList, setSportList] = useState([]);
    const [sportsPicker, setsportsPicker] = useState(false);
    const [sqPlayerList, setSqPlayerList] = useState([]);
    const [sqPlayerPicker, setSqPlayerPicker] = useState(false);
    const [sqMemberPicker, setsqMemberPicker] = useState(false);
    const [memberList, setMemberList] = useState([]);
    const [baMember2Picker, setbaMember2Picker] = useState(false);
    const [baMember3Picker, setbaMember3Picker] = useState(false);
    const [baMember4Picker, setbaMember4Picker] = useState(false);


    const scrollViewRef = useRef();
    const scrollToTop = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
        }
    };

    useFocusEffect(
        useCallback(() => {
            const unsubscribe = onGetSportList();
            return () => unsubscribe
        }, [navigation])
    )

    const onGetSportList = useCallback(async () => {
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
            const response = await Apis.sportsList(datas);
            if (__DEV__) {
                console.log('SportList', JSON.stringify(response))
            }
            if (response.status) {
                if (response?.data.length > 0) {
                    let updatedList = response.data.map((obj) => {
                        let { key, value } = obj;
                        return { label: value, value: key }
                    })
                    setSportList(updatedList);
                }
                // setState(prevState => ({
                //     ...prevState,
                //     loading: false
                // }));
                GetMemberList();
            } else {
                setSportList([]);
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
    })

    const GetMemberList = useCallback(async () => {
        try {
            let datas = {
                key: KEY,
                source: SOURCE,
                app_access_token: state.accessToken,
                search_term: ''
            }
            const response = await Apis.SportMemberList(datas);
            // if (__DEV__) {
            //     console.log('MemberList', JSON.stringify(response))
            // }
            if (response.status) {
                if (response?.data.length > 0) {
                    let updatedList = response.data.map((obj) => {
                        let { membership_no, name, ...rest } = obj;
                        return { label: name + ' [' + membership_no + ']', value: membership_no, ...rest }
                    })
                    setMemberList(updatedList);
                }
                setState(prevState => ({
                    ...prevState,
                    loading: false
                }));
            } else {
                setMemberList([]);
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
    })

    const openDatePicker = useCallback(async () => {
        setState(prevState => ({
            ...prevState,
            datePicker: true
        }))
    }, [state.datePicker])

    const onDateSelect = useCallback(async (value) => {
        let time = value?.nativeEvent?.timestamp;
        if (value.type == 'set') {
            setState(prevState => ({
                ...prevState,
                date: dateConvertYear(time),
                dateErr: '',
                datePicker: false,
                baMember2: '',
                baMember3: '',
                baMember4: '',
                timeSlots: ''
            }))
            GetTimeSlots(dateConvertYear(time))
        } else {
            setState(prevState => ({
                ...prevState,
                datePicker: false
            }))
        }
    })

    const onChangeSports = useCallback(async (value) => {
        setState(prevState => ({
            ...prevState,
            sports: value?.value,
            baMember2: '',
            baMember3: '',
            baMember4: '',
            timeSlots: ''
        }))
        GetTimeSlots(state.date, value?.value)
    })

    const GetTimeSlots = useCallback(async (date = state.date, sports = state.sports) => {
        if (sports && date == '') {
            setState(prevState => ({
                ...prevState,
                dateErr: 'error'
            }));
            return;
        } else if (date && sports) {
            try {
                setState(prevState => ({
                    ...prevState,
                    loading: true
                }))
                let datas = {
                    key: KEY,
                    source: SOURCE,
                    app_access_token: state.accessToken,
                    sports_id: sports,
                    booking_date: date
                }
                const response = await Apis.sportsTimeSlots(datas);
                if (__DEV__) {
                    console.log('SportsTimeSlot', JSON.stringify(response))
                }
                if (response.status) {
                    if (response?.data?.sports_id == "2") {
                        // setSqPlayerList(response?.data?.type);
                        if (response?.data?.type?.length > 0) {
                            let updatedList = response.data?.type.map((obj) => {
                                let { key, value } = obj;
                                return { label: value, value: key }
                            })
                            setSqPlayerList(updatedList);
                        } else {
                            setSqPlayerList([]);
                        }
                        setState(prevState => ({
                            ...prevState,
                            timeSlotsList: response?.data?.timeslots_data,
                            sqPlayertype: '',
                            sqPlayertypeErr: '',
                            loading: false
                        }));
                    } else {
                        setSqPlayerList([]);
                        setState(prevState => ({
                            ...prevState,
                            timeSlotsList: response?.data?.timeslots_data,
                            sqPlayertype: '',
                            sqPlayertypeErr: '',
                            loading: false
                        }));
                    }
                } else {
                    setSqPlayerList([]);
                    setState(prevState => ({
                        ...prevState,
                        timeSlotsList: [],
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
        }
    })

    const onChangeMember2 = useCallback(async (value) => {
        setState(prevState => ({
            ...prevState,
            baMember2: value?.value,
            baMember2Err: ''
        }))
    }, [state.baMember2])

    const onChangeMember3 = useCallback(async (value) => {
        setState(prevState => ({
            ...prevState,
            baMember3: value?.value,
            baMember3Err: ''
        }))
    }, [state.baMember3])

    const onChangeMember4 = useCallback(async (value) => {
        setState(prevState => ({
            ...prevState,
            baMember4: value?.value,
            baMember4Err: ''
        }))
    }, [state.baMember4])

    const onTimeSlotSelect = useCallback(async (item) => {
        setState(prevState => ({
            ...prevState,
            timeSlots: item,
            timeSlotsErr: ''
        }))
    })

    const onChangeCheckbox = useCallback(() => {
        setState(prevState => ({
            ...prevState,
            checkBoxValue: !state.checkBoxValue
        }))
    }, [state.checkBoxValue])

    const onChangePlayerType = useCallback(async (value) => {
        setState(prevState => ({
            ...prevState,
            sqPlayertype: value?.value,
            sqPlayertypeErr: '',
            sqMember: '',
            sqMemberErr: '',
            sqMarkertimeSlots: '',
            timeSlots: ''
        }))
        if (value?.value == "4") {
            onGetSqMarkerTimeSlot(value?.value);
        }
    })

    const onChangesqMember = useCallback(async (value) => {
        setState(prevState => ({
            ...prevState,
            sqMember: value?.value,
            sqMemberErr: '',
        }))
    })

    const onGetSqMarkerTimeSlot = useCallback(async (type) => {
        try {
            setState(prevState => ({
                ...prevState,
                loading: true,
                sqMarkertimeSlotsList: []
            }))
            let datas = {
                key: KEY,
                source: SOURCE,
                app_access_token: state.accessToken,
                sports_id: state.sports,
                booking_date: state.date,
                type: type,
                member: state.userdata?.membership_no
            }
            const response = await Apis.sportsMarkerTimeSlots(datas);
            if (__DEV__) {
                console.log('MarkerTimeSlots', JSON.stringify(response))
            }
            if (response.status) {
                setState(prevState => ({
                    ...prevState,
                    sqMarkertimeSlotsList: response?.data?.timeslots_data,
                    loading: false
                }))
            } else {
                setState(prevState => ({
                    ...prevState,
                    loading: false
                }))
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
    })

    const onChangeSqTimeSlot = useCallback(async (item) => {
        setState(prevState => ({
            ...prevState,
            sqMarkertimeSlots: item,
            timeSlotsErr: ''
        }))
    })

    const getMemberArray = useCallback(async () => {
        if (state.sports == '1') {
            return [state.userdata?.membership_no, state.baMember2, state.baMember3, state.baMember4]
        } else if (state.sports == "2" && state.sqPlayertype == "2") {
            return [state.userdata?.membership_no, state.sqMember]
        } else {
            return [state.userdata?.membership_no]
        }
    })

    const onBookNow = useCallback(async () => {
        if (state.date == '') {
            setState(prevState => ({
                ...prevState,
                dateErr: 'error'
            }));
            return;
        } else if (state.sports == '') {
            setState(prevState => ({
                ...prevState,
                sportsErr: 'error'
            }))
            return;
        } else if (state.sports == "1" && state.baMember2 == '') {
            setState(prevState => ({
                ...prevState,
                baMember2Err: 'error'
            }))
            return;
        } else if (state.sports == "1" && state.baMember3 == '') {
            setState(prevState => ({
                ...prevState,
                baMember3Err: 'error'
            }))
            return;
        } else if (state.sports == "1" && state.baMember4 == '') {
            setState(prevState => ({
                ...prevState,
                baMember4Err: 'error'
            }))
            return;
        } else if (state.sports == "1" && state.timeSlots == '') {
            setState(prevState => ({
                ...prevState,
                timeSlotsErr: 'error'
            }));
            return;
        } else if (state.sports == "2" && state.sqPlayertype == '') {
            setState(prevState => ({
                ...prevState,
                sqPlayertypeErr: 'error'
            }));
            return;
        } else if (state.sports == "2" && state.sqPlayertype == "0") {
            setState(prevState => ({
                ...prevState,
                sqPlayertypeErr: 'error'
            }));
            return;
        } else if (state.sports == "2" && state.sqPlayertype == "2" && state.sqMember == '') {
            setState(prevState => ({
                ...prevState,
                sqMemberErr: 'error'
            }));
            return;
        } else if (state.sports == "2" && state.sqPlayertype != "4" && state.timeSlots == '') {
            setState(prevState => ({
                ...prevState,
                timeSlotsErr: 'error'
            }));
            return;
        } else if (state.sports == "2" && state.sqPlayertype == "4" && state.sqMarkertimeSlots == '') {
            setState(prevState => ({
                ...prevState,
                timeSlotsErr: 'error'
            }));
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
                    sports_id: state.sports,
                    booking_date: state.date,
                    type: (state.sports == '2') ? state.sqPlayertype : '',
                    sports_timeslot_id: (state.sports == "2" && state.sqPlayertype == "4") ? state.sqMarkertimeSlots?.id : state.timeSlots?.id,
                    member: await getMemberArray()
                }
                const response = await Apis.sportBook(datas);
                if (__DEV__) {
                    console.log('SportBooking', JSON.stringify(response))
                }
                setState(prevState => ({
                    ...prevState,
                    btnLoading: false
                }))
                Toast.show(response.message, Toast.LONG);
                if (response.status) {
                    if (state.sports == '2') {
                        navigation.navigate('OtpVerify', { id: response?.data?.booking_id, otp: response?.data?.otp })
                    } else {
                        navigation.navigate('MyProfile');
                    }
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
                            <Text style={styles.headingtext}>SPORTS BOOKING</Text>
                            <View style={styles.bodyContent}>
                                <Image source={ImagePath.logo} style={styles.logo} />
                                <View style={styles.mainContent} />
                                <DateInput
                                    // name={'Date'}
                                    placeholder={'Select Date'}
                                    onPress={openDatePicker}
                                    value={state.date}
                                    error={state.dateErr ? 'Select Date' : ''}
                                />
                                <View style={{ marginVertical: '5%', paddingHorizontal: '1.5%', zIndex: 1 }}>
                                    <CustomDropDown
                                        // name={'Dining Space'}
                                        placeholder={'Select Sports'}
                                        items={sportList}
                                        value={state.sports}
                                        open={sportsPicker}
                                        dropDownDirection={'AUTO'}
                                        setItems={setSportList}
                                        setOpen={setsportsPicker}
                                        onChangeValue={onChangeSports}
                                        error={state.sportsErr ? 'Select Sports' : ''}
                                    />
                                </View>
                                <View style={styles.border} />
                                {(state.sports == "1" && memberList) && (
                                    <View>
                                        <Text style={styles.subheadingText}>Member List</Text>
                                        <View style={{ marginTop: '2%', paddingHorizontal: '1.5%' }}>
                                            <CustomDropDown
                                                // name={'Dining Space'}
                                                placeholder={'Select Member 2'}
                                                items={memberList}
                                                value={state.baMember2}
                                                open={baMember2Picker}
                                                dropDownDirection={'AUTO'}
                                                setItems={setMemberList}
                                                setOpen={setbaMember2Picker}
                                                onChangeValue={onChangeMember2}
                                                searchable={true}
                                                listMode={'MODAL'}
                                                searchPlaceholder={'Select Member 2'}
                                                error={state.baMember2Err ? 'Select Member 2' : ''}
                                            />
                                        </View>
                                        <View style={{ marginTop: '5%', paddingHorizontal: '1.5%' }}>
                                            <CustomDropDown
                                                // name={'Dining Space'}
                                                placeholder={'Select Member 3'}
                                                items={memberList}
                                                value={state.baMember3}
                                                open={baMember3Picker}
                                                dropDownDirection={'AUTO'}
                                                setItems={setMemberList}
                                                setOpen={setbaMember3Picker}
                                                onChangeValue={onChangeMember3}
                                                searchable={true}
                                                listMode={'MODAL'}
                                                searchPlaceholder={'Select Member 3'}
                                                error={state.baMember3Err ? 'Select Member 3' : ''}
                                            />
                                        </View>
                                        <View style={{ marginTop: '5%', paddingHorizontal: '1.5%' }}>
                                            <CustomDropDown
                                                // name={'Dining Space'}
                                                placeholder={'Select Member 4'}
                                                items={memberList}
                                                value={state.baMember4}
                                                open={baMember4Picker}
                                                dropDownDirection={'AUTO'}
                                                setItems={setMemberList}
                                                setOpen={setbaMember4Picker}
                                                onChangeValue={onChangeMember4}
                                                searchable={true}
                                                listMode={'MODAL'}
                                                searchPlaceholder={'Select Member 4'}
                                                error={state.baMember4Err ? 'Select Member 4' : ''}
                                            />
                                        </View>
                                    </View>
                                )}
                                {(state.sports == "2" && sqPlayerList) && (
                                    <View>
                                        <Text style={styles.subheadingText}>Select Player Type</Text>
                                        <View style={{ marginTop: '2%', marginBottom: '2%', paddingHorizontal: '1.5%' }}>
                                            <CustomDropDown
                                                placeholder={'Select Player Type'}
                                                items={sqPlayerList}
                                                value={state.sqPlayertype}
                                                open={sqPlayerPicker}
                                                dropDownDirection={'AUTO'}
                                                setItems={setSqPlayerList}
                                                setOpen={setSqPlayerPicker}
                                                onChangeValue={onChangePlayerType}
                                                error={state.sqPlayertypeErr ? 'Select Player Type' : ''}
                                            />
                                        </View>
                                        {(state.sqPlayertype == "2" && memberList) && (
                                            <View style={{ marginTop: '5%', paddingHorizontal: '1.5%', zIndex: 1 }}>
                                                <CustomDropDown
                                                    placeholder={'Select Opponent Member'}
                                                    items={memberList}
                                                    value={state.sqMember}
                                                    open={sqMemberPicker}
                                                    dropDownDirection={'AUTO'}
                                                    setItems={setMemberList}
                                                    setOpen={setsqMemberPicker}
                                                    onChangeValue={onChangesqMember}
                                                    searchable={true}
                                                    listMode={'MODAL'}
                                                    searchPlaceholder={'Select Opponent Member'}
                                                    error={state.sqMemberErr ? 'Select Opponent Member' : ''}
                                                />
                                            </View>
                                        )}
                                    </View>
                                )}
                                {(state.timeSlotsList && state.timeSlotsList.length > 0) && (
                                    <>
                                        <View style={styles.border} />
                                        <Text style={styles.subheadingText}>Select Timeslot</Text>
                                        {(state.sports == '2' && state.sqPlayertype == "4") ?
                                            <View style={styles.tableListContainer}>
                                                {state.sqMarkertimeSlotsList.map((item, key) => (
                                                    <TimeSlotList
                                                        item={item}
                                                        key={key}
                                                        onPress={onChangeSqTimeSlot}
                                                        SelectedItem={state.sqMarkertimeSlots}
                                                    />
                                                ))}
                                            </View>
                                            :
                                            <View style={styles.tableListContainer}>
                                                {state.timeSlotsList.map((item, key) => (
                                                    <TimeSlotList
                                                        item={item}
                                                        key={key}
                                                        onPress={onTimeSlotSelect}
                                                        SelectedItem={state.timeSlots}
                                                    />
                                                ))}
                                            </View>
                                        }
                                        {state.timeSlotsErr && (
                                            <Text style={[CommonStyle.errName, { alignSelf: 'center', marginVertical: '2%' }]}>Select Timeslot</Text>
                                        )}
                                        <TermsCheckBox
                                            value={state.checkBoxValue}
                                            onValueChange={onChangeCheckbox}
                                            TermsLink={SPORTBOOKING_TERMS}
                                        />
                                        <View style={styles.btncontainer}>
                                            <SingleButton
                                                name={'BOOK NOW'}
                                                onPress={onBookNow}
                                                loader={state.btnLoading}
                                                width={'85%'}
                                            />
                                        </View>
                                    </>
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

export default SportsBooking