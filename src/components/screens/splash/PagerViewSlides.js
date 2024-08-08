import { View, Text } from 'react-native'
import React from 'react'
import Splash2 from './Splash2'
import Splash3 from './Splash3'
import PagerView from 'react-native-pager-view';


const PagerViewSlides = ({navigation}) => {


    const navigateToLogin = () => {
        navigation?.navigate('Login');
      };




  return (
    <PagerView style={{ flex: 1 }} initialPage={0}>
      <View key="1">
        <Splash2 onPress={() => navigateToLogin()} />
      </View>
      <View key="2">
        <Splash3 onPress={() => navigateToLogin()} />
      </View>
    </PagerView>
  )
}

export default PagerViewSlides