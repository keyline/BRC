import { StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './App/Navigation/AuthStack';
import DrawerStack from './App/Navigation/DrawerStack';
import { clearAllData, getAccessToken, getUserData } from './App/Services/AsyncStorage';
import AuthContext from './App/Services/Context';
import { Colors } from './App/Utils/Colors';

const App = () => {

  const [state, setState] = useState({
    isLogin: false,
    userdata: null,
    accesstoken: null
  })

  useEffect(() => {
    // onClearStoreData();
    onGetStoreData();
    splashHide();
  }, [])

  const splashHide = () => {
    try {
      setTimeout(() => {
        SplashScreen.hide();
      }, 2500);
    } catch (error) {
      if (__DEV__) {
        console.log('SplashError', error);
      }
    }
  }

  const onGetStoreData = async () => {
    let userdata = await getUserData();
    console.log('UserData', userdata);
    if (userdata) {
      setState(prevState => ({
        ...prevState,
        userdata: userdata,
        // isLogin: true
      }))
    } else {
      setState(prevState => ({
        ...prevState,
        userdata: null,
        // isLogin: false
      }))
    }
    let accesstoken = await getAccessToken();
    // console.log('token', accesstoken)
    if (accesstoken) {
      setState(prevState => ({
        ...prevState,
        accesstoken: accesstoken,
        isLogin: true
      }))
    } else {
      setState(prevState => ({
        ...prevState,
        accesstoken: null,
        isLogin: false
      }))
    }
  }

  const onClearStoreData = async () => {
    let value = await clearAllData();
    if (value) {
      setState(prevState => ({
        ...prevState,
        isLogin: false,
        userdata: null,
        accesstoken: null
      }))
    } else {
      if (__DEV__) {
        console.log('AsyncStorage Error')
      }
    }
  }

  return (
    <AuthContext.Provider value={{ onGetStoreData, onClearStoreData, allData: state }}>
      <NavigationContainer>
        <StatusBar backgroundColor={Colors.brown} barStyle={'light-content'} />
        {state.isLogin ?
          <DrawerStack />
          :
          <AuthStack initialRouteName={'Login'} />
        }
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

export default App