import { View, Text, Image } from 'react-native'
import React from 'react'
import { ShortLogo, TrophyBat } from '../../../assets'
import { styles } from './CustomImage.styles'






const CustomImage = ({customStyle}) => {
  return (
    <>
    <View style={styles.appLogoContainer}>
        <Image style={styles.appimgView} source={ShortLogo} />
    </View>
    <View style={customStyle}>
        <Image style={styles.trophyImgView} source={TrophyBat} />
    </View>
</>
  )
}

export default CustomImage