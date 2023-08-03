import { View, Text, Image } from 'react-native'
import React, { useCallback, useState, useContext } from 'react'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import { ImagePath } from '../Utils/ImagePath'
import { Colors } from '../Utils/Colors'
import Toast from 'react-native-simple-toast';
import { clearAllData } from '../Services/AsyncStorage'
import { styles } from './styles'
import AuthContext from '../Services/Context'
import { KEY, SOURCE } from '../Services/constants'
import Apis from '../Services/apis'
import LoaderNew from '../Container/LoaderNew'
import { useFocusEffect } from '@react-navigation/native'

const CustomDrawerContent = (props) => {

    const Context = useContext(AuthContext);

    const [state, setState] = useState({
        loading: false,
        userdata: Context.allData.userdata,
        accessToken: Context.allData.accesstoken,
        data: null
    })

    useFocusEffect(
        useCallback(() => {
            const unsubscribe = onGetData();
            return () => unsubscribe
        }, [props])
    )

    const onGetData = useCallback(async () => {
        try {
            // setState(prevState => ({
            //     ...prevState,
            //     loading: true
            // }))
            let datas = {
                key: KEY,
                source: SOURCE,
                app_access_token: state?.accessToken
            }
            const response = await Apis.get_profile(datas);
            if (__DEV__) {
                console.log('DrawerProfileResponse', JSON.stringify(response));
            }
            if (response.status) {
                setState(prevState => ({
                    ...prevState,
                    data: response?.data,
                    // loading: false
                }))
            } else {
                setState(prevState => ({
                    ...prevState,
                    data: null,
                    // loading: false
                }))
                Toast.show(response.message, Toast.LONG);
            }
        } catch (error) {
            setState(prevState => ({
                ...prevState,
                // loading: false
            }))
            if (__DEV__) {
                console.log(error)
            }
            Toast.show('Something Went Wrong', Toast.LONG);
        }
    })

    const onSignOut = useCallback(async () => {
        try {
            props.navigation.closeDrawer()
            setState(prevState => ({
                ...prevState,
                loading: true
            }))
            let datas = {
                key: KEY,
                source: SOURCE,
                app_access_token: state.accessToken
            }
            const response = await Apis.sign_out(datas);
            if (__DEV__) {
                console.log('SignOut', JSON.stringify(response))
            }
            if (response.status) {
                await Context?.onClearStoreData();
            } else {
                props.navigation.openDrawer();
            }
            setState(prevState => ({
                ...prevState,
                loading: false
            }));
            Toast.show(response.message, Toast.LONG);
        } catch (error) {
            if (__DEV__) {
                console.log(error)
            }
            Toast.show('Something Went Wrong', Toast.LONG);
        }
    })

    const Icon = ({ props, source }) => (
        <Image source={source} style={{ width: props?.size, height: props?.size, tintColor: props?.color, resizeMode: 'contain' }} />
    )

    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.drawerTopContent}>
                <Image source={ImagePath.logo} style={styles.drawerLogo} />
                <Text style={styles.drawerNametext}>{state?.data?.Name ? state?.data?.Name : state?.userdata?.name}</Text>
                <View style={styles.border} />
            </View>
            <DrawerItemList {...props} />
            <DrawerItem
                label="Sign Out"
                onPress={onSignOut}
                labelStyle={styles.menuText}
                icon={(props) => (<Icon source={ImagePath.logout} props={props} />)}
                pressColor={Colors.light_green}
            />
            {state.loading && (
                <LoaderNew />
            )}
        </DrawerContentScrollView>
    )
}

export default CustomDrawerContent