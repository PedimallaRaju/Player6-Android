import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { styles } from './CustomButton.styles'

const CustomButton = ({ onPress, colour = '#246afe', btnLabel, width = '100%'}) => {
  return (
    <Pressable style={[styles.buttonContainer, { backgroundColor: colour }, { width }]} onPress={onPress}>
      <Text style={styles.label}>{btnLabel}</Text>
    </Pressable>
  )
}

export default CustomButton