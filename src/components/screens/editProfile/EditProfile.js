import React, {useEffect, useState} from 'react';
import {
  AppState,
  BackHandler,
  Image,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {AadharCard, BackIcon, CorrectIcon, DummyImage1, EditImage, Email, Phone, Rejected, UserIcon, Wallet, dummyImage} from '../../../assets';
import CustomButton from '../customComponents/CustomButton';
import WithProgress from '../LoadingOverlay/WithProgress';
import ImagePicker from 'react-native-image-crop-picker';
import { styles } from './EditProfile.styles';
import { useNotification } from '../customComponents/NotificationContext';
import Services from '../../../Services/Services';
import AsyncStorage from '@react-native-community/async-storage';
import Functions from '../Functions';
import UserStore from '../../stores/UserStore';
import { useFocusEffect } from '@react-navigation/native';
import ReactMoE,{
  MoEProperties,
} from "react-native-moengage"; 




let userInfo, userPF;
const EditProfile =({navigation,showProgress,hideProgress}) => {
  const [nameText, setNameText] = useState('');
  const [userImage, setUserImage] = useState('');
  const [isImage, setisImage] = useState(false);
  const [phoneText, setPhoneText] = useState('');
  const [emailText, setEmailText] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [status, setStatus] = useState({});
  const notification = useNotification();





  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();      
    });
    return () => {
      unsubscribe();
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
    showProgress();
    userInfo = JSON.parse(await AsyncStorage.getItem("player6-userdata"));
    Functions.getInstance().checkExpiration(userInfo.userId, userInfo.refToken, navigation);
    Functions.getInstance().checkInternetConnectivity().then((state)=>{
      if(state == true){
        Services.getInstance().getProfileData(userInfo.userId, userInfo.accesToken).then((result)=>{
          if(result.status == 200){
            AsyncStorage.setItem("player6-profile", JSON.stringify(result.data))
            BindProfileData();
          }
        })

        Services.getInstance().checkKYCStatus(userInfo.userId, userInfo.accesToken).then((result)=>{
          if(result.status == 200){
            console.log(result)
            setStatus(result.msg);
            AsyncStorage.setItem("player6-kycStatus", JSON.stringify(result.msg));
          }
        })
      }
      else{
        BindProfileData();
        hideProgress();
      }
    })
  }



  const BindProfileData = async () =>{
    userPF = JSON.parse(await AsyncStorage.getItem("player6-profile"));
    const status = JSON.parse(await AsyncStorage.getItem("player6-kycStatus"));
    setNameText(userPF.name);
    setPhoneText(userPF.number);
    setEmailText(userPF.email);
    setStatus(status);
    if(userPF.profileImg == 'https://s3.ap-south-1.amazonaws.com/player6sports/pl6Uplods/'){
      setUserImage('');
      setisImage(false);
    }else{
      console.log(userPF.profileImg)
      setUserImage(userPF.profileImg);
      UserStore.setuserPF(userPF.profileImg)
      setisImage(true);
    }
    hideProgress();
  }



  const handleVerifyButtonPress = async () => {
    Functions.getInstance().fireAdjustEvent("p3avh8");
    Functions.getInstance().fireFirebaseEvent("UpdateProfileButton");
    let properties = new MoEProperties();
    properties.addAttribute("Update Profile", true);
    ReactMoE.trackEvent("Edit Profile", properties);
    if (!validateName(nameText)) {
      setNameError('Please enter only characters for the name');
      return;
    } 
    // else if (!validatePhone(phoneText)) {
    //   setPhoneError('Please enter a 10-digit Phone number');
    //   return;
    // } 
    // else if (!validatePhone(phoneText)) {
    //   setEmailError('Please enter a Email');
    //   return;
    // }
    try {
      showProgress();
      const formData = new FormData();
      console.log(userImage)
      if(isImage){
        formData.append("name",nameText);
        formData.append("userfile",{
          uri : userImage,
          type: "image/jpeg",
          name: "photo.jpg"
        });
      }
      else{
        formData.append("name",nameText);
      }
      console.log(JSON.stringify(formData));
      Services.getInstance().updateProfile(formData, userInfo.userId, userInfo.accesToken).then((result)=>{
        hideProgress();
        console.log(result)
        if(result.status == 200){
          setNameError('');
          UserStore.setuserPF(result.msg.profileImg);
          Functions.getInstance().Toast("success", "Profile updated successfully.");
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
            Functions.getInstance().Toast("error", "Please check your details"); 
          }
        }
        else{
          setNameError('');
          Functions.getInstance().Toast("error", "Please try again later.");
        }
      })
    } catch (error) {
      console.error('API call error:', error);
      hideProgress();
    }
  };

  const handleNameBlur = () => {
    if (!validateName(nameText)) {
      setNameError('Please enter only characters for the name');
    } else {
      setNameError('');
    }
  };

  const handlePhoneBlur = () => {
    if (!validatePhone(phoneText)) {
      setPhoneError('Please enter a valid Phone number');
    } else {
      setPhoneError('');
    }
  };
  const handleEmailBlur = () => {
    if (!validateEmail(phoneText)) {
      setEmailError('Please enter a valid Email');
    } else {
      validateEmail('');
    }
  };
  const validateName = (text) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(text);
  };

  const validatePhone = (text) => {
    const aadhaarRegex = /^\d{10}$/;
    return aadhaarRegex.test(text);
  };
  const validateEmail = (text) => {
    const emailRegex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
    return emailRegex.test(text);
  };

  const onImageEditPress = async () => {
      let properties = new MoEProperties();
      properties.addAttribute("Edit Display picture", true);
      ReactMoE.trackEvent("Edit Profile", properties);
    try {
        ImagePicker.openPicker({
        cropping: false,
        mediaType: 'photo',
        forceJpg: true,
      }).then(image => {
        if (image.size < 2000000) {
          if (Platform.OS == 'android') {
            setUserImage(image.path);
            setisImage(true);
          } else {
            setUserImage(image.sourceURL);
            setisImage(true);
          }
        } else {
          Functions.getInstance().Toast("error", "Please upload the image below 2MB")
        }
        console.log(image);
      });
    } catch (err) {}

  };



  const onEmailEditPress = async (type) =>{
    let properties = new MoEProperties();
    properties.addAttribute("(KYC-Email)> Verify button", true);
    ReactMoE.trackEvent("KYC verification (Email)", properties);
    navigation.navigate("EnterNewEmail",{from: 'Email', edit : type});
  }

  const onPhoneEditPress = async (type) => {
    let properties = new MoEProperties();
    properties.addAttribute("(KYC-Phone)> Verify button", true);
    ReactMoE.trackEvent("KYC verification (Phone)", properties);
    navigation.navigate("EnterNewEmail",{from: 'Mobile Number',edit : type});
  }

  const onBankEditPress = async () => {
    let properties = new MoEProperties();
    properties.addAttribute("(KYC-Bank)> Verify button", true);
    ReactMoE.trackEvent("KYC verification (Bank)", properties);
    AsyncStorage.setItem("bankRedType", "Profile");
    navigation.navigate("KYC",{
      screen : 'BankAccount'
    });
  }


  return (
    <ScrollView>
    <View style={{backgroundColor: 'black', flex: 1}}>
      <View style={{margin: 15}}>

        <View style={styles.textFieldContainer}>
          <Text style={styles.labelTextHeader}>Edit Your Profile</Text>
          <View style={{alignSelf: 'center'}}>
          <TouchableOpacity onPress={()=>onImageEditPress()}>
            <Image
              resizeMode="contain"
              source = { isImage ? {uri : userImage} : require('../../../assets/images/dummy.png')}
              style={[styles.profile]}
            />
            
              <View style={{bottom: 43, left: 10}}>
                <Image
                  resizeMode="contain"
                  source={EditImage}
                  style={styles.editIcon}
                />
              </View>
              </TouchableOpacity>
          </View>
          
          <View style={{marginVertical: 20}}>
            <View style={styles.textInputContainer}>
              <View style={styles.prefixIconContainer}>
                <Image
                  resizeMode="contain"
                  source={UserIcon}
                  style={styles.prefixIcon}
                />
              </View>
              <TextInput
                style={styles.textField}
                placeholder="Your Name"
                placeholderTextColor="white"
                value={nameText}
                onTouchEnd={()=> {
                    Functions.getInstance().fireAdjustEvent("biobec");
                    Functions.getInstance().fireFirebaseEvent("EditProfileName");
                    let properties = new MoEProperties();
                    properties.addAttribute("Edit Username", true);
                    ReactMoE.trackEvent("Edit Profile", properties);
                  }}
                onChangeText={setNameText}
                onBlur={handleNameBlur}
              />
            </View>
            {Boolean(nameError) && (
              <Text style={styles.errorText}>{nameError}</Text>
            )}
            <View>
              <View style={styles.textInputContainer}>
                <View style={styles.prefixIconContainer}>
                  <Image
                    resizeMode="contain"
                    source={Email}
                    style={styles.prefixIcon}
                  />
                </View>
                <TextInput
                  style={styles.textField}
                  placeholder="Email ID"
                  editable={false}
                  focusable={false}
                  placeholderTextColor="white"
                  value={emailText}
                  onChangeText={setEmailText}
                  onBlur={handleEmailBlur}
                />
                <View style={styles.suffixIconContainer}>
                  <TouchableOpacity onPress={()=>{
                      Functions.getInstance().fireAdjustEvent("i355th");
                      Functions.getInstance().fireFirebaseEvent("EditProfileEmail");
                      onEmailEditPress(true);
                    }}>
                    <View>
                      <Image
                        resizeMode="contain"
                        source={EditImage}
                        style={styles.editIcon}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              {Boolean(emailError) && (
                <Text style={styles.errorText}>{emailError}</Text>
              )}
            </View>
            <View>
              <View style={styles.textInputContainer}>
                <View style={styles.prefixIconContainer}>
                  <Image
                    resizeMode="contain"
                    source={Phone}
                    style={styles.prefixIcon}
                  />
                </View>
                <TextInput
                  style={styles.textField}
                  placeholder="Phone Number"
                  editable={false}
                  focusable={false}
                  placeholderTextColor="white"
                  value={phoneText}
                  onChangeText={setPhoneText}
                  onBlur={handlePhoneBlur}
                />
                <View style={styles.suffixIconContainer}>
                  <TouchableOpacity onPress={()=>{
                      Functions.getInstance().fireAdjustEvent("b1rbf6");
                      Functions.getInstance().fireFirebaseEvent("EditProfilePhone");
                      onPhoneEditPress(true);
                    }}>
                    <View>
                      <Image
                        resizeMode="contain"
                        source={EditImage}
                        style={styles.editIcon}
                      />
                    </View>
                  </TouchableOpacity>
                </View>

              </View>
              {Boolean(phoneError) && (
                <Text style={styles.errorText}>{phoneError}</Text>
              )}
            </View>
          </View>
          <View style={{marginBottom : 20}}>
            <CustomButton
              colour={'#279BFF'}
              btnLabel="Update Profile"
              onPress={()=>handleVerifyButtonPress()}
            />
          </View>
        </View>

      <View style={styles.accvryinfo}>
            <View style={styles.acctvrfy}>
              <View style={styles.adrinfo}>
                <View style={styles.adrimg}>
                  <Image
                    resizeMode="contain"
                    source={AadharCard}
                    style={styles.prefixIcon}
                  />
                </View>
                <View style={styles.adrtxt}>
                  <Text style={styles.acctadr}>Address Verification</Text>
                </View>
              </View>
              <View style={styles.suffixIconContainer}>
                  <View style={styles.adrtxt}>
                    {status && status?.aadhaarVerify == "1" ? 
                    <Image
                      resizeMode="contain"
                      source={CorrectIcon}
                      style={{width : 35, height : 35}}
                    />
                     : 
                     status && status?.aadhaarVerify == "2" ?
                     <Image
                      resizeMode="contain"
                      source={Rejected}
                      style={{width : 35, height : 35}}
                    />
                     : 
                    <TouchableOpacity style={styles.verytxt} onPress={()=>{
                        AsyncStorage.setItem("kyc-type", "Adhar");
                        UserStore.setkycBtnTitle("Okay");
                        navigation.navigate('KYC', { 
                          screen: 'KycPage',
                          params: {require : "Adhar"}
                        });
                        // navigation.navigate("KycPage",);
                        }}>
                      <Text style={styles.acctadr}>Verify</Text>
                    </TouchableOpacity>
                    }
                  </View>
              
              </View>
            </View>
            {Boolean(emailError) && (
              <Text style={styles.errorText}>{emailError}</Text>
            )}
      </View>


      <View style={styles.accvryinfo}>
            <View style={styles.acctvrfy}>
              <View style={styles.adrinfo}>
                <View style={styles.adrimg}>
                  <Image
                    resizeMode="contain"
                    source={Phone}
                    style={styles.prefixIcon}
                  />
                </View>
                <View style={styles.adrtxt}>
                  <Text style={styles.acctadr}> Phone Verification</Text>
                </View>
              </View>
              <View style={styles.suffixIconContainer}>
                  <View style={styles.adrtxt}>
                  {status && status?.number == "1" ? 
                    <Image
                      resizeMode="contain"
                      source={CorrectIcon}
                      style={{width : 35, height : 35}}
                    />
                    :
                    <TouchableOpacity style={styles.verytxt} onPress={()=>onPhoneEditPress(false)}>
                      <Text style={styles.acctadr}>Verify</Text>
                    </TouchableOpacity>
                  }
                  </View>
              </View>
            </View>
            {Boolean(emailError) && (
              <Text style={styles.errorText}>{emailError}</Text>
            )}
      </View>

      <View style={styles.accvryinfo}>
            <View style={styles.acctvrfy}>
              <View style={styles.adrinfo}>
                <View style={styles.adrimg}>
                  <Image
                    resizeMode="contain"
                    source={Email}
                    style={styles.prefixIcon}
                  />
                </View>
                <View style={styles.adrtxt}>
                  <Text style={styles.acctadr}> Email Verification</Text>
                </View>
              </View>
              <View style={styles.suffixIconContainer}>
                  <View style={styles.adrtxt}>
                  {status && status?.email == "1" ? 
                    <Image
                      resizeMode="contain"
                      source={CorrectIcon}
                      style={{width : 35, height : 35}}
                    />
                    :
                  <TouchableOpacity style={styles.verytxt} onPress={()=>{
                        Functions.getInstance().fireAdjustEvent("ekkn79");
                        Functions.getInstance().fireFirebaseEvent("EditProfileEmailVerify");
                        onEmailEditPress(false);
                      }
                    }>
                      <Text style={styles.acctadr}>Verify</Text>
                  </TouchableOpacity>
                  }
                  </View>
              </View>
            </View>
            {Boolean(emailError) && (
              <Text style={styles.errorText}>{emailError}</Text>
            )}
      </View>


      <View style={styles.accvryinfo}>
            <View style={styles.acctvrfy}>
              <View style={styles.adrinfo}>
                <View style={styles.adrimg}>
                  <Image
                    resizeMode="contain"
                    source={AadharCard}
                    style={styles.prefixIcon}
                  />
                </View>
                <View style={styles.adrtxt}>
                  <Text style={styles.acctadr}> PAN Verification</Text>
                </View>
              </View>
              <View style={styles.suffixIconContainer}>
                  <View style={styles.adrtxt}>
                  {status && status?.panVerify == "1" ? 
                    <Image
                      resizeMode="contain"
                      source={CorrectIcon}
                      style={{width : 35, height : 35}}
                    />
                    :
                  <TouchableOpacity style={[styles.verytxt]} disabled = {false} onPress={()=>{
                    if(status?.aadhaarVerify == "1"){
                      Functions.getInstance().fireAdjustEvent("ricbnr");
                      Functions.getInstance().fireFirebaseEvent("EditProfilePANVerify");
                      AsyncStorage.setItem("kyc-type", "Pan");
                      navigation.navigate('KYC', { 
                        screen: 'KycPage',
                        params: {require : "Pan"}
                      });
                    }
                    else{
                      Functions.getInstance().fireAdjustEvent("ricbnr");
                      Functions.getInstance().fireFirebaseEvent("EditProfilePANVerify");
                      Functions.getInstance().Toast("error", "Please verify the Address details before verifying the pancard");
                    }

                    }}>
                      <Text style={styles.acctadr}>Verify</Text>
                    </TouchableOpacity>
                  }
                  </View>
              </View>
            </View>
            {Boolean(emailError) && (
              <Text style={styles.errorText}>{emailError}</Text>
            )}
      </View>

      <View style={styles.accvryinfo}>
            <View style={styles.acctvrfy}>
              <View style={styles.adrinfo}>
                <View style={styles.adrimg}>
                  <Image
                    resizeMode="contain"
                    source={Wallet}
                    style={styles.prefixIcon}
                  />
                </View>
                <View style={styles.adrtxt}>
                  <Text style={styles.acctadr}> Bank A/C Verification</Text>
                </View>
              </View>
              <View style={styles.suffixIconContainer}>
                  <View style={styles.adrtxt}>
                  {status && status?.bankVerify == "1" ? 
                    <Image
                      resizeMode="contain"
                      source={CorrectIcon}
                      style={{width : 35, height : 35}}
                    />
                    :
                  <TouchableOpacity style={[styles.verytxt]} onPress={()=>{
                        if(status?.panVerify == "1"){
                          Functions.getInstance().fireAdjustEvent("zh3dnr");
                          Functions.getInstance().fireFirebaseEvent("EditProfileBankVerify");
                          onBankEditPress();
                        }
                        else{
                          Functions.getInstance().fireAdjustEvent("zh3dnr");
                          Functions.getInstance().fireFirebaseEvent("EditProfileBankVerify");
                          Functions.getInstance().Toast("error", "Please verify the Pancard details before verifying the bank account")
                        }
                      }}>
                      <Text style={styles.acctadr}>Verify</Text>
                    </TouchableOpacity>
                  }
                  </View>
              </View>
            </View>
            {Boolean(emailError) && (
              <Text style={styles.errorText}>{emailError}</Text>
            )}
      </View>




   






      </View>
    </View>
    </ScrollView>
  );
};

export default WithProgress(EditProfile);
