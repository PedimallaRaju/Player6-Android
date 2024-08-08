import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash1 from '../../components/screens/splash/Splash1';
import Splash3 from '../../components/screens/splash/Splash3';
import Login from '../../components/screens/authorization/Login';
import PagerViewSlides from '../../components/screens/splash/PagerViewSlides';
import Signup from '../../components/screens/authorization/Signup';
import RequestOTP from '../../components/screens/authorization/RequestOTP';
import DrawerStack from '../../components/screens/drawerStack/DrawerStack';








const LaunchStack = createNativeStackNavigator();

export default function LaunchRoutes() {
  return (
      <LaunchStack.Navigator screenOptions={{headerShown:false}}>
        <LaunchStack.Screen name="Splash1" component={Splash1} />
        <LaunchStack.Screen name="Splash2" component={PagerViewSlides} />
        <LaunchStack.Screen name="Splash3" component={Splash3} />
        <LaunchStack.Screen name="Login" component={Login} />
        <LaunchStack.Screen name='Signup' component={Signup} />
        <LaunchStack.Screen name='OTP' component={RequestOTP} />
        <LaunchStack.Screen name='DrawerStack' component={DrawerStack} />
      </LaunchStack.Navigator>
  )
}