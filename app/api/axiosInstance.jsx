import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const axios_instance = axios.create({
    baseURL:"http://192.168.1.9:8000",
    // baseURL:"http://3.110.68.184:8000/api/v1/docs",
    timeout:10000
})
 export const storeToken = async(token)=>{
    try{
    
    }catch(e)
    {

    }
 }
 const getToken = async () => {
    try {
     
      return await AsyncStorage.getItem('accessToken');
     
    } catch (error) {
      console.error("Error retrieving the token:", error);
    }
  };
axios_instance.interceptors.request.use(async(config) =>
    {
      
const token = await getToken()

if(token)
{
config.headers.Authorization = `Bearer ${token}`
}
return config

},error => Promise.reject(error)

)


axios_instance.interceptors.response.use(response=>response , async(error)=>{
    if(error.response && error.response.status === 401)
    {
        
      console.error('Unauthorized! Redirecting to login...');  
        
    }
    return Promise.reject(error);
})

