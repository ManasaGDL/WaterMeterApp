import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const WaterConsumptionCard = ({details}) => {
  return (
    <View  className=" m-1">
    <Text className="font-psemibold text-gray-600">
      MS No:{'  ' }{details.ms_no}</Text>
      <Text className="font-psemibold text-gray-600">
      Prev Month:{'  ' }{details.prev_month} KL</Text>
      <Text className="font-psemibold text-gray-600">
      Current Month:{'  ' }{details.current_month} KL</Text>
      <Text className="font-psemibold text-gray-600">
      Average Usage:{'  ' }{details.avg_usage}KL/day</Text>
  </View>
  )
}

export default WaterConsumptionCard

const styles = StyleSheet.create({})