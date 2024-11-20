import { StyleSheet, Text, View } from 'react-native'
import React , { useState , useEffect} from 'react'
import TextComponent from '../components/TextComponent'
import { formatLabel } from '../utilities/utilities'
import WaterConsumptionCard from '../components/WaterConsumptionCard'
import ConsumptionTable from '../components/ConsumptionTable'
const Home = () => {

const [consumptionDetails, setconsumptionDetails] = useState({
  current_month:'15000',
  prev_month:'20500',
  ms_no:'1234',
  avg_usage:'591'
})
  useEffect(()=>{

  },[])
  
  return (
    <View className="flex-1 p-4 bg-gray-100 mt-7">
    
     <View className="bg-white rounded-lg pl-1  shadow-lg mb-2">
     <WaterConsumptionCard details={consumptionDetails}/>
    
    </View>
    <View className="bg-white rounded-lg pl-1  shadow-lg mb-2">
    <ConsumptionTable/>
    </View>
    </View>
  )
}

export default Home
