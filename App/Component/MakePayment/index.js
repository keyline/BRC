import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native'
import React, { useState, useContext, useCallback } from 'react'
import { CommonStyle } from '../../Utils/CommonStyles'
import Header from '../../Container/Header'
import { styles } from './styles'
import { ImagePath } from '../../Utils/ImagePath'
import AuthContext from '../../Services/Context'
import Toast from 'react-native-simple-toast'
import Apis from '../../Services/apis'
import InputText from '../../Container/InputText'
import CheckBox from '@react-native-community/checkbox'
import { Colors } from '../../Utils/Colors'
import SingleButton from '../../Container/SingleButton'
import { isValidAmount } from '../../Services/Valid'
import { KEY, SOURCE } from '../../Services/constants'

const MakePayment = ({ navigation }) => {

    const Context = useContext(AuthContext);

    const [state, setState] = useState({
        loading: false,
        btnLoading: false,
        userdata: null,
        accessToken: Context.allData.accesstoken,
        ammount: '',
        ammountErr: '',
        ammountErrName: '',
        checkValue: false,
    })

    const onChangeAmnt = useCallback(async (value) => {
        setState(prevState => ({
            ...prevState,
            ammount: value,
            ammountErr: '',
            ammountErrName: ''
        }))
    }, [state.ammount])

    const onChangeCheckBox = useCallback(async () => {
        setState(prevState => ({
            ...prevState,
            checkValue: !state.checkValue
        }))
    }, [state.checkValue])

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
        } else if (state.checkValue == false) {
            Toast.show('Select Checkbox', Toast.LONG)
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
                    amount: state.ammount,
                    payment_by: "HDFC"
                }
                const response = await Apis.makePayment(datas)
                if (__DEV__) {
                    console.log('MakePayment', JSON.stringify(response))
                }
                if (response.status) {
                    setState(prevState => ({
                        ...prevState,
                        btnLoading: false
                    }))
                    navigation.navigate('ReviewPayment', { amount: response.data[0]?.amount })
                } else {
                    setState(prevState => ({
                        ...prevState,
                        btnLoading: false
                    }))
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
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.mainContent}>
                        <Text style={CommonStyle.headingtext}>MAKE PAYMENT</Text>
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
                                <View style={styles.checkContainer}>
                                    <CheckBox
                                        value={state.checkValue}
                                        disabled={false}
                                        onChange={onChangeCheckBox}
                                    />
                                    <Text style={styles.lighttext}>  Pay using HDFC</Text>
                                </View>
                                <View style={{ alignSelf: 'center' }}>
                                    <Image source={ImagePath.hdfc_logo} style={styles.hdfclogo} />
                                    <Text style={[styles.lighttext,]}>(Powered by HDFC)</Text>
                                </View>
                                <View style={{ marginVertical: '8%' }}>
                                    <SingleButton
                                        name={'SUBMIT'}
                                        onPress={onSubmit}
                                        width={'85%'}
                                        loader={state.btnLoading}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default MakePayment