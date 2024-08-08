import React, {useEffect, useState} from 'react';
import {
  Image,
  Platform,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  View,
  Keyboard,
  AppState,
  BackHandler,
} from 'react-native';
import {BackIcon, Email, Phone} from '../../../assets';
import CustomButton from '../customComponents/CustomButton';
import WithProgress from '../LoadingOverlay/WithProgress';
import { styles } from './EditProfile.styles';
import { useNotification } from '../customComponents/NotificationContext';
import UserStore from '../../stores/UserStore';
import Services from '../../../Services/Services';
import AsyncStorage from '@react-native-community/async-storage';
import Functions from '../Functions';
import { useFocusEffect } from '@react-navigation/native';






let userInfo, userPF;
const EditProfile =({navigation,route,showProgress,hideProgress}) => {
  const [nameText, setNameText] = useState('');
  const [nameError, setNameError] = useState('');
  const source = route.params.from;
  const editType = route.params.edit;
  const [placeholder, setPlaceHolder] = useState('Your New '+source);





  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log(editType)
      getData();      
    });
    // const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
    //   navigation.navigate('EditProfile');
    //   return true;
    // })
    return () => {
      unsubscribe();
      // backHandler.remove();
    }
  }, ([navigation]));




  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.goBack();
        return true;
      });

      return () => {
        backHandler.remove();
      };
    }, [])
  );



  const getData= async() =>{
    userInfo = JSON.parse(await AsyncStorage.getItem("player6-userdata")); 
    userPF = JSON.parse(await AsyncStorage.getItem("player6-profile"));
    Functions.getInstance().checkExpiration(userInfo.userId, userInfo.refToken, navigation);
    Functions.getInstance().checkInternetConnectivity();
    if(source == "Email"){
      setNameText(userPF?.email);
    }
    else{
      setNameText(userPF?.number);
    }
  }






  const handleVerifyButtonPress = async () => {
    if(source == "Email"){
        if(nameText == ""){
            setNameError('Please enter email');
        }
        else if (!validateEmail(nameText)) {
            setNameError('Please enter correct email');
            return;
          }
        else{
            setNameError('');
            UserStore.setMobileNumber(nameText);
            try {
                showProgress();
                const obj = {
                    email: nameText
                }
                Services.getInstance().sendOTPToEmail(obj, userInfo.userId, userInfo.accesToken).then((result)=>{
                    console.log(result);
                    hideProgress();
                    if(result.status == 200){
                        navigation.navigate("EnterOTP",{OTP : "Email"});
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
                        Functions.getInstance().Toast("error", result.error);
                    }
                })
                
              } catch (error) {
                console.error('API call error:', error);
                hideProgress();
              }
        }
    }
    else{
        if(nameText == ""){
            setNameError('Please enter mobile number');
        }
        else if (!validatePhone(nameText)) {
            setNameError('Please enter correct mobile number');
            return;
          }
        else{
            setNameError('');
            UserStore.setMobileNumber(nameText);
            try {
                showProgress();
                const obj = {
                    mnumber: nameText
                }
                Services.getInstance().sendOTPToMobile(obj, userInfo.userId, userInfo.accesToken).then((result)=>{
                    console.log(result);
                    hideProgress();
                    if(result.status == 200){
                        navigation.navigate("EnterOTP",{OTP : "Mobile"});
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
                        Functions.getInstance().Toast("error", result.error);
                    }
                })
               
                // hideProgress();
              } catch (error) {
                console.error('API call error:', error);
                hideProgress();
              }
        }
    }
  };

  const handlePhoneBlur = () => {
    if (!validatePhone(nameText)) {
        setNameError('Please enter a valid Phone number');
    } else {
        setNameError('');
    }
  };
  const handleEmailBlur = () => {
    if (!validateEmail(nameText)) {
        setNameError('Please enter a valid Email');
    } else {
        setNameError('');
    }
  };;


  const validatePhone = (text) => {
    const aadhaarRegex = /^\d{10}$/;
    return aadhaarRegex.test(text);
  };

  const validateEmail = (email) => {
    var regex = new RegExp(
      '^([a-zA-Z0-9_\\.-])+@(([a-zA-Z0-9-])+\\.)+([a-zA-Z0-9]{2,4})'
    );
      if (!email) {
        setNameError('Email is required');
        return false;
      } else if (!regex.test(email)) {
        setNameError('Invalid email address');
        return false;
      }
      setNameError('');
      return true;
  };

  

  

  return (
    <View style={{backgroundColor: 'black', flex: 1}}>
        <View style={styles.textFieldContainer}>

         <View style={styles.scrnbg}>
        <View style={styles.header}>
          <View style={styles.hdlist}>
            <View style={styles.hdleft}>
              <TouchableOpacity
                onPress={() =>
                  navigation.goBack()
                }>
                <View style={styles.backMenu}>
                    
                    <Image style={styles.backIcon} source={BackIcon} />
                       
                </View>
              </TouchableOpacity>

            </View>
            <Text style={styles.labelTextHeader}>Enter New {source}</Text>

            <View style={[styles.hdleft]}>
              
            </View>
          </View>
        </View>
         </View>


         

          <View style={{marginVertical: 20, margin : 10}}>
          <Text style={styles.labelText}>Enter New {source} That You Would Like To Use</Text>
            <View style={styles.textInputContainer}>
              <View style={styles.prefixIconContainer}>
            {source && source == "Email" ? 
                <Image
                  resizeMode="contain"
                  source={Email}
                  style={styles.prefixIcon}
                />
                :
                <Image
                resizeMode="contain"
                source={Phone}
                style={styles.prefixIcon}
              />
            }
              </View>

            {source && source == "Email" ? 
              <TextInput
                style={styles.textField}
                placeholder={placeholder}
                placeholderTextColor="white"
                value={nameText}
                editable={editType}
                onChangeText={setNameText}
                onBlur={handleEmailBlur}
              />
              :
              <TextInput
              style={styles.textField}
              placeholder={placeholder}
              placeholderTextColor="white"
              keyboardType="numeric"
              editable={editType}
              value={nameText}
              onChangeText={(text)=>{
                if(text.length > 10){
                    Keyboard.dismiss();
                  }
                  else{
                    setNameText(text)
                  } 
                }}
              onBlur={handlePhoneBlur}
            />
            }
              


            </View>
            {Boolean(nameError) && (
              <Text style={styles.errorText}>{nameError}</Text>
            )}
          </View>
          <View style={{margin : 10}}>
            <CustomButton
              colour={'#279BFF'}
              btnLabel="Get OTP"
              onPress={()=>handleVerifyButtonPress()}
            />
          </View>
        </View>
    </View>
  );
};

export default WithProgress(EditProfile);
