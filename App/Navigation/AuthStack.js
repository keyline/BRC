import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Component/Login';
import ForgotPassword from '../Component/ForgotPassword';

const Stack = createNativeStackNavigator();



const AuthStack = ({ initialRouteName }) => {
    return (
        <Stack.Navigator initialRouteName={initialRouteName ? initialRouteName : 'Login'} screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
        </Stack.Navigator>
    )
}

export default AuthStack