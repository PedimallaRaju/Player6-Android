import { View, SafeAreaView, Image, Animated, Easing, StatusBar, AppState, PermissionsAndroid, Platform} from 'react-native'
import React from 'react'
import { styles } from './SplashScreen.styles'
import { Logo } from '../../../assets'
import { useEffect , useRef, useState} from "react";
import UserStore from '../../stores/UserStore';
import AsyncStorage from "@react-native-community/async-storage";
import Services from '../../../Services/Services';
import messaging from '@react-native-firebase/messaging';
import Functions from '../Functions';
import WithProgress from '../LoadingOverlay/WithProgress';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Adjust } from 'react-native-adjust';
import ReactMoE, {
  MoEProperties,
} from "react-native-moengage";



let userData, userPF;
const Splash1 = ({ navigation, showProgress, hideProgress}) => {
    const zoomValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          const zoomInAnimation = Animated.timing(zoomValue, {
            toValue: 1.3,
            duration: 1200,
            useNativeDriver: true,
          });
          zoomInAnimation.start();
          getData();
          
        });

        const listener = zoomValue.addListener(({ value }) => {
          // Handle animation value changes
        });


        return () => {
          unsubscribe();
          zoomInAnimation.stop();
          zoomValue.removeListener(listener);
        }
      }, ([navigation, zoomValue]));
    // }, ([navigation]));
    
    
      const scale = zoomValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      });



      const getData = async () =>{
        try{
            userData = JSON.parse(await AsyncStorage.getItem("player6-userdata"));
            userPF = JSON.parse(await AsyncStorage.getItem("player6-profile"));
            setTimeout(function(){
            if(userData){
              checkExpiredToken();
            }
            else{
              hideProgress();
              navigation.navigate('Splash2');
            }
          }, 1000);
        }
        catch(err){
          console.log(err);
          hideProgress();
        }
     }




     const checkExpiredToken = async() =>{
      try{
        const currentTimestamp = new Date().getTime();
        const maxExpiry = currentTimestamp + 9 * 60 * 1000;
        const minExpiry = await AsyncStorage.getItem("Expiry");
        if((currentTimestamp >= minExpiry)){
          console.log("line 305");
          Services.getInstance().regenerateToken(userData.userId, userData.refToken).then((result)=>{
            console.log(result);
            console.log("line 308");
            if(result.status == 200){
              const obj = {
                refToken : userData.refToken,
                accesToken : result.accesToken,
                userId : userData.userId,
              }
              AsyncStorage.mergeItem("player6-userdata", JSON.stringify(obj));
              const currentTimestamp = new Date().getTime();
              const newTimestamp = currentTimestamp + 45 * 60 * 1000;
              AsyncStorage.setItem("Expiry", String(newTimestamp));
              console.log("line 315");
              redirectHome();
            }
            else{
              AsyncStorage.clear();
              navigation.navigate("Login");
              return "login"
            }
          })
        }
        else{
          console.log("line 328");
          redirectHome();
        }
      }
      catch(error){
        AsyncStorage.clear();
        navigation.navigate("Login");
        return "login"
      }
     }










     const redirectHome = async()=>{
      showProgress();
      userData = JSON.parse(await AsyncStorage.getItem("player6-userdata"));
      Services.getInstance().getProfileData(userData.userId, userData.accesToken).then((result)=>{
        if(result.status == 200){
          AsyncStorage.setItem("player6-profile", JSON.stringify(result.data))
          UserStore.setuserPF(result.data?.profileImg);
        }
      })
      
      UserStore.updateUserData(userData);
      requestUserPermission();
      requestNotificationPermission();
      setTimeout(function(){
        hideProgress();
        navigation.navigate('DrawerStack');
      },1500)
     }

    









     const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    
      if (enabled) {
        getToken();
      } else {
        console.log('Permission denied');
      }
    };
    
    const getToken = async () => {
      try {
        const token = await messaging().getToken();
        console.log('Device Token:', token);
        Adjust.setPushToken(`${token}`);
        ReactMoE.passFcmPushToken(`${token}`);
        ReactMoE.passFcmPushPayload({});
        // Send this token to your server for sending push notifications
        const obj = {
          token : token
        }
        Services.getInstance().sendFcmToken(obj, userData.userId, userData.accesToken).then(result =>{
          console.log(result);
        })
      } catch (error) {
        console.error('Error getting device token:', error);
      }
    };



    const requestNotificationPermission = async () => {
      try {
        const notificationPermission =
          Platform.OS === 'ios' ? PERMISSIONS.IOS.NOTIFICATIONS : PERMISSIONS.ANDROID.POST_NOTIFICATIONS;

        const status = await check(notificationPermission);

        if (status === RESULTS.GRANTED) {
          // Permission already granted, handle accordingly
          console.log('Notification permission already granted');
        } else {
          // Permission not granted, request it
          const result = await request(notificationPermission);

          if (result === RESULTS.GRANTED) {
            console.log('Notification permission granted');
            // Handle the case where permission is granted
          } else {
            console.warn('Notification permission denied');
            // Handle the case where permission is denied
          }
        }
      } catch (error) {
        console.error('Error checking/requesting notification permission:', error);
      }
    };


    





  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar backgroundColor="#111111" />
    <View style={styles.contentContainer}>
    <Animated.View style={{ transform: [{ scale }] }}>
    <Image
        source={Logo}
        style={[
          styles.logoImage,
          {
            height: 100,
            width: 100,
          },
        ]}
      />
      </Animated.View>
    </View>
  </SafeAreaView>
  )
}

export default WithProgress(Splash1)
