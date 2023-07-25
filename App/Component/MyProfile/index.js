import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import AuthContext from '../../Services/Context'
import { styles } from './styles';
import Header from '../../Container/Header';
import { ImagePath } from '../../Utils/ImagePath';
import Toast from 'react-native-simple-toast';
import { KEY, SOURCE } from '../../Services/constants';
import { useFocusEffect } from '@react-navigation/native';
import Apis from '../../Services/apis';
import Loader from '../../Container/Loader';
import { CommonStyle } from '../../Utils/CommonStyles';

const MyProfile = ({ navigation }) => {

    const Context = useContext(AuthContext);

    const [state, setState] = useState({
        loading: false,
        userdata: null,
        accessToken: Context.allData.accesstoken
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
            const response = await Apis.get_profile(datas);
            if (__DEV__) {
                console.log('ProfileResponse', JSON.stringify(response));
            }
            if (response.status) {
                setState(prevState => ({
                    ...prevState,
                    userdata: response?.data,
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

    const NameValue = ({ name, value }) => (
        <View style={styles.namevaluecontent}>
            <Text style={styles.boldtext}>{name} : <Text style={styles.lighttext}>{value}</Text></Text>
        </View>
    )

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} />
            <View style={styles.content}>
                {state.loading ? <Loader />
                    :
                    <ScrollView>
                        {state.userdata && (
                            <View style={styles.mainContent}>
                                <Text style={styles.headingtext}>MY PAGE</Text>
                                <View style={styles.bodyContent}>
                                    <Image source={ImagePath.logo} style={styles.logo} />
                                    <Text style={styles.nameText}>{state?.userdata?.Name}</Text>
                                    <View style={CommonStyle.border} />
                                    <View style={styles.infocontent}>
                                        <NameValue name={'Year of joining'} value={state?.userdata?.Doj} />
                                        <NameValue name={'Date of Birth'} value={state?.userdata?.Dob} />
                                        <NameValue name={'Date of Wedding'} value={state?.userdata?.Dow} />
                                    </View>
                                    <View style={CommonStyle.border} />
                                    <View style={styles.infocontent}>
                                        <NameValue name={'Office'} value={state?.userdata?.office_address} />
                                        <NameValue name={'Phone'} value={state?.userdata?.Phone} />
                                        <NameValue name={'Mobile'} value={state?.userdata?.mobile} />
                                        <NameValue name={'E-mail'} value={state?.userdata?.Email} />
                                    </View>
                                    <View style={CommonStyle.border} />
                                    <View style={styles.infocontent}>
                                        <NameValue name={'Residence'} value={state?.userdata?.Residence_Address} />
                                        <NameValue name={'Phone'} value={state?.userdata?.Phone} />
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

export default MyProfile