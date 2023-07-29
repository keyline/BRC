import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { styles } from './styles'
import Header from '../../Container/Header'
import { KEY, SOURCE } from '../../Services/constants'
import AuthContext from '../../Services/Context'
import Apis from '../../Services/apis'
import Toast from 'react-native-simple-toast';
import Loader from '../../Container/Loader'
import { ImagePath } from '../../Utils/ImagePath'
import PasswordInput from '../../Container/PasswordInput'
import MultiPleButton from '../../Container/MultiPleButton'

const ChangePassword = ({ navigation }) => {

    const Context = useContext(AuthContext);

    const [state, setState] = useState({
        loading: false,
        userdata: Context.allData.userdata,
        accessToken: Context.allData.accesstoken,
        oldPass: '',
        oldPassErr: '',
        oldPassVisible: true,
        newPass: '',
        newPassErr: '',
        newPassVisible: true,
        cnfPass: '',
        cnfPassErr: '',
        cnfPassVisible: true
    })

    const onOldPass = useCallback(async (val) => {
        setState(prevState => ({
            ...prevState,
            oldPass: val,
            oldPassErr: ''
        }))
    }, [state.oldPass])

    const onNewPass = useCallback(async (val) => {
        setState(prevState => ({
            ...prevState,
            newPass: val,
            newPassErr: ''
        }))
    }, [state.newPass])

    const onCnfPass = useCallback(async (val) => {
        setState(prevState => ({
            ...prevState,
            cnfPass: val,
            cnfPassErr: ''
        }))
    }, [state.cnfPass])

    const onOldPassVisible = useCallback(async () => {
        setState(prevState => ({
            ...prevState,
            oldPassVisible: !state.oldPassVisible
        }))
    }, [state.oldPassVisible])

    const onNewPassVisible = useCallback(async () => {
        setState(prevState => ({
            ...prevState,
            newPassVisible: !state.newPassVisible
        }))
    }, [state.newPassVisible])

    const onCnfPassVisible = useCallback(async () => {
        setState(prevState => ({
            ...prevState,
            cnfPassVisible: !state.cnfPassVisible
        }))
    }, [state.cnfPassVisible])

    const onCancel = useCallback(async () => {
        navigation.goBack();
    })

    const onDefaultState = useCallback(async () => {
        setState(prevState => ({
            ...prevState,
            oldPass: '',
            oldPassErr: '',
            oldPassVisible: true,
            newPass: '',
            newPassErr: '',
            newPassVisible: true,
            cnfPass: '',
            cnfPassErr: '',
            cnfPassVisible: true,
            loading: false
        }))
    })

    const onSubmit = useCallback(async () => {
        if (state.oldPass.trim() == '') {
            setState(prevState => ({
                ...prevState,
                oldPassErr: 'error'
            }))
            return;
        } else if (state.newPass.trim() == '') {
            setState(prevState => ({
                ...prevState,
                newPassErr: 'error'
            }))
            return;
        } else if (state.cnfPass.trim() == '') {
            setState(prevState => ({
                ...prevState,
                cnfPassErr: 'error'
            }))
            return;
        } else if (state.newPass != state.cnfPass) {
            Toast.show('New and Old Password Mismatch', Toast.LONG);
            return;
        } else {
            try {
                setState(prevState => ({
                    ...prevState,
                    loading: true
                }))
                let datas = {
                    key: KEY,
                    source: SOURCE,
                    app_access_token: state.accessToken,
                    old_password: state.oldPass,
                    new_password: state.newPass,
                    confirm_password: state.cnfPass
                }
                const response = await Apis.change_password(datas)
                if (__DEV__) {
                    console.log('ChangePassword', JSON.stringify(response))
                }

                if (response.status) {
                    onDefaultState();
                    onCancel();
                } else {
                    setState(prevState => ({
                        ...prevState,
                        loading: false
                    }))
                }
                Toast.show(response.message, Toast.LONG);
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
            <Header navigation={navigation} />
            <View style={styles.content}>
                {state.loading ? <Loader />
                    :
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.mainContent}>
                            <Text style={styles.headingtext}>CHANGE PASSWORD</Text>
                            <View style={styles.bodyContent}>
                                <Image source={ImagePath.logo} style={styles.logo} />
                                <Text style={styles.nameText}>{state?.userdata?.name}</Text>
                                <View>
                                    <PasswordInput
                                        name={'Old Password'}
                                        placeholder={'Enter Old Password'}
                                        onChangeText={onOldPass}
                                        value={state.oldPass}
                                        passwordVisible={state.oldPassVisible}
                                        onChangeVisiblity={onOldPassVisible}
                                        error={state.oldPassErr ? 'Enter Old Password' : ''}
                                    />
                                    <PasswordInput
                                        name={'New Password'}
                                        placeholder={'Enter New Password'}
                                        onChangeText={onNewPass}
                                        value={state.newPass}
                                        passwordVisible={state.newPassVisible}
                                        onChangeVisiblity={onNewPassVisible}
                                        error={state.newPassErr ? 'Enter New Password' : ''}
                                    />
                                    <PasswordInput
                                        name={'Confirm Password'}
                                        placeholder={'Enter Confirm Password'}
                                        onChangeText={onCnfPass}
                                        value={state.cnfPass}
                                        passwordVisible={state.cnfPassVisible}
                                        onChangeVisiblity={onCnfPassVisible}
                                        error={state.cnfPassErr ? 'Enter Confirm Password' : ''}
                                    />
                                </View>
                                <View style={styles.btncontent}>
                                    <MultiPleButton
                                        firstName={'SUBMIT'}
                                        onPressFirst={onSubmit}
                                        secondName={'CANCEL'}
                                        onPressSecond={onCancel}
                                    />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                }
            </View>
        </SafeAreaView>
    )
}

export default ChangePassword