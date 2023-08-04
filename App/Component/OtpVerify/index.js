import { View, Text, SafeAreaView, Image } from 'react-native'
import React, { useState, useContext, useCallback, useEffect } from 'react'
import Header from '../../Container/Header'
import { styles } from './styles'
import AuthContext from '../../Services/Context'
import { ImagePath } from '../../Utils/ImagePath'
import OTPInputView from '@twotalltotems/react-native-otp-input';
import SingleButton from '../../Container/SingleButton'
import { Colors } from '../../Utils/Colors'
import LoaderNew from '../../Container/LoaderNew'
import Toast from 'react-native-simple-toast';
import { KEY, SOURCE } from '../../Services/constants'
import Apis from '../../Services/apis'

const OtpVerify = ({ navigation, route }) => {

    const Context = useContext(AuthContext);

    const [state, setState] = useState({
        loading: false,
        btnLoading: false,
        accessToken: Context?.allData?.accesstoken,
        bookingId: route?.params?.id,
        resOtp: route?.params?.otp,
        otp: '',
        otpErr: ''
    })
    const [timer, setTimer] = useState(60)

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(lastTimerCount => {
                lastTimerCount <= 1 && clearInterval(interval)
                return lastTimerCount - 1
            })
        }, 1000) //each count lasts for a second
        return () => clearInterval(interval)
    }, []);

    const onChangeOtp = useCallback(async (code) => {
        setState(prevState => ({
            ...prevState,
            otp: code,
            otpErr: ''
        }))
    }, [state.otp])

    const onSubmitOtp = useCallback(async () => {
        if (state.otp == '') {
            Toast.show('Enter OTP', Toast.LONG);
            return;
        } else if (state.otp.length != 4) {
            Toast.show('Enter Valid OTP', Toast.LONG);
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
                    booking_id: state.bookingId,
                    otp: state.otp
                }
                const response = await Apis.sportBook_validate(datas);
                if (__DEV__) {
                    console.log('ValidateOTP', JSON.stringify(response))
                }
                setState(prevState => ({
                    ...prevState,
                    btnLoading: false
                }))
                if (response.status) {
                    navigation.navigate('MyProfile');
                }
                Toast.show(response.message, Toast.LONG);
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

    const onResendOtp = useCallback(async () => {
        try {
            setState(prevState => ({
                ...prevState,
                loading: true
            }))
            let datas = {
                key: KEY,
                source: SOURCE,
                app_access_token: state.accessToken,
                booking_id: state.bookingId
            }
            const response = await Apis.sportBookOtp_resend(datas);
            if (__DEV__) {
                console.log('ResendOTPResponse', JSON.stringify(response))
            }
            setState(prevState => ({
                ...prevState,
                loading: false
            }))
            Toast.show(response.message, Toast.LONG);
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

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} />
            <View style={styles.content}>
                <View style={styles.mainContent}>
                    <Text style={styles.headingtext}>SPORTS BOOKING OTP</Text>
                    <View style={styles.bodyContent}>
                        <Image source={ImagePath.logo} style={styles.logo} />
                        <Text style={styles.subheadingText}>Please Check your mobile for OTP</Text>
                        <View style={styles.otpContainer}>
                            <OTPInputView
                                pinCount={4}
                                autoFocusOnLoad
                                onCodeChanged={code => onChangeOtp(code)}
                                style={styles.otp}
                                codeInputFieldStyle={styles.underlineStyleBase}
                                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                placeholderTextColor={Colors.dark_yellow}
                            // onCodeFilled={(code) => onSubmitOtp(code)}
                            />
                            {timer == 0 ?
                                <Text onPress={onResendOtp} style={styles.resendText}>Resend OTP</Text>
                                :
                                <Text style={styles.timerText}>Resend OTP in : {timer} Sec</Text>
                            }
                            <View style={{ marginTop: '10%' }}>
                                <SingleButton
                                    name={'VERIFY'}
                                    onPress={onSubmitOtp}
                                    width={'90%'}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            {state.loading && (
                <LoaderNew />
            )}
        </SafeAreaView>
    )
}

export default OtpVerify