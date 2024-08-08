import { View, Text, TouchableOpacity, Image, Keyboard, Alert, DeviceEventEmitter, AppState } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import RNOtpVerify, { startOtpListener } from 'react-native-otp-verify'
import Functions from '../Functions';
import UserStore from '../../stores/UserStore';
import Services from '../../../Services/Services';
import CustomButton from '../customComponents/CustomButton';
import BackgroundImage from '../backgroundImage/BackgroundImage';
import WithProgress from '../LoadingOverlay/WithProgress';
import { useNotification } from '../customComponents/NotificationContext';
import { styles } from '../editProfile/EditProfile.styles';
import { Close, OTP } from '../../../assets';
import CustomOtpInput from '../customComponents/CustomOtpInput';
import KycSuccessPopup from './KycSuccessPopup';
import KycRejected from './KycRejected';
import AsyncStorage from '@react-native-community/async-storage'
import ReactMoE,{
  MoEProperties,
} from "react-native-moengage";
//import kycVerfied from '../../../assets/images';
import { kycVerfied} from '../../../assets';
 const customImage = require('./Images/P6-icon-01.png');





let userInfo, source, contestPriceValue, walletBal;
const VerifyAdharOTP = ({navigation,route,showProgress,hideProgress}) => {

  const [currentTime, setCurrentTime] = useState('01:00');
  const naviGoback = useNavigation();
  const [otpValues, setOtpValues] = useState(['', '', '', '']);
  const [isKycVerified, setisKycVerified] = useState(false);
  const [isKycRejected, setisKycRejected] = useState(false);
  const otpVal = otpValues.join('');
  const notification = useNotification();
  const OtpType = route.params.OTP;
  const userId = route.params.userId;
  const adharClientId = UserStore.getAdharClientId();
  const adharNumber = UserStore.getAdharNumber();

  useEffect(() => {
      const interval = setInterval(updateTime, 1000);
      Functions.getInstance().checkInternetConnectivity();
      getData();
      // startOtpListener((message)=>{otpHandler(message)})
      // RNOtpVerify.getHash().then((hash)=>{
      //   console.log(hash)
      // });


      return () => {
        clearInterval(interval);
        // RNOtpVerify.removeListener();
      };
  }, []);




  useEffect(() => {
    const unsubscribe = navigation?.addListener('focus', () => {
      getData();
    });
    // const handleAppStateChange = (nextAppState) => {
    //   if (nextAppState === 'active') {
    //     getData();
    //   }
    // };
    // AppState.addEventListener('change', handleAppStateChange);
    return ()=>{
      unsubscribe();
      // AppState.removeEventListener('change', handleAppStateChange);
    }
  }, []);


  const getData = async()=>{
    userInfo = JSON.parse(await AsyncStorage.getItem("player6-userdata"));
    source = await AsyncStorage.getItem("from");
    contestPriceValue = await AsyncStorage.getItem('contestPriceValue');
  }


  const otpHandler = (message) =>{
    if(message){
      const otp = /(\d{6})/g.exec(message)[1];
      const digits = otp.toString().split('');
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
      Toast.show({
        type: 'error',
        text1: 'Please enter OTP',
        visibilityTime: 2000,
        position : 'bottom'
      });
    }
    else if(otpVal.length < 6){
        Toast.show({
          type: 'error',
          text1: 'Otp must contain 6 digits',
          visibilityTime: 2000,
          position : 'bottom'
        });
      }
      else{
        showProgress();
        let properties = new MoEProperties();
        properties.addAttribute("(KYC-Aadhar)> Verify OTP", true);
        ReactMoE.trackEvent("KYC verification (Aadhar)", properties);
        if(OtpType == "Adhar"){
            const obj = {
              aadhaarno : adharNumber,
              aadharClientId : adharClientId,
              aadharOtp : otpVal,
            }
            console.log(obj);
            Services.getInstance().verifyAdhar(obj, userInfo.userId, userInfo.accesToken).then((result)=>{
                hideProgress();
                console.log(result)
                //chnges here
                if(result.status == 200){
                    walletBal=result.msg.walletAmount;
                    Functions.getInstance().Toast("success", "Aadhaar Verified");
                    Functions.getInstance().fireAdjustEvent("xyri76");  //added by Venky as per req
                    UserStore.setKycSuccess("Congratulation!! You won ₹30 for successfully verifying your address");
                    setisKycVerified(true);
                }
                else if(result.status == 203){
                  UserStore.setKycError(result.error);
                  setisKycRejected(true);
                  hideProgress();
                }
                else if(result.status == 401){
                  UserStore.setKycError(result.error);
                  setisKycRejected(true);
                  hideProgress();
                }
                else{
                    UserStore.setKycError("Your KYC has been rejected");
                    setisKycRejected(true);
                }
            })
        } 
      }
      
    }





    const closePopup = () =>{
      navigation.navigate("DrawerStack");
    }



    const resend = () =>{
        showProgress();
        if(OtpType == "Adhar"){
            const obj ={
              aadhaarno: adharNumber
            }
            Services.getInstance().updateAdhar(obj,userInfo.userId,userInfo.accesToken).then((result)=>{
                console.log(result);
                hideProgress();
                if(result.status == 200){
                    Functions.getInstance().Toast("success", "OTP Sent");
                }
                else{
                    Functions.getInstance().Toast("error", "Please try again later");
                }
            })
        }
        else{
            
        }
    }





    const closeSuccess = () =>{
      setisKycVerified(false);
      let properties = new MoEProperties();
      properties.addAttribute("(KYC-Aadhar)> Okay", true);
      ReactMoE.trackEvent("KYC verification (Aadhar)", properties);
      // Functions.getInstance().fireAdjustEvent("xyri76");  commented by Venky
      console.log("walletBal " + walletBal);
      console.log("contestPriceValue " + contestPriceValue);
      console.log("source " + source);
      if((source == 'contest') && (parseFloat(contestPriceValue) <= parseFloat(walletBal) )){
        navigation.navigate("EntryFee");
      }
      else if((source == 'contest') && (parseFloat(contestPriceValue) > parseFloat(walletBal) )){
        AsyncStorage.setItem("from", "contest");
        navigation.navigate('AddMoney');
      }
      else if((source == 'wallet') && (parseFloat(contestPriceValue) <= parseFloat(walletBal))){
        navigation.navigate("EntryFee");
      }
      else if((source == 'contest') && (parseFloat(contestPriceValue) > parseFloat(walletBal) )){
        AsyncStorage.setItem("from", "contest");
        navigation.navigate('AddMoney');
      }
      else{
        navigation.navigate("UpdateProfile");
      }
    }

    const closeRejected = () =>{
      setisKycRejected(false);
      navigation.navigate("UpdateProfile");
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
            <CustomOtpInput onInputChange={handleOtpChange} otpValues = {otpValues} verifyType = "Adhar"/>
            <Text style={styles.timerText}>{currentTime}</Text>
            {/* <View style={[styles.footerBottomContainer, styles.otpcd]}>
              <Text style={styles.didnotText}>Didn’t get any code?</Text>
              <TouchableOpacity onPress={() => resend()}>
                <Text style={styles.resendText}>Click to Resend</Text>
              </TouchableOpacity>
            </View> */}
            <View style={{width: '70%'}}>
              <CustomButton onPress={requestWithOtp} btnLabel="Verify OTP" />
            </View>
            {/* <KycSuccessPopup onClose = {closePopup()}/> */}
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

            { isKycVerified ? 
              <KycSuccessPopup
                navigation={navigation}
                onClose={closeSuccess}
                imageSource={customImage}
              />
              :
              ""
            }

            { isKycRejected ? 
              <KycRejected
                navigation={navigation}
                onClose={closeRejected}  
              />
              :
              ""
            }

          </View>
        </BackgroundImage>
      )
}

export default WithProgress(VerifyAdharOTP)