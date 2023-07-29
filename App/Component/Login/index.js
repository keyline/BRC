import { Text, View, Image, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { styles } from './styles'
import { ImagePath } from '../../Utils/ImagePath'
import { Colors } from '../../Utils/Colors'
import SingleButton from '../../Container/SingleButton'
import { CommonStyle } from '../../Utils/CommonStyles'
import { setAccessToken, setUserData } from '../../Services/AsyncStorage'
import AuthContext from '../../Services/Context'
import DeviceInfo from 'react-native-device-info'
import { KEY, SOURCE } from '../../Services/constants'
import Apis from '../../Services/apis'
import Toast from 'react-native-simple-toast';

const Login = ({ navigation }) => {

    const context = useContext(AuthContext);

    const [state, setState] = useState({
        loading: false,
        username: '',
        usernameErr: '',
        password: '',
        passwordErr: '',
        passwordVisible: true
    })

    const onChangeVisiblity = useCallback(() => {
        setState(prevState => ({
            ...prevState,
            passwordVisible: !state.passwordVisible
        }))
    }, [state.passwordVisible])

    const onForgotPassword = useCallback(() => {
        navigation.navigate("ForgotPassword")
    })

    const onSubmit = useCallback(async () => {
        if (state.username.trim() == '') {
            setState(prevState => ({
                ...prevState,
                usernameErr: 'error'
            }));
            return;
        } else if (state.password.trim() == '') {
            setState(prevState => ({
                ...prevState,
                passwordErr: 'error'
            }));
            return;
        } else {
            try {
                setState(prevState => ({
                    ...prevState,
                    loading: true
                }))
                let deviceId = DeviceInfo.getDeviceId();
                let datas = {
                    key: KEY,
                    source: SOURCE,
                    membership_no: state.username,
                    password: state.password,
                    device_token: deviceId
                }
                const response = await Apis.sign_in(datas)
                if (__DEV__) {
                    console.log('SignInResponse', JSON.stringify(response));
                }
                if (response.status) {
                    await setUserData(response.data);
                    await setAccessToken(response.data.app_access_token);
                    context.onGetStoreData();
                    setState(prevState => ({
                        ...prevState,
                        loading: false
                    }))
                    Toast.show(response.message, Toast.LONG);
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

        }
    })

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.content}>
                    <View style={styles.imgcontainer}>
                        <Image source={ImagePath.logo} style={styles.img} />
                    </View>
                    <View style={styles.inputcontainer}>
                        <View style={styles.inputcontent}>
                            <Image source={ImagePath.user} style={styles.inputimg} />
                            <TextInput
                                placeholder='Username'
                                style={styles.input}
                                onChangeText={(e) => setState(prevState => ({
                                    ...prevState,
                                    username: e,
                                    usernameErr: ''
                                }))}
                            />
                        </View>
                        {state.usernameErr && (
                            <View style={{ width: '75%', marginTop: '1.5%' }}>
                                <Text style={CommonStyle.errName}>Enter Your Username</Text>
                            </View>
                        )}
                        <View style={[styles.inputcontent, { marginTop: 30 }]}>
                            <Image source={ImagePath.lock} style={styles.inputimg} />
                            <TextInput
                                placeholder='Password'
                                secureTextEntry={state.passwordVisible}
                                style={[styles.input, { width: '80%' }]}
                                onChangeText={(e) => setState(prevState => ({
                                    ...prevState,
                                    password: e,
                                    passwordErr: ''
                                }))}
                            />
                            <TouchableOpacity onPress={onChangeVisiblity}>
                                <Image source={state.passwordVisible ? ImagePath.eye_on : ImagePath.eye_off} style={styles.eyeicon} />
                            </TouchableOpacity>
                        </View>
                        {state.passwordErr && (
                            <View style={{ width: '75%', marginTop: '1.5%' }}>
                                <Text style={CommonStyle.errName}>Enter Your Password</Text>
                            </View>
                        )}
                        <Text style={styles.forgottext} onPress={onForgotPassword}>Forgot password?</Text>
                        <View style={{ width: '85%', marginTop: 20 }}>
                            <SingleButton
                                name={'LOGIN'}
                                onPress={onSubmit}
                                loader={state.loading}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Login

