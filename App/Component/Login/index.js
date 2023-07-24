import { Text, View, Image, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { styles } from './styles'
import { ImagePath } from '../../Utils/ImagePath'
import { Colors } from '../../Utils/Colors'
import SingleButton from '../../Container/SingleButton'
import { CommonStyle } from '../../Utils/CommonStyles'
import { setUserData } from '../../Services/AsyncStorage'
import AuthContext from '../../Services/Context'

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
            let datas = {
                username: state.username,
                password: state.password
            }
            let val = await setUserData(datas)
            if (val) {
                context.onGetStoreData();
            } else {
                console.log('Login Error')
            }
            // setState(prevState => ({
            //     ...prevState,
            //     loading: true
            // }))

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
                                placeholder='UserName'
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
                                <Text style={CommonStyle.errName}>Enter Your UserName</Text>
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

