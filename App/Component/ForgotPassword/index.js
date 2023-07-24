import { Text, View, SafeAreaView, ScrollView, Image, TextInput } from 'react-native'
import React, { useCallback, useState } from 'react'
import { styles } from './styles'
import { ImagePath } from '../../Utils/ImagePath'
import SingleButton from '../../Container/SingleButton'
import { CommonStyle } from '../../Utils/CommonStyles'

const ForgotPassword = ({ navigation }) => {

    const [state, setState] = useState({
        loading: false,
        email: '',
        emailErr: '',
        emailErrname: ''
    })

    const onSubmit = useCallback(async () => {
        // setState(prevState => ({
        //     ...prevState,
        //     loading: true
        // }))
        // navigation.goBack();
        navigation.navigate('Login')
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
                            <Image source={ImagePath.email} style={styles.inputimg} />
                            <TextInput
                                placeholder='Enter Your Email ID'
                                style={styles.input}
                                onChangeText={(e) => setState(prevState => ({
                                    ...prevState,
                                    email: e,
                                    emailErr: '',
                                    emailErrname: ''
                                }))}
                            />
                        </View>
                        {(state.emailErr || state.emailErrname) && (
                            <View style={{ width: '75%', marginTop: '1.5%' }}>
                                <Text style={CommonStyle.errName}>{state.emailErrname ? state.emailErrname : 'Enter Your Email'}</Text>
                            </View>
                        )}
                        <View style={{ width: '85%', marginTop: '12%' }}>
                            <SingleButton
                                name={'SUBMIT'}
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

export default ForgotPassword

