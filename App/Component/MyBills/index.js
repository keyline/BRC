import { View, Text, SafeAreaView, FlatList, Linking } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import Header from '../../Container/Header'
import { styles } from './styles'
import Loader from '../../Container/Loader'
import Toast from 'react-native-simple-toast';
import { KEY, SOURCE } from '../../Services/constants'
import AuthContext from '../../Services/Context'
import Apis from '../../Services/apis'
import { useFocusEffect } from '@react-navigation/native'
import List from './List'
import { FooterComponent, HeaderComponent } from './CustomContent'
import SingleButton from '../../Container/SingleButton'
import EmptyComponent from '../../Container/EmptyComponent'

const MyBills = ({ navigation }) => {

    const Context = useContext(AuthContext);

    const [state, setState] = useState({
        loading: false,
        accessToken: Context.allData.accesstoken,
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
                app_access_token: state.accessToken
            }
            const response = await Apis.get_myBills(datas)
            if (__DEV__) {
                console.log('MyBillResponse', JSON.stringify(response))
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

    const onBillView = useCallback(async (link) => {
        console.log('Link', link)
        try {
            if (link) {
                await Linking.openURL(link);
                // const supported = await Linking.canOpenURL(link);
                // if (supported) {
                // } else {
                //     Toast.show('Invalid Link', Toast.LONG)
                // }
            } else {
                Toast.show('Something Went Wrong', Toast.LONG)
            }

        } catch (error) {
            if (__DEV__) {
                console.log(error)
            }
            Toast.show('Something Went Wrong', Toast.LONG)
        }
    })

    const onMakePayment = useCallback(async () => {
        console.log('MakePayment');
    })



    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} />
            <View style={styles.content}>
                {state.loading ? <Loader /> :
                    <View style={styles.mainContent}>
                        <Text style={styles.headingtext}>MY BILLS</Text>
                        <View style={styles.bodyContent}>
                            <FlatList
                                data={state?.data}
                                keyExtractor={(item, index) => item.sl_no}
                                renderItem={({ item }) =>
                                    <List item={item} onPress={onBillView} />
                                }
                                ListHeaderComponent={state?.data?.length > 0 ? HeaderComponent : null}
                                ListEmptyComponent={<EmptyComponent emptyText={'No Bill Found'} />}
                                showsVerticalScrollIndicator={false}
                            />
                            {state?.data?.length > 0 && (
                                <FooterComponent onPress={onMakePayment} />
                            )}
                        </View>
                    </View>
                }
            </View>
        </SafeAreaView>
    )
}

export default MyBills