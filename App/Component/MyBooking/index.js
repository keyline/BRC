import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import Header from '../../Container/Header'
import { styles } from './styles'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Font_Family } from '../../Utils/Fonts';
import SportsList from './SportsList';
import TableList from './TableList';
import { Colors } from '../../Utils/Colors';

const TopTab = createMaterialTopTabNavigator();

const MyBooking = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.content}>
        <TopTab.Navigator
          screenOptions={{
            tabBarStyle: { backgroundColor: "#FFFDDF", elevation: 0, height: '8%' },
            tabBarActiveTintColor: Colors.brown,
            tabBarInactiveTintColor: Colors.text_color,
            tabBarLabelStyle: { fontSize: 16, fontFamily: Font_Family.NunitoSans_Bold, fontWeight: 'bold', textTransform: "none" },
            swipeEnabled: true,
            tabBarIndicatorStyle: { borderColor: Colors.brown, borderWidth: 1.5 },
            tabBarOptions: { upperCaseLabel: true }
          }}
        >
          <TopTab.Screen name={"Table Booking"} component={TableList} />
          <TopTab.Screen name={"Sport Booking"} component={SportsList} />

        </TopTab.Navigator>
      </View>
    </SafeAreaView>
  )
}

export default MyBooking