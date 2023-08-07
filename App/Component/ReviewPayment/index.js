import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React, { useContext, useState, useCallback } from 'react'
import Header from '../../Container/Header'
import { CommonStyle } from '../../Utils/CommonStyles'
import { ImagePath } from '../../Utils/ImagePath'
import InputText from '../../Container/InputText'
import AuthContext from '../../Services/Context'
import { styles } from './styles'
import { useFocusEffect } from '@react-navigation/native'
import Toast from 'react-native-simple-toast'
import Apis from '../../Services/apis'
import { KEY, SOURCE } from '../../Services/constants'
import Loader from '../../Container/Loader'
import SingleButton from '../../Container/SingleButton'
import { isValidAmount, isValidEmail, isValidMobile } from '../../Services/Valid'

const ReviewPayment = ({ navigation, route }) => {

    const Context = useContext(AuthContext);

    const [state, setState] = useState({
        loading: false,
        btnLoading: false,
        data: null,
        accessToken: Context.allData.accesstoken,
        ammount: route.params?.amount,
        ammountErr: '',
        ammountErrName: '',
        name: '',
        nameErr: '',
        email: '',
        emailErr: '',
        emailErrName: '',
        phnNo: '',
        phnNoErr: '',
        phnNoErrName: ''
    })

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
                app_access_token: state?.accessToken,
                amount: route.params?.amount
            }
            const response = await Apis.reviewPaymentDetails(datas);
            if (__DEV__) {
                console.log('ReviewPayment', JSON.stringify(response))
            }
            if (response.status) {
                let value = response?.data[0]
                setState(prevState => ({
                    ...prevState,
                    data: value,
                    ammount: value?.amount,
                    name: value?.name,
                    email: value?.email,
                    phnNo: value?.mobile,
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

    const onChangeAmnt = useCallback(async (value) => {
        setState(prevState => ({
            ...prevState,
            ammount: value,
            ammountErr: '',
            ammountErrName: ''
        }))
    }, [state.ammount])

    const onChangeName = useCallback(async (value) => {
        setState(prevState => ({
            ...prevState,
            name: value,
            nameErr: '',
        }))
    }, [state.name])

    const onChangeEmail = useCallback(async (value) => {
        setState(prevState => ({
            ...prevState,
            email: value,
            emailErr: '',
            emailErrName: ''
        }))
    }, [state.email])

    const onChangePhn = useCallback(async (value) => {
        setState(prevState => ({
            ...prevState,
            phnNo: value,
            phnNoErr: '',
            phnNoErrName: ''
        }))
    }, [state.phnNo])

    const onSubmit = useCallback(async () => {
        if (state.ammount.trim() == '') {
            setState(prevState => ({
                ...prevState,
                ammountErr: 'error',
            }))
            return;
        } else if (!isValidAmount(state.ammount)) {
            setState(prevState => ({
                ...prevState,
                ammountErrName: 'Enter a Valid Amount',
            }))
            return;
        } else if (state.name.trim() == '') {
            setState(prevState => ({
                ...prevState,
                nameErr: 'error',
            }))
            return;
        } else if (state.email.trim() == '') {
            setState(prevState => ({
                ...prevState,
                emailErr: 'error',
            }))
            return;
        } else if (!isValidEmail(state.email)) {
            setState(prevState => ({
                ...prevState,
                emailErrName: 'Enter a Valid Email',
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
                phnNoErrName: 'Enter a Valid Phone No',
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
                    app_access_token: state?.accessToken,
                    pg_name: state.data?.pg_name,
                    pay_type: state.data?.pay_type,
                    member_id: state.data?.member_id,
                    membership_no: state.data?.membership_no,
                    name: state.name,
                    email: state.email,
                    phone: state.phnNo,
                    amount: state.ammount,
                }
                // console.log('postbody',JSON.stringify(datas))
                const response = await Apis.insertPayment(datas);
                if (__DEV__) {
                    console.log('InsertPayment', JSON.stringify(response))
                }
                if (response.status) {
                    setState(prevState => ({
                        ...prevState,
                        btnLoading: false
                    }));
                    if (response.data?.payment_link) {
                        navigation.replace('Payment', { paymentId: response.data?.payment_id, link: response.data?.payment_link,paymentDetails:response.data })
                    }
                } else {
                    setState(prevState => ({
                        ...prevState,
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

    return (
        <SafeAreaView style={CommonStyle.container}>
            <Header navigation={navigation} />
            <View style={CommonStyle.content}>
                {state.loading ? <Loader /> :
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.mainContent}>
                            <Text style={CommonStyle.headingtext}>REVIEW PAYMENT DETAILS</Text>
                            <View style={styles.bodyContent}>
                                <Image source={ImagePath.logo} style={CommonStyle.logo} />
                                {/* <Text style={styles.nameText}>{state?.userdata?.Name}</Text> */}
                                <View style={[CommonStyle.borderNew, { marginVertical: '4%' }]} />
                                <View>
                                    <InputText
                                        name={'Amount'}
                                        value={state.ammount}
                                        onChangeText={onChangeAmnt}
                                        keyboardType={'number-pad'}
                                        error={(state.ammountErr || state.ammountErrName) ? (state.ammountErrName ? state.ammountErrName : 'Enter Amount') : ''}
                                    />
                                    <InputText
                                        name={'Name'}
                                        value={state.name}
                                        onChangeText={onChangeName}
                                        // keyboardType={'number-pad'}
                                        error={state.ammountErr ? 'Enter Name' : ''}
                                    />
                                    <InputText
                                        name={'Email'}
                                        value={state.email}
                                        onChangeText={onChangeEmail}
                                        keyboardType={'email-address'}
                                        error={(state.emailErr || state.emailErrName) ? (state.emailErrName ? state.emailErr : 'Enter Email') : ''}
                                    />
                                    <InputText
                                        name={'Phone'}
                                        value={state.phnNo}
                                        onChangeText={onChangePhn}
                                        keyboardType={'phone-pad'}
                                        error={(state.phnNoErr || state.phnNoErrName) ? (state.phnNoErrName ? state.phnNoErr : 'Enter Phone No') : ''}
                                    />
                                    <View style={{ marginVertical: '8%' }}>
                                        <SingleButton
                                            name={'SUBMIT'}
                                            onPress={onSubmit}
                                            width={'80%'}
                                            loader={state.btnLoading}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                }
            </View>
        </SafeAreaView>
    )
}

export default ReviewPayment