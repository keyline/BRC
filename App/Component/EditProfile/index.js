import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import AuthContext from '../../Services/Context';
import Apis from '../../Services/apis';
import Toast from 'react-native-simple-toast';
import { KEY, SOURCE } from '../../Services/constants';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../Container/Header';
import { styles } from './styles';
import Loader from '../../Container/Loader';
import { ImagePath } from '../../Utils/ImagePath';
import { CommonStyle } from '../../Utils/CommonStyles';
import InputText from '../../Container/InputText';
import DateInput from '../../Container/DateInput';
import DateTimePickers from '../../Container/DateTimePickers';
import { dateConvert, dateConvertNew, onISOString } from '../../Services/CommonFunction';
import MultiPleButton from '../../Container/MultiPleButton';
import { isValidEmail, isValidMobile } from '../../Services/Valid';
import CustomDropDown from '../../Container/CustomDropDown';

const EditProfile = ({ navigation }) => {

    const Context = useContext(AuthContext);

    const [state, setState] = useState({
        loading: false,
        userdata: null,
        accessToken: Context.allData.accesstoken,
        name: '',
        nameErr: '',
        email: '',
        emailErr: '',
        emailErrName: '',
        dob: '',
        dobErr: '',
        doj: '',
        dojErr: '',
        dow: '',
        dowErr: '',
        spousedob: '',
        spousedobErr: '',
        datepickerField: '',
        showDatePicker: false,
        resAddress: '',
        resAddressErr: '',
        ofcAddress: '',
        ofcAddressErr: '',
        phnNo: '',
        phnNoErr: '',
        phnNoErrName: '',
        mobileNo: '',
        mobileNoErr: '',
        mobileNoErrName: '',
        spousename: '',
        spousenameErr: '',
        profession: '',
        professionErr: '',
        officephone: '',
        officephoneErr: '',
        officephoneErrName: '',
        officefax: '',
        officefaxErr: '',
        gender: '',
        genderErr: '',
    })

    const [genderItem, setgenderItem] = useState([
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' }
    ])
    const [genderPicker, setgenderPicker] = useState(false);


    useFocusEffect(
        useCallback(() => {
            const unsubscribe = onGetData();
            return () => unsubscribe
        }, [navigation])
    )

    const onGetData = useCallback(async () => {
        try {
            setState(prevState => ({
                ...prevState,
                loading: true
            }))
            let datas = {
                key: KEY,
                source: SOURCE,
                app_access_token: state?.accessToken
            }
            const response = await Apis.get_profile(datas);
            if (__DEV__) {
                console.log('GetProfileData', JSON.stringify(response));
            }
            if (response.status) {
                let data = response?.data
                setState(prevState => ({
                    ...prevState,
                    userdata: data,
                    name: data?.Name,
                    email: data?.Email,
                    dob: onISOString(data?.Dob),
                    doj: onISOString(data?.Doj),
                    dow: onISOString(data?.Dow),
                    spousedob: onISOString(data?.spouse_date_of_birth),
                    resAddress: data?.Residence_Address,
                    ofcAddress: data?.office_address,
                    phnNo: data?.Phone,
                    mobileNo: data?.mobile,
                    spousename: data?.Spouse,
                    officephone: data?.office_phone,
                    officefax: data?.office_fax,
                    profession: data?.Profession,
                    gender: data?.Gender,
                    loading: false
                }))
            } else {
                setState(prevState => ({
                    ...prevState,
                    userdata: null,
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

    const onChngName = useCallback(async (val) => {
        setState(prevState => ({
            ...prevState,
            name: val,
            nameErr: ''
        }))
    }, [state.name])

    const onChngEmail = useCallback(async (val) => {
        setState(prevState => ({
            ...prevState,
            email: val,
            emailErr: '',
            emailErrName: ''
        }))
    }, [state.email])

    const onChangeResAddress = useCallback(async (val) => {
        setState(prevState => ({
            ...prevState,
            resAddress: val,
            resAddressErr: '',
        }))
    }, [state.resAddress])

    const onChangeOfcAddress = useCallback(async (val) => {
        setState(prevState => ({
            ...prevState,
            ofcAddress: val,
            ofcAddressErr: '',
        }))
    }, [state.ofcAddress])

    const onChangePhoneNo = useCallback(async (val) => {
        setState(prevState => ({
            ...prevState,
            phnNo: val,
            phnNoErr: '',
            phnNoErrName: ''
        }))
    }, [state.phnNo])

    const onChangeMobileNo = useCallback(async (val) => {
        setState(prevState => ({
            ...prevState,
            mobileNo: val,
            mobileNoErr: '',
            mobileNoErrName: ''
        }))
    }, [state.mobileNo])

    const onChangeProfession = useCallback(async (val) => {
        setState(prevState => ({
            ...prevState,
            profession: val,
            professionErr: ''
        }))
    }, [state.profession])

    const onChangeOfcPhn = useCallback(async (val) => {
        setState(prevState => ({
            ...prevState,
            officephone: val,
            officephoneErr: '',
            officephoneErrName: ''
        }))
    }, [state.officephone])

    const onChangeOfcFax = useCallback(async (val) => {
        setState(prevState => ({
            ...prevState,
            officefax: val,
            officefaxErr: ''
        }))
    }, [state.officefax])

    const onChangeSpouseName = useCallback(async (val) => {
        setState(prevState => ({
            ...prevState,
            spousename: val,
            spousenameErr: '',
        }))
    }, [state.spousename])

    const onChangeGender = useCallback(async (val) => {
        setState(prevState => ({
            ...prevState,
            gender: val.value,
            genderErr: ''
        }))
    }, [state.gender])

    const onDatePickerOpen = useCallback((name) => {
        if (name == 'dob') {
            setState(prevState => ({
                ...prevState,
                datepickerField: 'dob',
                showDatePicker: true
            }))
            return;
        } else if (name == 'doj') {
            setState(prevState => ({
                ...prevState,
                datepickerField: 'doj',
                showDatePicker: true
            }))
            return;
        } else if (name == 'dow') {
            setState(prevState => ({
                ...prevState,
                datepickerField: 'dow',
                showDatePicker: true
            }))
            return;
        } else if (name == 'spousedob') {
            setState(prevState => ({
                ...prevState,
                datepickerField: 'spousedob',
                showDatePicker: true
            }))
            return;
        } else {
            setState(prevState => ({
                ...prevState,
                datepickerField: '',
                showDatePicker: false
            }))
            return;
        }
    }, [state.datepickerField, state.showDatePicker])

    const onDateSelect = useCallback((value) => {
        if (value.type == 'set') {
            let time = value?.nativeEvent?.timestamp;
            let fname = state.datepickerField
            if (fname == 'dob') {
                setState(prevState => ({
                    ...prevState,
                    dob: time,
                    dobErr: '',
                    showDatePicker: false
                }))
            } else if (fname == 'doj') {
                setState(prevState => ({
                    ...prevState,
                    doj: time,
                    dojErr: '',
                    showDatePicker: false
                }))
            } else if (fname == 'dow') {
                setState(prevState => ({
                    ...prevState,
                    dow: time,
                    dowErr: '',
                    showDatePicker: false
                }))
            } else if (fname == 'spousedob') {
                setState(prevState => ({
                    ...prevState,
                    spousedob: time,
                    spousedobErr: '',
                    showDatePicker: false
                }))
            } else {
                setState(prevState => ({
                    ...prevState,
                    datepickerField: '',
                    showDatePicker: false
                }))
            }
        } else {
            setState(prevState => ({
                ...prevState,
                datepickerField: '',
                showDatePicker: false
            }))
        }
    }, [state.showDatePicker])

    const getDateValue = useCallback((name) => {
        if (name == 'dob') {
            return new Date(state.dob);
        } else if (name == 'doj') {
            return new Date(state.doj);
        } else if (name == 'dow') {
            return new Date(state.dow);
        } else if (name == 'spousedob') {
            return new Date(state.spousedob)
        } else {
            return new Date();
        }
    })

    const onCancel = useCallback(async () => {
        navigation.goBack();
    })

    const onSubmit = useCallback(async () => {
        if (state.name.trim() == '') {
            setState(prevState => ({
                ...prevState,
                nameErr: "error"
            }))
            return;
        } else if (state.email.trim() == '') {
            setState(prevState => ({
                ...prevState,
                emailErr: 'error'
            }))
            return;
        } else if (!isValidEmail(state.email)) {
            setState(prevState => ({
                ...prevState,
                emailErrName: 'Enter a Valid Email'
            }))
            return;
        } else if (state.gender == '') {
            setState(prevState => ({
                ...prevState,
                genderErr: 'error'
            }))
            return;
        } else if (state.phnNo.trim() == '') {
            setState(prevState => ({
                ...prevState,
                phnNoErr: 'error',
            }))
            return;
        } else if (!isValidMobile(state.phnNo)) {
            setState(prevState => ({
                ...prevState,
                phnNoErrName: 'Enter a Valid Phone No'
            }))
            return;
        } else if (state.mobileNo.trim() == '') {
            setState(prevState => ({
                ...prevState,
                mobileNoErr: 'error'
            }))
            return;
        } else if (!isValidMobile(state.mobileNo)) {
            setState(prevState => ({
                ...prevState,
                mobileNoErrName: 'Enter a Valid Mobile No'
            }))
            return;
        } else {
            try {
                // setState(prevState => ({
                //     ...prevState,
                //     loading:true
                // }))
                let datas = {
                    key: KEY,
                    source: SOURCE,
                    app_access_token: state?.accessToken,
                    Name: state?.name,
                    Address: state.resAddress,
                    Phone: state.phnNo,
                    Email: state.email,
                    Gender: state.gender,
                    Profession: state.profession,
                    Spouse: state.spousename,
                    Dob: dateConvertNew(state.dob),
                    Doj: dateConvertNew(state.doj),
                    Dow: dateConvertNew(state.dow),
                    mobile: state.mobileNo,
                    office_address: state.ofcAddress,
                    office_phone: state.officephone,
                    office_fax: state.officefax,
                    spouse_date_of_birth: dateConvertNew(state.spousedob)
                }
                // console.log('UpdatePostBody', JSON.stringify(datas))
                const response = await Apis.update_profile(datas)
                if(__DEV__){
                    console.log('UpdateProfileRes',JSON.stringify(response))
                }
                if(response.status){
                    navigation.goBack();
                }
                setState(prevState=>({
                    ...prevState,
                    loading:false
                }))
                Toast.show(response.message,Toast.LONG);
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

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} />
            <View style={styles.content}>
                {state.loading ? <Loader />
                    :
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.mainContent}>
                            <Text style={styles.headingtext}>EDIT PROFILE</Text>
                            <View style={styles.bodyContent}>
                                <Image source={ImagePath.logo} style={styles.logo} />
                                <Text style={styles.nameText}>{state?.userdata?.Name}</Text>
                                <View style={CommonStyle.border} />
                                <View style={styles.fieldcontent}>
                                    <InputText
                                        name={'Name'}
                                        // leftIcon={ImagePath.user}
                                        value={state.name}
                                        onChangeText={onChngName}
                                        error={state.nameErr ? 'Enter Name' : ''}
                                    />
                                    <InputText
                                        name={'Email'}
                                        value={state.email}
                                        onChangeText={onChngEmail}
                                        error={(state.emailErr || state.emailErrName) ? (state.emailErrName ? state.emailErrName : 'Enter Email') : ''}
                                    />
                                    <CustomDropDown
                                        name={'Gender'}
                                        items={genderItem}
                                        value={state.gender}
                                        open={genderPicker}
                                        setItems={setgenderItem}
                                        setOpen={setgenderPicker}
                                        onChangeValue={onChangeGender}
                                        error={state.genderErr ? 'Select Gender' : ''}
                                    />
                                    <DateInput
                                        name={'D.O.B'}
                                        placeholder={'Enter D.O.B'}
                                        onPress={() => onDatePickerOpen('dob')}
                                        value={dateConvert(state.dob)}
                                        error={state.dobErr}
                                    />
                                    <DateInput
                                        name={'D.O.J'}
                                        placeholder={'Enter D.O.J'}
                                        onPress={() => onDatePickerOpen('doj')}
                                        value={dateConvert(state.doj)}
                                        error={state.dojErr}
                                    />
                                    <DateInput
                                        name={'D.O.W'}
                                        placeholder={'Enter D.O.W'}
                                        onPress={() => onDatePickerOpen('dow')}
                                        value={dateConvert(state.dow)}
                                        error={state.dowErr}
                                    />
                                    <InputText
                                        name={'Residence Address'}
                                        placeholder={'Enter Residence Address'}
                                        value={state.resAddress}
                                        multiline={true}
                                        onChangeText={onChangeResAddress}
                                        error={state.resAddressErr ? 'Enter Residence Address' : ''}
                                    />
                                    <InputText
                                        name={'Office Address'}
                                        placeholder={'Enter Office Address'}
                                        value={state.ofcAddress}
                                        multiline={true}
                                        onChangeText={onChangeOfcAddress}
                                        error={state.ofcAddressErr ? 'Enter Office Address' : ''}
                                    />
                                    <InputText
                                        name={'Phone No'}
                                        placeholder={'Enter Phone No'}
                                        keyboardType={'phone-pad'}
                                        value={state.phnNo}
                                        onChangeText={onChangePhoneNo}
                                        error={(state.phnNoErr || state.phnNoErrName) ? (state.phnNoErrName ? state.phnNoErrName : 'Enter Phone No') : ''}
                                    />
                                    <InputText
                                        name={'Mobile No'}
                                        placeholder={'Enter Mobile No'}
                                        keyboardType={'phone-pad'}
                                        value={state.mobileNo}
                                        onChangeText={onChangeMobileNo}
                                        error={(state.mobileNoErr || state.mobileNoErrName) ? (state.mobileNoErrName ? state.mobileNoErrName : 'Enter Mobile No') : ''}
                                    />
                                    <InputText
                                        name={'Office Phone No'}
                                        value={state.officephone}
                                        onChangeText={onChangeOfcPhn}
                                        keyboardType={'phone-pad'}
                                        error={(state.officephoneErr || state.officephoneErrName) ? (state.officephoneErrName ? state.officephoneErrName : 'Enter Office Phone No') : ''}
                                    />
                                    <InputText
                                        name={'Office Fax No'}
                                        value={state.officefax}
                                        onChangeText={onChangeOfcFax}
                                        keyboardType={'phone-pad'}
                                        error={state.officefaxErr ? 'Enter Office Fax No' : ''}
                                    />
                                    <InputText
                                        name={'Profession'}
                                        value={state.profession}
                                        onChangeText={onChangeProfession}
                                        error={state.professionErr ? 'Enter Profession' : ''}
                                    />
                                    <InputText
                                        name={'Spouse Name'}
                                        placeholder={'Enter Spouse Name'}
                                        value={state.spousename}
                                        onChangeText={onChangeSpouseName}
                                        error={state.spousenameErr ? 'Enter Spouse Name' : ''}
                                    />
                                    <DateInput
                                        name={'Spouse D.O.B'}
                                        placeholder={'Enter Spouse D.O.B'}
                                        onPress={() => onDatePickerOpen('spousedob')}
                                        value={dateConvert(state.spousedob)}
                                        error={state.spousedobErr}
                                    />

                                </View>
                                <View style={styles.btncontent}>
                                    <MultiPleButton
                                        firstName={'SUBMIT'}
                                        onPressFirst={onSubmit}
                                        secondName={'CANCEL'}
                                        onPressSecond={onCancel}
                                    />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                }
            </View>
            {state.showDatePicker && (
                <DateTimePickers
                    value={getDateValue(state.datepickerField)}
                    mode={'date'}
                    onConfirm={(value) => onDateSelect(value)}
                />
            )}
        </SafeAreaView>
    )
}

export default EditProfile

