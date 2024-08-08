import React, { useEffect, useState } from 'react'
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import LaunchRoutes from './routes/launchingRoutes/LaunchRoutes';
import CustomAlert from './components/screens/customComponents/CustomAlert';
import Toast from 'react-native-toast-message';
import NetworkStatus from './components/NetworkStatus';
import messaging, { firebase } from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import {Provider } from 'mobx-react';
import UserStore from './components/stores/UserStore';
import Functions from './components/screens/Functions';
import analytics from '@react-native-firebase/analytics'
import { Adjust, AdjustEvent, AdjustConfig } from 'react-native-adjust';
import { Settings } from 'react-native-fbsdk-next';
import ReactMoE, { MoEngageNudgePosition } from 'react-native-moengage';
import { Text, View } from 'react-native';

//Experiments
import Draft from './components/screens/draft/Draft';

// AdjustConfig.EnvironmentSandbox
// AdjustConfig.EnvironmentProduction

export const navigationRef = createNavigationContainerRef();
export default function App() {
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    getData();
    //Adjust
    const adjustConfig = new AdjustConfig("r3v0oia4jda8",  AdjustConfig.EnvironmentProduction);
    // adjustConfig.setLogLevel(AdjustConfig.LogLevelVerbose); 
    Adjust.create(adjustConfig);
    //FaceBook
    Settings.initializeSDK();
    Settings.setAppID('3807314966219919');
    //MoEngage
    ReactMoE.initialize("SSI7KGYBNVPE0JVDBQXQUFC9");
    ReactMoE.enableAdIdTracking();
    ReactMoE.showInApp();
    ReactMoE.showNudge();
    ReactMoE.showNudge(MoEngageNudgePosition._NUDGE_POSITION);       

 // Subscribe to incoming FCM messages
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived while the app is in the foreground:', remoteMessage);
      Functions.getInstance().ForgroundNotificationsToast("notification", remoteMessage.notification.body);
    });
  // Handle permission response after permission request
    ReactMoE.pushPermissionResponseAndroid(true);
    onRequestNotificationPermission();
   // Set up notification channels if permission is already granted
   setupNotificationChannels();
   // Request notification permission
   requestNotificationPermission();
    return unsubscribe;
  }, []);
  
  const onRequestNotificationPermission = () => {
    // Increment request count
    setRequestCount(prevCount => prevCount + 1);
    // Update the permission request count in the MoEngage SDK
    ReactMoE.updatePushPermissionRequestCountAndroid(requestCount);
  };

  const setupNotificationChannels = () => {
    // Set up notification channels for showing push notifications
    ReactMoE.setupNotificationChannelsAndroid();
  };

  const requestNotificationPermission = () => {
    // Request permission for push notifications
    ReactMoE.requestPushPermissionAndroid();
  };

  const getData = async()=>{
    const userInfo = JSON.parse(await AsyncStorage.getItem("player6-userdata"));

  }
    



  const toastConfig = {
    success: (internalState) => (
      <CustomAlert title={internalState.text1} message={internalState.text2} bgColor={'#117a2e'} style={{position: 'bottom'}}/>
    ),
    error: (internalState) => (
      <CustomAlert title={internalState.text1} message={internalState.text2} bgColor={'#e55656'} style={{position: 'bottom'}}/>
    ),
    warning: (internalState) => (
      <CustomAlert title={internalState.text1} message={internalState.text2} bgColor={'orange'} style={{position: 'bottom'}}/>
    ),
    notification: (internalState) => (
      <CustomAlert title={internalState.text1} message="Notification" bgColor={'white'}/>
    ),
  };
  return (
    <NavigationContainer ref={navigationRef}>
      <Provider UserStore = {UserStore}>
        {/* <Draft/> */}
      <LaunchRoutes/>
      <Toast config={toastConfig} />
      <NetworkStatus/>
      </Provider>
    </NavigationContainer>
  )
}