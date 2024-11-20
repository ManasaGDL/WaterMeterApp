import { Text, View , ScrollView } from 'react-native'
import React ,{ useState} from 'react'
import { router} from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../components/FormField'
import CustomButton from '../components/CustomButton'
import useAuth from '../api/useAuth'

import { Alert } from 'react-native'
const SignIn = () => {
  const [form, setForm] = useState({
    userid:'',
    password:''
  })
  const [ isLoading , setIsLoading] = useState(false)
  const { isAuthenticated, handleLogin , handleLogout} = useAuth()
  const onSubmit=async(data)=>
  {
    try{await handleLogin(form.userid, form.password)  
    router.replace("/home")
    }catch(error)
    {
      Alert.alert('Login failed', error.response?.data?.message || 'Something went wrong');
    }
  }
  return (
    <SafeAreaView className="h-full flex-1">
    <ScrollView contentContainerStyle ={{ flexGrow:1}}>
    <View className="w-full flex-1  px-4 mt-10 justify-center">
    <Text className="text-2xl text-black text-semibold mt-10 font-semibold text-center justify-center">Sign In</Text>
    <FormField title="Email" 
    otherStyles ="mt-7"
    // keyboardType="email-addess"
    placeholder = "Enter Email"
    value={form.email}
    handleChangeText={e=>setForm({...form, userid:e})}
    />
    <FormField title="Password" 
    otherStyles ="mt-7"
    // keyboardType="email-addess"
    placeholder="Enter Password"
    value={form.password}
    handleChangeText={e=>setForm({...form, password:e})}
    />
    <CustomButton title="Sign In" handlePress={onSubmit} disabled={form.userid.length<=0 || form.password.length<=0}
    customStyles = "mt-10" isLoading={isLoading}>
<View className="justify-center pt-5 flex-row gap-2">
</View>
    </CustomButton>
    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn

