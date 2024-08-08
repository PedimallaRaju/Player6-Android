import { View, Text, ScrollView, KeyboardAvoidingView, Image, PermissionsAndroid, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackgroundImage from '../backgroundImage/BackgroundImage'
import CustomImage from '../customComponents/CustomImage'
import CustomButton from '../customComponents/CustomButton'
import { styles } from './Login.styles'
import CustomTextInput from '../customComponents/CustomTextInput'
import { WaveHand } from '../../../assets'
import WithProgress from '../LoadingOverlay/WithProgress'
import Services from '../../../Services/Services'
import Toast from 'react-native-toast-message'
import UserStore from '../../stores/UserStore'
import NetInfo from '@react-native-community/netinfo';
import Functions from '../Functions'
import Popup from '../customComponents/Popup'
import SmsPopup from '../customComponents/SmsPopup'
import ReactMoE, {
  MoEProperties,
} from "react-native-moengage";


const Login = ({navigation,showProgress,hideProgress}) => {
  const [mobileNumber, setMobileNumber] = useState(__DEV__ ? '' : '');
  const [email, setEmail] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState('');
  const [askSms, setaskSms] = useState(false);




  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log("Login Page is Loaded");
      Functions.getInstance().checkInternetConnectivity();
      getData();
      
    });
    return () => unsubscribe();
  }, ([navigation]));


  const getData = async() =>{
    // Functions.getInstance().requestSMSPermission().then(res=>{
    //   if(res){
    //     Functions.getInstance().requestNotificationPermission().then(res=>{
    //     });
        
    //   }
    //   else{
    //     Functions.getInstance().requestNotificationPermission().then(res=>{
    //     });
    //   }
    // })
    Functions.getInstance().requestNotificationPermission().then(res=>{
    });
  }






  const renderHeader = () => {
    return (
      <>
        <View style={styles.dash}></View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Image style={styles.imageContentView} source={WaveHand} />
        </View>
        <Text style={styles.verifyText}>Login to Your Account</Text>
      </>
    );
  };



  const renderFooter = () => {
    return (
      <>
        <View style={styles.footerTextContainer}>
          <Text style={styles.dontText}>Don't have an account?</Text>
          <Text style={styles.signupText} onPress={() => handleSignup()}>
            Sign Up
          </Text>
        </View>
      </>
    );
  };


 const handleSignup = () =>{
    let properties = new MoEProperties();
    properties.addAttribute("Welcome", true);
    ReactMoE.trackEvent("Sign-Up", properties);
    navigation.navigate("Signup");
  }






  const requestOtp = () => {
    var regex = new RegExp(
      '^([a-zA-Z0-9_\\.-])+@(([a-zA-Z0-9-])+\\.)+([a-zA-Z0-9]{2,4})|(^[0-9]{10})+$'
    );
  
    if (mobileNumber) {
      if (!regex.test(mobileNumber)) {
        setMobileNumberError('Please enter a valid email address or phone number');
      } else {
        setMobileNumberError('');
        sendOTP();
      }
    } else {
      setMobileNumberError('Mobile number or Email is required');
    }
  }



  const sendOTP = () =>{
    showProgress();
    let properties = new MoEProperties();
    properties.addAttribute("login_clicked", true);
    ReactMoE.trackEvent("click_login", properties);
    const obj = {
      mnumber : mobileNumber
    }
    UserStore.setMobileNumber(mobileNumber);
    Services.getInstance().Login(obj).then((result)=>{
      console.log(JSON.stringify(result));
      hideProgress();
      if(result.status == 200){
        navigation.navigate('OTP',{Otp: 'login', userId : result.userId});
      }
      else if(result.status == 401){
        Functions.getInstance().Toast("error", result.error);
      }
      else{
        Functions.getInstance().Toast("error", "Unable to fetch the data from server");
      }      
    })
  }


  return (
    <BackgroundImage>
      <StatusBar backgroundColor="#111111" />
      <CustomImage />
      <View style={styles.loginformContainer}>
        <ScrollView contentContainerStyle={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.keyboardAvoidingContainer}>
            {renderHeader()}
            <CustomTextInput
              placeholder="Email ID / Mobile Number"
              keyboardType="email-address"
              onChangeText={text => setMobileNumber(text)}
              value={mobileNumber}
              error={mobileNumberError} // Show error message if there's a validation error
            />
          </KeyboardAvoidingView>
        </ScrollView>
        <View style={styles.otpContainer}>
          <CustomButton btnLabel="REQUEST OTP" onPress={() => requestOtp()} />
        </View>
        {renderFooter()}
        <Text style={styles.fieldBetweentext}></Text>
        {askSms ?
        <SmsPopup 
          isVisible = {true}
        />
        :""}
      </View>
    </BackgroundImage>
  )
}

export default WithProgress(Login)