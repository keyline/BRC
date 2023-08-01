import React, { useCallback, useContext, useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../Container/Header'
import { styles } from './styles'
import AuthContext from '../../Services/Context'
import { useFocusEffect } from '@react-navigation/native'
import Toast from 'react-native-simple-toast';
import Loader from '../../Container/Loader'
import { KEY, SOURCE } from '../../Services/constants'
import Apis from '../../Services/apis'
import List from './List'
import SingleButton from '../../Container/SingleButton'

const PaymentList = ({ navigation }) => {

    const Context = useContext(AuthContext);

    const [state, setState] = useState({
        loading: false,
        accessToken: Context?.allData?.accesstoken,
        data: [],

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
                app_access_token: state?.accessToken
            }
            const response = await Apis.get_paymentList(datas)
            if (__DEV__) {
                console.log('PaymentList', JSON.stringify(response))
            }
            if (response.status) {
                setState(prevState => ({
                    ...prevState,
                    data: response?.data,
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

    const onGoBack = useCallback(async () => navigation.navigate('MyProfile'));

    const onNext = useCallback(async (value) => {
        // console.log('Next', value)
        navigation.navigate('PaymentDetails', { id: value })
    })

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} />
            <View style={styles.content}>
                {state.loading ? <Loader /> :
                    <View style={styles.mainContent}>
                        <Text style={styles.headingtext}>MY ONLINE PAYMENTS</Text>
                        <View style={styles.bodyContent}>
                            <FlatList
                                data={state?.data}
                                keyExtractor={(item, index) => item.sl}
                                renderItem={({ item }) =>
                                    <List item={item} onPress={onNext} />
                                }
                                initialNumToRender={6}
                                showsVerticalScrollIndicator={false}
                            />

                        </View>
                        <View style={styles.btnContent}>
                            <SingleButton name={'BACK TO MY PAGE'} onPress={onGoBack} />
                        </View>
                    </View>
                }
            </View>
        </SafeAreaView>
    )
}

export default PaymentList