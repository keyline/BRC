import { Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'
import { PAYMENT_FAIL_URL, PAYMENT_SUCCESS_URL } from '../../Services/constants';

const Payment = ({ navigation, route }) => {

    const handleNavigationStateChange = (navState) => {
        console.log('Current URL:', navState.url);
        let url = navState.url
        if (url == PAYMENT_SUCCESS_URL || url.includes('success.php')) {
            navigation.replace('PaymentStatus', { status: 'SUCCESS', paymentId: route?.params?.paymentId, paymentDetails: route?.params?.paymentDetails })
        } else if (url == PAYMENT_FAIL_URL || url.includes('failure.php')) {
            navigation.replace('PaymentStatus', { status: 'FAIL', paymentId: route?.params?.paymentId, paymentDetails: route?.params?.paymentDetails })
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <WebView
                source={{ uri: route?.params?.link }}
                onNavigationStateChange={handleNavigationStateChange}
                style={{ flex: 1 }}
            // containerStyle={{ paddingTop: 20 }}
            />
        </SafeAreaView>
    )
}

export default Payment

