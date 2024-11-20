import { StyleSheet, Text, View ,Image ,TouchableOpacity ,} from 'react-native'
import React from 'react'
import { StatusBar } from "expo-status-bar";
import { icons } from "../../constants"
import { Tabs , Redirect} from "expo-router"
import { router} from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuth from '../api/useAuth'
import WaterMeterOCR from './WaterMeterOCR';
const TabIcon = ({ icon, color, name, focused, isIonicons }) => {
    return (
        <View className="items-center justify-center" style={{ minWidth: 80 }}>
           
            { 
                isIonicons 
                    ? <Ionicons name={icon} size={24} color={color} /> 
                    : <Image source={icon} focused={focused} 
                        resizeMode='contain' tintColor={color} className="w-5 h-5" />
            }
            <Text 
          
              className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs text-white `}>
              {name}
            </Text>
        </View>
    );
}

const TabsLayout = () => {
    const { isAuthenticated} = useAuth()
    const handleLogout = async() => {
        // Add your logout logic here (e.g., clearing tokens, redirecting to login page)
        await AsyncStorage.removeItem('accessToken')
        await AsyncStorage.removeItem('refreshToken')
        
        router.push("/")
        console.log("Logging out...");
      };
    
      const CustomHeader = () => (
        <View className="flex-row items-center justify-between p-4 ">
          <Text className="text-lg text-white font-bold">Welcome {AsyncStorage.getItem("user")}!,</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Text className="text-red-500 text-base border border-b-teal-600 rounded p-2">Logout</Text>
          </TouchableOpacity>
        </View>
      );
  return (
    <View className="flex-1  bg-gray-100">
        <CustomHeader/>
   <Tabs 
   screenOptions={{
    tabBarShowLabel:false,
    tabBarActiveTintColor:"#FFA001",
    tabBarInactiveTintColor:"#CDCDE0",
    tabBarStyle:{
        backgroundColor:"#161622",
    borderTopWidth:1,
 
    
   }}
   }
   >
    <Tabs.Screen name="usage"
    options={{
        title:'usage',
        headerShown:false,
        tabBarIcon:({color , focused})=>(
             <TabIcon icon = "speedometer-sharp"  color ={ color}  isIonicons={true}
             focused={focused} name="Usage"
             ></TabIcon>
        )
    }}
    />
    <Tabs.Screen name="bookmark"
    options={{
        title:'BookMark',
        headerShown:false,
        tabBarIcon:({color , focused})=>(
             <TabIcon icon = "calculator" color ={ color} isIonicons={true}
             focused={focused} name="Billing"
             ></TabIcon>
        )
    }}
    />
     <Tabs.Screen name="WaterMeterOCR"
    options={{
        title:'Scan',
        headerShown:false,
        tabBarIcon:({color , focused})=>(
             <TabIcon icon = "camera" color ={ color} isIonicons={true}
             focused={focused} name="Scan"
             ></TabIcon>
        )
    }}
    />
    <Tabs.Screen name="profile"
    options={{
        title:'Profile',
        headerShown:false,
        tabBarIcon:({color , focused})=>(
             <TabIcon icon = {icons.profile} color ={ color}
             focused={focused} name="Profile"
             ></TabIcon>
        )
    }}
    />
    <Tabs.Screen name="home"
    options={{
        title:'Home',
        headerShown:false,
        tabBarIcon:({color , focused})=>(
             <TabIcon icon = {icons.home} color ={ color}
             focused={focused} name="Home"
             ></TabIcon>
        )
    }}
    />
   </Tabs>
   
   </View>
  )
}

export default TabsLayout

const styles = StyleSheet.create({})