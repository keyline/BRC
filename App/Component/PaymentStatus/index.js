import { View, Text, SafeAreaView, Image } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { CommonStyle } from '../../Utils/CommonStyles'
import { styles } from './styles'
import { ImagePath } from '../../Utils/ImagePath'
import Header from '../../Container/Header'
import Toast from 'react-native-simple-toast'
import { useFocusEffect } from '@react-navigation/native'
import { KEY, SOURCE } from '../../Services/constants'
import AuthContext from '../../Services/Context'
import Apis from '../../Services/apis'
import Loader from '../../Container/Loader'
import NameValue from '../../Container/NameValue'
import { Colors } from '../../Utils/Colors'
import SingleButton from '../../Container/SingleButton'

const PaymentStatus = ({ navigation, route }) => {

    const Context = useContext(AuthContext);

    const [state, setState] = useState({
        loading: false,
        accessToken: Context.allData.accesstoken,
        data: null,
        status: route?.params?.status,
        paymentId: route?.params?.paymentId,
        paymentDetails: route?.params?.paymentDetails
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
                payment_id: route?.params?.paymentId
            }
            const response = await Apis.paymentInfo(datas);
            if (__DEV__) {
                console.log('PaymentInfo', JSON.stringify(response))
            }
            if (response.status) {
                let value = response?.data[0]
                setState(prevState => ({
                    ...prevState,
                    data: response?.data,
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

    const onGoBack = useCallback(async () => {
        navigation.replace('MyBills')
    })

    return (
        <SafeAreaView style={CommonStyle.container}>
            <Header navigation={navigation} />
            <View style={CommonStyle.content}>
                {state.loading ? <Loader /> :
                    <View style={styles.mainContent}>
                        <Text style={CommonStyle.headingtext}>PAYMENT STATUS</Text>
                        <View style={styles.bodyContent}>
                            {(state.status == 'SUCCESS') ?
                                <View>
                                    <Image source={ImagePath.payment_success} style={styles.logo} />
                                    <Text style={styles.successText}>Your Payment Successful</Text>
                                </View>
                                :
                                <View>
                                    <Image source={ImagePath.payment_fali} style={styles.logo} />
                                    <Text style={styles.failText}>Payment Failed</Text>
                                </View>
                            }
                            <View style={styles.border} />
                            <View style={styles.detailsContent}>
                                {state.data?.bill_trans_ref_no && (
                                    <Text style={styles.tnxText}>Transaction No. : {state.data?.bill_trans_ref_no} </Text>
                                )}
                                <NameValue name={'Amount'} value={'₹ ' + state?.data?.amount} />
                                <NameValue name={'Name'} value={state?.data?.name} />
                                <NameValue name={'Email'} value={state?.data?.email} />
                                <NameValue name={'Transaction Status'} value={state?.data?.status} valueColor={state?.data?.status == 'success' ? Colors.light_green : 'red'} />
                                {state?.data?.message && (
                                    <NameValue name={'Message'} value={state?.data?.message} />
                                )}
                                <View style={{ marginTop: '8%', marginBottom: '4%' }}>
                                    <SingleButton
                                        name={'GO BACK'}
                                        onPress={onGoBack}
                                        width={'90%'}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                }
            </View>
        </SafeAreaView>
    )
}

export default PaymentStatus