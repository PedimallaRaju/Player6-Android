import { View, Text, TouchableOpacity, Image, Keyboard, Alert, DeviceEventEmitter, BackHandler, AppState } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Close, OTP } from '../../../assets';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import RNOtpVerify, { startOtpListener } from 'react-native-otp-verify'
import { useNotification } from '../customComponents/NotificationContext';
import Functions from '../Functions';
import CustomOtpInput from '../customComponents/CustomOtpInput';
import CustomButton from '../customComponents/CustomButton';
import CustomImage from '../customComponents/CustomImage';
import BackgroundImage from '../backgroundImage/BackgroundImage';
import WithProgress from '../LoadingOverlay/WithProgress';
import { styles } from './EditProfile.styles';
import UserStore from '../../stores/UserStore';
import Services from '../../../Services/Services';
import AsyncStorage from '@react-native-community/async-storage';
import ReactMoE,{
  MoEProperties,
} from "react-native-moengage"; 






let userInfo;
const EnterOTP = ({navigation,route,showProgress,hideProgress}) => {

  const [currentTime, setCurrentTime] = useState('01:00');
  const naviGoback = useNavigation();
  const [otpValues, setOtpValues] = useState(['', '', '', '']);
  const otpVal = otpValues.join('');
  const notification = useNotification();
  const OtpType = route.params.OTP;
  const userId = route.params.userId;
  const number = UserStore.getMobileNumber();


  useEffect(() => {
      const interval = setInterval(updateTime, 1000);
      Functions.getInstance().checkInternetConnectivity();
      getData();
      // startOtpListener((message)=>{otpHandler(message);})
      // RNOtpVerify.getHash().then((hash)=>{
      //   console.log(hash)
      // });


      return () => {
        clearInterval(interval);
        // RNOtpVerify.removeListener();
      };
  }, []);




  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();      
    });
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate("UpdateProfile")
      return true;
    })
    // const handleAppStateChange = (nextAppState) => {
    //   if (nextAppState === 'active') {
    //     getData();
    //   }
    // };
    // AppState.addEventListener('change', handleAppStateChange);
    return () => {
      unsubscribe();
      backHandler.remove();
      // AppState.removeEventListener('change', handleAppStateChange);
    }
  }, ([navigation]));


  const getData = async()=>{
    userInfo = JSON.parse(await AsyncStorage.getItem("player6-userdata"));

  }


  const otpHandler = (message) =>{
    if(message){
      console.log(/(\d{4})/g.exec(message));
      const otp = /(\d{4})/g.exec(message)[1];
      const digits = otp.toString().split('');
      console.log(digits);
      setOtpValues(digits);
      Keyboard.dismiss();
      RNOtpVerify.removeListener();
    }

  }


  const updateTime = () => {
      setCurrentTime(prevTime => {
        const [minutes, seconds] = prevTime.split(':').map(Number);
        let newMinutes = minutes;
        let newSeconds = seconds - 1;

        if (newSeconds < 0) {
          newMinutes -= 1;
          newSeconds = 59;
        }

        if (newMinutes < 0) {
          newMinutes = 0;
          newSeconds = 0;
        }

        return `${String(newMinutes).padStart(2, '0')}:${String(
          newSeconds,
        ).padStart(2, '0')}`;
      });
    };

  
  const handleOtpChange = (newValues) => {
      setOtpValues(newValues);
    }


    
  const handleClose = () => {
      naviGoback?.goBack();
    };


  const requestWithOtp = () =>{
    if(otpVal.length == 0){
      Functions.getInstance().Toast("error", "Please enter OTP");
    }
    else if(otpVal.length < 4){
      Functions.getInstance().Toast("error", "Otp must contain 4 digits");
      }
      else{
        showProgress();
        if(OtpType == "Email"){
            const obj = {
                otp: otpVal,
                email: number
            }
            Services.getInstance().verifyEmailToMobile(obj, userInfo.userId, userInfo.accesToken).then((result)=>{
                hideProgress();
                console.log(result)
                if(result.status == 200){
                    Functions.getInstance().Toast("success", "Email Updated");
                    let properties = new MoEProperties();
                    properties.addAttribute("Verify Email OTP", true);
                    ReactMoE.trackEvent("Edit Profile", properties);
                    navigation.navigate("UpdateProfile");
                }
                else if(result.status == 401){
                  Functions.getInstance().Toast("error", result.error);
                }
                else if(result.status == 403){
                  if(result.error){
                    Functions.getInstance().Toast("error", result.error);
                  }
                  else if(result.msg.error){ 
                    Functions.getInstance().Toast("error", result.msg.error);
                  }
                  else if(result.msg[0].error){
                    Functions.getInstance().Toast("error", result.msg[0].error);
                  }
                  else{
                    Functions.getInstance().Toast("error", "Invalid details");
                  }
                }
                else{
                    Functions.getInstance().Toast("error", result.msg); 
                }
            })
        }
        else{
            const obj = {
                otp: otpVal,
                mnumber: number,
            }
            Services.getInstance().verifyOTPToMobile(obj, userInfo.userId, userInfo.accesToken).then((result)=>{
                hideProgress();
                console.log(result)
                if(result.status == 200){
                    Functions.getInstance().Toast("success", "Mobile Number Updated");
                    let properties = new MoEProperties();
                    properties.addAttribute("Phone OTP Verify", true);
                    ReactMoE.trackEvent("Edit Profile", properties);
                    navigation.navigate("UpdateProfile");
                }
                else if(result.status == 403){
                  if(result.error){
                    Functions.getInstance().Toast("error", result.error);
                  }
                  else if(result.msg.error){ 
                    Functions.getInstance().Toast("error", result.msg.error);
                  }
                  else if(result.msg[0].error){
                    Functions.getInstance().Toast("error", result.msg[0].error);
                  }
                  else{
                    Functions.getInstance().Toast("error", "Invalid details");
                  }
                }
                else{
                    Functions.getInstance().Toast("error", result.msg.error); 
                }
            })
        }
          
      }
      
    }



    const resend = () =>{
        showProgress();
        if(OtpType == "Email"){
            const obj = {
                email: number
            }
            Services.getInstance().sendOTPToEmail(obj, userInfo.userId, userInfo.accesToken).then((result)=>{
                console.log(result);
                hideProgress();
                if(result.status == 200){
                    let properties = new MoEProperties();
                    properties.addAttribute("Email OTP Resend", true);
                    ReactMoE.trackEvent("Edit Profile", properties);
                    Functions.getInstance().Toast("success", "OTP Sent");
                }
                else{
                    Functions.getInstance().Toast("error", result.error);
                }
            })
        }
        else{
            const obj = {
                mnumber: number
            }
            Services.getInstance().sendOTPToMobile(obj, userInfo.userId, userInfo.accesToken).then((result)=>{
                console.log(result);
                hideProgress();
                if(result.status == 200){
                    let properties = new MoEProperties();
                    properties.addAttribute("Phone OTP Resend", true);
                    ReactMoE.trackEvent("Edit Profile", properties);
                    Functions.getInstance().Toast("success", "OTP Sent");
                }
                else{
                    Functions.getInstance().Toast("error", result.error);
                }
            })
        }
    }





















      const renderFooter = () => {
        return (
          <>
            <TouchableOpacity onPress={() => handleClose()}>
              <Image source={Close} style={styles.closeIcon} />
            </TouchableOpacity>
            <View style={styles.lockImageContainer}>
              <Image source={OTP} style={styles.lockIcon} />
            </View>
          </>
        );
      };
    
      const renderBodyContent = () => {
        return (
          <View style={{alignItems: 'center'}}>
            <Text style={styles.checkphoneText}>Please Check Your Phone</Text>
            <Text style={styles.sendCodeText}>We’ve sent a code to your phone</Text>
            <CustomOtpInput onInputChange={handleOtpChange} otpValues = {otpValues}/>
            <Text style={styles.timerText}>{currentTime}</Text>
            <View style={[styles.footerBottomContainer, styles.otpcd]}>
              <Text style={styles.didnotText}>Didn’t get any code?</Text>
              <TouchableOpacity onPress={() => resend()}>
                <Text style={styles.resendText}>Click to Resend</Text>
              </TouchableOpacity>
            </View>
            <View style={{width: '70%'}}>
              <CustomButton onPress={requestWithOtp} btnLabel="Verify OTP" />
            </View>
          </View>
        );
      };
    
      return (
        <BackgroundImage>
          <View style={{flex: 1}}>
            <View style={styles.homemain}>
            </View>
            <View style={styles.modelContainer}>
              <View style={styles.otpmain}>
                {renderFooter()}
                {renderBodyContent()}
              </View>
            </View>
          </View>
        </BackgroundImage>
      )
}

export default WithProgress(EnterOTP)