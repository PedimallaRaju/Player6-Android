import { View, Text, Pressable, Image, Keyboard, Alert, DeviceEventEmitter, StatusBar } from 'react-native'
import React, {useState, useEffect} from 'react'
import CustomButton from '../customComponents/CustomButton';
import BackgroundImage from '../backgroundImage/BackgroundImage';
import CustomImage from '../customComponents/CustomImage';
import { Close, OTP } from '../../../assets';
import { styles } from './RequestOTP.styles';
import { useNavigation } from '@react-navigation/native';
import CustomOtpInput from '../customComponents/CustomOtpInput';
import { useNotification } from '../customComponents/NotificationContext';
import WithProgress from '../LoadingOverlay/WithProgress';
import Toast from 'react-native-toast-message';
import RNOtpVerify, { startOtpListener } from 'react-native-otp-verify'
import Services from '../../../Services/Services';
import UserStore from '../../stores/UserStore';
import Functions from '../Functions';
import OTPVerify from 'react-native-otp-verify';
import AsyncStorage from '@react-native-community/async-storage';
import ReactMoE from 'react-native-moengage'
import{
  MoEProperties,
} from "react-native-moengage";




const RequestOTP = ({navigation,route,showProgress,hideProgress}) => {

  const [currentTime, setCurrentTime] = useState('01:00');
  const naviGoback = useNavigation();
  const [otpValues, setOtpValues] = useState(['', '', '', '']);
  const otpVal = otpValues.join('');
  const notification = useNotification();
  const OtpType = route.params.Otp;
  const userId = route.params.userId;


  useEffect(() => {
      const interval = setInterval(updateTime, 1000);
      // Functions.getInstance().checkInternetConnectivity();
      // startOtpListener((message)=>{otpHandler(message);})
      // RNOtpVerify.getHash().then((hash)=>{
      //   console.log(hash)
      //   // Alert.alert("Hash : " + hash);
      // });


      return () => {
        clearInterval(interval);
        // RNOtpVerify.removeListener();
      };
  }, []);



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
    let properties = new MoEProperties();
    properties.addAttribute("Verify OTP", true);
    ReactMoE.trackEvent("Sign-Up", properties);
    ReactMoE.trackEvent("Login", properties);
    if(otpVal.length == 0){
      Functions.getInstance().Toast("error", "Please enter OTP");
    }
    else if(otpVal.length < 4){
      Functions.getInstance().Toast("error", "Otp must contain 4 digits");
      }
      else{
        showProgress();
        // IF User Is Coming From Login Page To Verify OTP
          const obj = {
            otp: otpVal,
            userId: userId
          }
          Services.getInstance().VerifyOTP(obj).then((result)=>{
            hideProgress();
            if(result.status == 200 && result.data){
              Functions.getInstance().getTimeStamp();
              // UserStore.updateUserData(result.data);
              Services.getInstance().getProfileData(userId, result.data.accesToken).then((result)=>{
                if(result.status == 200){
                  AsyncStorage.setItem("player6-profile", JSON.stringify(result.data));
                  AsyncStorage.setItem("Bonus-status", "null");
                  UserStore.setuserPF(result.data?.profileImg);
                  ReactMoE.setUserEmailID(`${result.data?.email}`);
                  ReactMoE.setUserName(`${result.data?.name}`);
                  ReactMoE.setUserContactNumber(`${result.data?.number}`);

                  let properties = new MoEProperties();
                  properties.addAttribute("Complete Login", true);
                  ReactMoE.trackEvent("Login", properties);
                  
                }
              })
              AsyncStorage.setItem('player6-userdata', JSON.stringify(result.data));
              ReactMoE.setUserUniqueID(result.data.userId);
              navigation.navigate("DrawerStack");
            }
            else{
              Functions.getInstance().Toast("error", result.error);
            }
          })
      }
      
    }



    const resend = () =>{
        showProgress();
        let properties = new MoEProperties();
        properties.addAttribute("Resend OTP", 1);
        ReactMoE.trackEvent("Sign-Up", properties);
        ReactMoE.trackEvent("Login", properties);
        setCurrentTime("01:00");
        const obj = {
          mnumber : UserStore.mobileNumber
        }
        Services.getInstance().Login(obj).then((result)=>{
          hideProgress();
          if(result.status == 200){
            Functions.getInstance().Toast("success", "OTP Sent");
          }
          else if(result.status == 401){
            Functions.getInstance().Toast("error", result.error);
          }
          else{
            Functions.getInstance().Toast("error", "Unable to fetch the data from server");
          }      
        })
    }






























    const renderBackgroundFooter = () => {
        return (
          <>
            <View style={styles.getStartedContainer}>
              <Text style={styles.getStartedContent}>Get Started</Text>
            </View>
          </>
        );
      };
    
      const renderFooter = () => {
        return (
          <>
            <Pressable onPress={() => handleClose()}>
              <Image source={Close} style={styles.closeIcon} />
            </Pressable>
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
              <Pressable onPress={() => resend()}>
                <Text style={styles.resendText}>Click to Resend</Text>
              </Pressable>
            </View>
            <View style={{width: '70%'}}>
              <CustomButton onPress={requestWithOtp} btnLabel="Verify OTP" />
            </View>
          </View>
        );
      };
    
      return (
        <BackgroundImage>
          <StatusBar backgroundColor="#111111" />
          <View style={{flex: 1}}>
            <View style={styles.homemain}>
              <CustomImage customStyle={styles.trophyImageContainer} />
              {renderBackgroundFooter()}
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

export default WithProgress(RequestOTP)