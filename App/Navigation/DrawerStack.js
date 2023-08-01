import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyProfile from '../Component/MyProfile';
import EditProfile from '../Component/EditProfile';
import ChangePassword from '../Component/ChangePassword';
import MyBills from '../Component/MyBills';
import PaymentList from '../Component/PaymentList';
import PaymentDetails from '../Component/PaymentDetails';
import TableBooking from '../Component/TableBooking';

const Drawer = createDrawerNavigator();

const Profilestack = createNativeStackNavigator();

const ProfileStack = () => (
  <Profilestack.Navigator screenOptions={{ headerShown: false }}>
    <Profilestack.Screen name='MyProfile' component={MyProfile} />
    <Profilestack.Screen name='EditProfile' component={EditProfile} />
  </Profilestack.Navigator>
)

const Paymentstack = createNativeStackNavigator();

const PaymentStack = () => (
  <Paymentstack.Navigator screenOptions={{ headerShown: false }}>
    <Paymentstack.Screen name='PaymentList' component={PaymentList} />
    <Paymentstack.Screen name='PaymentDetails' component={PaymentDetails} />
  </Paymentstack.Navigator>
)

const TableBookingstack = createNativeStackNavigator();

const TableBookingStack = () => (
  <TableBookingstack.Navigator screenOptions={{ headerShown: false }}>
    <TableBookingstack.Screen name='TableBooking' component={TableBooking} />
  </TableBookingstack.Navigator>
)

const DrawerStack = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name='ProfileStack' component={ProfileStack} />
      {/* <Drawer.Screen name='MyProfile' component={MyProfile} /> */}
      {/* <Drawer.Screen name='EditProfile' component={EditProfile} /> */}
      <Drawer.Screen name='ChangePassword' component={ChangePassword} />
      {/* <DrawerItem label={'Sign Out'} onPress={()=> console.log('signout')} /> */}
      <Drawer.Screen name="MyBills" component={MyBills} />
      <Drawer.Screen name="PaymentStack" component={PaymentStack} />
      <Drawer.Screen name="TableBookingStack" component={TableBookingStack} />
    </Drawer.Navigator>
  )
}

export default DrawerStack