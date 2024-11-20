import { axios_instance} from "./axiosInstance"
import ENDPOINTS from "./endpoints"
import AsyncStorage from '@react-native-async-storage/async-storage';


export const login = async (username, password) => {
    try {
        
        const response = await axios_instance.post(ENDPOINTS.TOKEN_PAIR, {
            email: username, 
            password,
        });
        console.log("Response from server:", response.data);
        const { access, refresh } = response.data;
        await AsyncStorage.setItem('accessToken', access)
        await AsyncStorage.setItem('refreshToken', refresh)
        console.log(access, refresh);
        return response.data;
    } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
        throw error;
    }
};



