import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyProfile from '../Component/MyProfile';
import EditProfile from '../Component/EditProfile';
import ChangePassword from '../Component/ChangePassword';

const Drawer = createDrawerNavigator();

const Profilestack = createNativeStackNavigator();

const ProfileStack = () => (
  <Profilestack.Navigator screenOptions={{ headerShown: false }}>
    <Profilestack.Screen name='MyProfile' component={MyProfile} />
    <Profilestack.Screen name='EditProfile' component={EditProfile} />
  </Profilestack.Navigator>
)

const DrawerStack = () => {
  return (
    <Drawer.Navigator >
      <Drawer.Screen name='ProfileStack' component={ProfileStack} />
      {/* <Drawer.Screen name='MyProfile' component={MyProfile} /> */}
      {/* <Drawer.Screen name='EditProfile' component={EditProfile} /> */}
      <Drawer.Screen name='ChangePassword' component={ChangePassword} />
      {/* <DrawerItem label={'Sign Out'} onPress={()=> console.log('signout')} /> */}
    </Drawer.Navigator>
  )
}

export default DrawerStack