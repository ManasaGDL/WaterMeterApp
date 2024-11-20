import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TextComponent = ({name,value, customStyles}) => {
   
  return (
    <View  className="flex-row mb-1 ">
      <Text className="font-psemibold text-gray-600">
        {name}:{'  ' }</Text>
        <Text className={customStyles}>{value}</Text>
    </View>
  )
}

export default TextComponent

