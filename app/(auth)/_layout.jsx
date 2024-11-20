import { StyleSheet, Text, View  } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar} from 'expo-status-bar'

const AuthLayout = ({children}) => {
  return (
    <>
    <Stack screenOptions={{
      headerShown:false
    }}>
        <Stack.Screen name="sign-in"
        options={{
            headerShown:false,
          
        }}
        />
        
    </Stack>
    <StatusBar backgroundColor={'#161622'}/>
        </>
  )
}

export default AuthLayout

const styles = StyleSheet.create({})