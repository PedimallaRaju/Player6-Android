import { View, Text, Image, StatusBar } from 'react-native'
import React from 'react'
import BackgroundImage from '../backgroundImage/BackgroundImage'
import { styles } from './SliderScreens.styles'
import { Dots2, ShortLogo, TrophyBat } from '../../../assets'
import CustomButton from '../customComponents/CustomButton'
import CustomImage from '../customComponents/CustomImage'
import ReactMoE, {
  MoEProperties,
} from "react-native-moengage";

const Splash3 = ({onPress}) => {
  return (
    <BackgroundImage>
      <StatusBar backgroundColor="#111111" />
      <View style={styles.mainContainer}>
        <CustomImage />
        <View style={styles.dotImageContainer}>
          <Image style={styles.dotsImgView} source={Dots2} />
        </View>
        <View style={styles.getStartedButtonContainer}>
          <CustomButton btnLabel="GET STARTED" onPress={() => {
            let properties = new MoEProperties();
            properties.addAttribute("clicked", true);
            ReactMoE.trackEvent("Get started", properties);
            let properties1 = new MoEProperties();
            properties1.addAttribute("On-Boarding Screen", true);
            ReactMoE.trackEvent("Sign-Up", properties1);
            onPress()
            }} />
        </View>
      </View>
    </BackgroundImage>
  )
}

export default Splash3