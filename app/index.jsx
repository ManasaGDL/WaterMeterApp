import {  Text, View ,Image, SafeAreaView, StatusBar} from 'react-native'
import React from 'react'
import { Link , Redirect, useRouter } from 'expo-router'
import CustomButton from './components/CustomButton';

import { FontAwesome5 } from '@expo/vector-icons'; 

import { PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuth from './api/useAuth';
const App = () => {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  // const { isLoading , isAuthenticated} = useGlobalContext()
  // console.log("logged",isAuthenticated,AsyncStorage.getItem("accessToken"),isLoading)
  if( isAuthenticated)
    return <Redirect href="/home"/>
  return (
    <PaperProvider>
    <SafeAreaView className="flex-1 items-center justify-center bg-white text-3xl">
    
      <FontAwesome5 name="hand-holding-water" size={100} color="#104bbc" />
<CustomButton handlePress = {()=>{ router.push('/sign-in')}} title="Sign In" customStyles="w-1/2 mt-10"/>
   {/* <Link href="/home" style={{ color:'blue' }} className="text-xl font-pregular">Sign In</Link> */}
    <StatusBar backgroundColor={'#161622'} />
    </SafeAreaView>
    </PaperProvider>
  )
}

export default App

