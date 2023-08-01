import React, { useContext, useState, useCallback } from 'react'
import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import AuthContext from '../../Services/Context';
import { styles } from './styles';
import Header from '../../Container/Header';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import { KEY, SOURCE } from '../../Services/constants';
import Apis from '../../Services/apis';
import Loader from '../../Container/Loader';
import { ImagePath } from '../../Utils/ImagePath';
import { CommonStyle } from '../../Utils/CommonStyles';
import NameValue from '../../Container/NameValue';
import SingleButton from '../../Container/SingleButton';

const PaymentDetails = ({ navigation, route }) => {

    const Context = useContext(AuthContext);

    const [state, setState] = useState({
        loading: false,
        accessToken: Context?.allData?.accesstoken,
        data: null,

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
                decoded_id: route?.params?.id
            }
            const response = await Apis.get_paymentDetails(datas)
            if (__DEV__) {
                console.log('PaymentDetails', JSON.stringify(response))
            }
            if (response.status) {
                setState(prevState => ({
                    ...prevState,
                    data: response?.data[0],
                    // data: [],
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
    }, [navigation])

    const onBack = useCallback(async () => {
        navigation.goBack();
    })

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} />
            <View style={styles.content}>
                {state.loading ? <Loader />
                    :
                    <ScrollView>
                        {state.data && (
                            <View style={styles.mainContent}>
                                <Text style={styles.headingtext}>PAYMENT DETAILS</Text>
                                <View style={styles.bodyContent}>
                                    <Image source={ImagePath.logo} style={styles.logo} />
                                    <View style={styles.mainContent} />
                                    <View style={styles.border} />
                                    <NameValue name={'Bank Transaction ID'} value={state?.data?.bank_transaction} />
                                    <NameValue name={'Online Receipt No.'} value={state?.data?.receipt_id} />
                                    <NameValue name={'Recived From'} value={state?.data?.received_from} />
                                    <NameValue name={'M/Ship No.'} value={state?.data?.membership_no} />
                                    <View style={styles.border} />
                                    <NameValue name={'Payment Description'} value={state?.data?.payment_particular} />
                                    <NameValue name={'Debit'} value={'₹ 0'} />
                                    <NameValue name={'Credit'} value={'₹ ' + state?.data?.amount} />
                                    <View style={styles.border} />
                                    <NameValue name={'Total'} value={'₹ ' + state?.data?.amount} />
                                    <NameValue name={'Amount'} value={state?.data?.amount_word} />
                                    <NameValue name={'Payment Getway'} value={state?.data?.pg_name} />
                                    <NameValue name={'Payment Date'} value={state?.data?.paymemt_date} />
                                    <View style={styles.border} />
                                    <View style={styles.btncontainer}>
                                        <SingleButton
                                            name={'GO BACK'}
                                            onPress={onBack}
                                        />
                                    </View>
                                </View>
                            </View>
                        )}
                    </ScrollView>
                }
            </View>
        </SafeAreaView>
    )
}

export default PaymentDetails