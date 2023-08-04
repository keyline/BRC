import { View, Text, Image } from 'react-native'
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
import CustomDrawerContent from './CustomDrawerContent';
import { Colors } from '../Utils/Colors';
import { ImagePath } from '../Utils/ImagePath';
import { styles } from './styles';
import SportsBooking from '../Component/SportsBooking';
import OtpVerify from '../Component/OtpVerify';
import MyBooking from '../Component/MyBooking';

const Drawer = createDrawerNavigator();

const Profilestack = createNativeStackNavigator();

const ProfileStack = () => (
  <Profilestack.Navigator screenOptions={{ headerShown: false }}>
    <Profilestack.Screen name='MyProfile' component={MyProfile} />
    {/* <Profilestack.Screen name='EditProfile' component={EditProfile} /> */}
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

const SportBookingstack = createNativeStackNavigator();

const SportBookingStack = () => (
  <SportBookingstack.Navigator screenOptions={{ headerShown: false }}>
    <SportBookingstack.Screen name='SportsBooking' component={SportsBooking} />
    <SportBookingstack.Screen name='OtpVerify' component={OtpVerify} />
  </SportBookingstack.Navigator>
)

const Icon = ({ props, source }) => (
  <Image source={source} style={{ width: props?.size, height: props?.size, tintColor: props?.color, resizeMode: 'contain' }} />
)

const DrawerStack = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerItemStyle: { paddingVertical: 0, },
        drawerActiveTintColor: Colors.light_green,
        // overlayColor: 'transparent',
        drawerStyle: {
          borderTopRightRadius: 40,
          borderBottomRightRadius: 40,
          borderWidth: 4,
          borderColor: Colors.light_blue,
          backgroundColor: Colors.morelight_yellow
        }
      }}

      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        options={{
          drawerLabel: 'My Profile',
          drawerLabelStyle: styles.menuText,
          drawerIcon: (props) => (<Icon source={ImagePath.user} props={props} />)
        }}
        name='MyProfile'
        component={MyProfile} />

      <Drawer.Screen
        options={{
          drawerLabel: 'Edit Profile',
          drawerLabelStyle: styles.menuText,
          drawerIcon: (props) => (<Icon source={ImagePath.edit_profile} props={props} />)
        }}
        name='EditProfile'
        component={EditProfile} />

      <Drawer.Screen
        options={{
          drawerLabel: 'Change Password',
          drawerLabelStyle: styles.menuText,
          drawerIcon: (props) => (<Icon source={ImagePath.lock} props={props} />)
        }}
        name='ChangePassword'
        component={ChangePassword} />

      <Drawer.Screen
        options={{
          drawerLabel: 'My Booking',
          drawerLabelStyle: styles.menuText,
          drawerIcon: (props) => (<Icon source={ImagePath.mybooking} props={props} />)
        }}
        name="MyBooking"
        component={MyBooking} />

      <Drawer.Screen
        options={{
          drawerLabel: 'My Bills',
          drawerLabelStyle: styles.menuText,
          drawerIcon: (props) => (<Icon source={ImagePath.bill} props={props} />)
        }}
        name="MyBills"
        component={MyBills} />

      <Drawer.Screen
        options={{
          drawerLabel: 'Payment List',
          drawerLabelStyle: styles.menuText,
          drawerIcon: (props) => (<Icon source={ImagePath.payment_list} props={props} />)
        }}
        name="PaymentStack"
        component={PaymentStack} />

      <Drawer.Screen
        options={{
          drawerLabel: 'Table Booking',
          drawerLabelStyle: styles.menuText,
          drawerIcon: (props) => (<Icon source={ImagePath.table} props={props} />)
        }}
        name="TableBookingStack"
        component={TableBookingStack} />

      <Drawer.Screen
        options={{
          drawerLabel: 'Sports Booking',
          drawerLabelStyle: styles.menuText,
          drawerIcon: (props) => (<Icon source={ImagePath.sports} props={props} />)
        }}
        name="SportBookingStack"
        component={SportBookingStack} />

    </Drawer.Navigator>
  )
}

export default DrawerStack