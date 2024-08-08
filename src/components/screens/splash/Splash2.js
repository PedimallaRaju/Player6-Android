import { View, Text, Image, StatusBar } from 'react-native'
import React from 'react'
import BackgroundImage from '../backgroundImage/BackgroundImage'
import { TouchableOpacity } from 'react-native'
import { DhoniMain, Dots2, ShortLogo } from '../../../assets'
import { styles } from './SliderScreens.styles'
import ReactMoE, {
  MoEProperties,
} from "react-native-moengage";





const Splash2 = ({onPress}) => {
  return (
    <BackgroundImage>
      <StatusBar backgroundColor="#111111" />
        <View style={styles.mainContainer}>
        <TouchableOpacity onPress={() => {
            let properties = new MoEProperties();
            properties.addAttribute("clicked", true);
            ReactMoE.trackEvent("Skip", properties);
            onPress()
          }}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
        <View style={styles.appLogoContainer}>
          <Image style={styles.appimgView} source={ShortLogo} />
        </View>
        <View style={styles.dhoniImageContainer}>
          <Image style={styles.dhoniImgView} source={DhoniMain} />
        </View>
        <View style={styles.dotImageContainer}>
          <Image style={{transform: [{rotate: '180deg'}]}} source={Dots2} />
        </View>
      </View>
    </BackgroundImage>
  )
}
export default Splash2