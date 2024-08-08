import { View, Text, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Image, StatusBar  } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackgroundImage from '../backgroundImage/BackgroundImage'
import CustomImage from '../customComponents/CustomImage'
import CustomButton from '../customComponents/CustomButton'
import CustomTextInput from '../customComponents/CustomTextInput'
import { styles } from './Signup.styles'
import WithProgress from '../LoadingOverlay/WithProgress'
import Services from '../../../Services/Services'
import Toast from 'react-native-toast-message'
import UserStore from '../../stores/UserStore'
import Functions from '../Functions'
import Icon from 'react-native-vector-icons/FontAwesome';
import { BackIcon, CorrectIcon, TickIcon } from '../../../assets'
import GameRulesPopup from '../customComponents/GameRulesPopup'
import TermsPopup from '../customComponents/TermsPopup'
import PrivacyPopup from '../customComponents/PrivacyPopup'
import ReactMoE, {
  MoEProperties,
} from "react-native-moengage";
import { Adjust, AdjustEvent, AdjustConfig } from 'react-native-adjust';





const Signup = ({navigation,showProgress,hideProgress}) => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumberError, setMobileNumberError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [ageError, setAgeError] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [gameRules, setGameRules] = useState(false);
    const [terms, setTerms] = useState(false);
    const [privacy, setPrivacy] = useState(false);
    const toggleCheckbox = () => {
      setIsChecked(!isChecked);
    };


    // const handleEventAdjust1=async(mobileNumber, email)=>{
    //   // const userInfo = JSON.parse(await AsyncStorage.getItem("player6-userdata"));
    //   // const userPf = JSON.parse(await AsyncStorage.getItem("player6-profile"));
    //   const adjustConfig = new AdjustConfig("r3v0oia4jda8", AdjustConfig.EnvironmentSandbox);
    //   adjustConfig.setLogLevel(AdjustConfig.LogLevelVerbose);
    //   const adjustEvent = new AdjustEvent("t7ve8d");
    //   // var adjustEvent = new AdjustEvent(eventToken);
    //   adjustEvent.addCallbackParameter({
    //     // "userId" : userInfo.userId,
    //     "email" : email,
    //     "Phone" : mobileNumber
    //   });
    //   Adjust.trackEvent(adjustEvent);
    //   Adjust.create(adjustConfig);
    // }
    const handleEventAdjust1 = async (mobileNumber, email) => {
      try {
        const adjustConfig = new AdjustConfig("r3v0oia4jda8", AdjustConfig.EnvironmentSandbox);
        adjustConfig.setLogLevel(AdjustConfig.LogLevelVerbose);
        const adjustEvent = new AdjustEvent("t7ve8d");
        adjustEvent.addCallbackParameter({
          "email": email,
          "Phone": mobileNumber
        });
        
        // Track the Adjust event
        Adjust.trackEvent(adjustEvent);   
        console.log("Event tracked successfully SignUp adjust");
      } catch (error) {
        console.error("Error tracking event:", error);
      }
    };
    


    const renderHeader = () => {
        return (
          <>
            <View style={styles.dash}></View>
            <Text style={styles.welcomeText}>Welcome!</Text>
            <Text style={styles.verifyText}>Verify With</Text></>
        )
      }
    
      const renderFooter = () => {
        return (
          <>
            <View style={[styles.footerTextContainer, {marginBottom : 100}]}>
              <TouchableOpacity>
                <Text style={[styles.alreadytext, {marginBottom : 100}]}>Already have an account?</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigateToLogin()}>
                <Text style={[styles.logintext, {marginBottom : 100}]}>Log in</Text>
              </TouchableOpacity>
            </View>
            </>
        )
      }


      useEffect(() => {
        setMobileNumber("");
        setEmail("");
        setMobileNumberError("");
        setEmailError("");
        setAgeError("");
        const unsubscribe = navigation.addListener('focus', () => {
          // Functions.getInstance().checkInternetConnectivity().then((state)=>{
          //   // console.log(state);
          // })        
        });
        return () => unsubscribe();
      }, ([navigation]));




 // Validation functions
      const validateMobileNumber = () => {
        if (!mobileNumber) {
          setMobileNumberError('Mobile number is required');
          return false;
        } else if (!/^\d{10}$/.test(mobileNumber)) {
          setMobileNumberError('Invalid Please enter a 10-digit number.');
          return false;
        }
        setMobileNumberError('');
        return true;
      };





      const validateEmail = () => {
        var regex = new RegExp(
          '^([a-zA-Z0-9_\\.-])+@(([a-zA-Z0-9-])+\\.)+([a-zA-Z0-9]{2,4})'
        );
        
        if (!email) {
          setEmailError('Email is required');
          return false;
        } else if (!regex.test(email)) {
          setEmailError('Invalid email address');
          return false;
        }
        else{
          setEmailError('');
          return true;
        }
      };


      const requestOtp = () =>{
        if(!isChecked){
          setAgeError("You must be over the age of 18 to proceed");
          validateMobileNumber();
          validateEmail();
        }
        else{
          setAgeError("");
          const isMobileNumberValid = validateMobileNumber();
          const isEmailValid = validateEmail();
          if(isMobileNumberValid && isEmailValid){
            showProgress();

            let properties = new MoEProperties();
            properties.addAttribute("Signup-Request OTP", true);
            ReactMoE.trackEvent("Sign-Up", properties);
            // Functions.getInstance().fireAdjustEvent("t7ve8d");  
            const obj = {
              mnumber: mobileNumber,
              email: email
            }
            UserStore.setMobileNumber(mobileNumber);
            handleEventAdjust1(obj.mnumber,obj.email);
            UserStore.setEmailAddress(email);
            Services.getInstance().Signup(obj).then((result)=>{
              hideProgress();
              if(result.status == 200){
                navigation.navigate('OTP',{Otp: 'signup', userId : result.id});
              }
              else if(result.status == 401){
                Functions.getInstance().Toast("error", result.error);
              }
              else{
                Functions.getInstance().Toast("error", "Unable to fetch the data from server");
              }
            })
          }
        }

      }



      navigateToLogin = () =>{
        navigation.navigate("Login");
      }




  return (
    <BackgroundImage>
      <StatusBar backgroundColor="#111111" />
      <CustomImage />
      <View style={styles.loginformContainer}>
        {renderHeader()}
        <CustomTextInput
          placeholder="Your Mobile Number"
          keyboardType="numeric"
          onChangeText={(text) =>{
            if(text.length > 10){
              Keyboard.dismiss();
            }
            else{
              setMobileNumber(text)
            } 
            }
          }
          value={mobileNumber}
          error={mobileNumberError} // Show error message if there's a validation error
        />
        <View style={{ marginTop: 5 }}>
          <CustomTextInput
            placeholder="Your Email"
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
            value={email}
            error={emailError} // Show error message if there's a validation error
          />
        </View>
        <View>
        <TouchableWithoutFeedback onPress={()=>toggleCheckbox()}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            width: 24,
            height: 24,
            borderWidth: 1,
            borderColor: 'white',
            borderRadius: 4,
            marginRight: 8,
            marginTop : 2,
            marginBottom : 10,
            backgroundColor: isChecked ? '#246afe' : 'transparent',
          }}
        >
          {isChecked && (
            <Image style={styles.backIcon} source={TickIcon} />
          )}
        </View>
        <Text style={styles.alreadytext}>I am 18+</Text>
      </View>
    </TouchableWithoutFeedback>
        </View>
        <View style={{flexDirection : 'row', flexWrap :'wrap'}}>
        <Text style={styles.terms}>By Signing up, You are agreeing to our </Text>
        <TouchableOpacity onPress={()=>{setTerms(true)}}> 
          <Text style={[styles.terms,{textDecorationLine: "underline"}]}>terms & conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{setGameRules(true)}}> 
          <Text style={[styles.terms, {textDecorationLine: "underline"}]}> game rules</Text>
        </TouchableOpacity>
        <Text style={[styles.terms]}>&nbsp; &</Text>
        <TouchableOpacity onPress={()=>{setPrivacy(true)}}> 
          <Text style={[styles.terms,{textDecorationLine: "underline"}]}> privacy policy</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.err}>{ageError}</Text>

        <View style={styles.otpContainer}>
          <CustomButton btnLabel="REQUEST OTP" onPress={() => requestOtp()}/>
        </View>
        {renderFooter()}
      </View>

      {gameRules ? 
            <GameRulesPopup
                onClose={() => setGameRules(false)} 
            />
            : "" }

      {terms ? 
            <TermsPopup
                onClose={() => setTerms(false)} 
            />
            : "" }

      {privacy ? 
            <PrivacyPopup
                onClose={() => setPrivacy(false)} 
            />
            : "" }
    </BackgroundImage>
  )
}

export default WithProgress(Signup)