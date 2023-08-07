import { View, Text, SafeAreaView, Image } from 'react-native'
import React, { useState } from 'react'
import { CommonStyle } from '../../Utils/CommonStyles'
import { styles } from './styles'
import { ImagePath } from '../../Utils/ImagePath'
import Header from '../../Container/Header'

const PaymentStatus = ({ navigation, route }) => {
    const [state, setState] = useState({
        loading: false,
        status: route?.params?.status,
        paymentId: route?.params?.paymentId,
        paymentDetails: route?.params?.paymentDetails
    })

    return (
        <SafeAreaView style={CommonStyle.container}>
            <Header navigation={navigation} />
            <View style={CommonStyle.content}>
                <View style={styles.mainContent}>
                    <Text style={CommonStyle.headingtext}>PAYMENT STATUS</Text>
                    <View style={styles.bodyContent}>
                        {(state.status == 'SUCCESS') ?
                            <Image source={ImagePath.payment_success} style={styles.logo} />
                            :
                            <Image source={ImagePath.payment_fali} style={styles.logo} />
                        }

                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default PaymentStatus