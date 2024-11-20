import { TouchableOpacity, Text, View } from 'react-native'
import React from 'react'

const CustomButton = ({title , handlePress , customStyles , isLoading , disabled}) => {

  return (
   <TouchableOpacity onPress={ handlePress} disabled={disabled}
   activeOpacity={0.7}
   className={`${disabled?'bg-transparent':'bg-secondary'} rounded-xl ${customStyles} min-h-[62px] items-center justify-center`}>
      <Text  className="text-primary font-psemibold text-lg justify-center items-center">{title}</Text>
      </TouchableOpacity>
  )
}

export default CustomButton

// const styles = StyleSheet.create({})
// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const CustomButton = () => {
//   return (
//     <View>
//       <Text>CustomButton</Text>
//     </View>
//   )
// }

// export default CustomButton

// const styles = StyleSheet.create({})