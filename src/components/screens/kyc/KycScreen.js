import React, { FC, useEffect, useRef, useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, SafeAreaView, Platform, TextInput, KeyboardAvoidingView, ScrollView, Keyboard, DatePickerAndroid, DatePickerIOSBase, AppState, BackHandler } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AllNavParamList } from '../../routes';
import { AadharCard, KycVerification, Notification, PanCard, Previous, } from '../../../assets';
import { Tab, } from '@rneui/themed';
import CustomButton from '../customComponents/CustomButton';
import WithProgress from '../LoadingOverlay/WithProgress';
import Services from '../../../Services/Services';
import Functions from '../Functions';
import AsyncStorage from '@react-native-community/async-storage';
import UserStore from '../../stores/UserStore';
import KycSuccessPopup from './KycSuccessPopup';
import KycRejected from './KycRejected';
import ReactMoE,{
  MoEProperties,
} from "react-native-moengage";  


let userInfo, type="";
const KycScreen = ({ navigation,route,showProgress,hideProgress}) => {
  const [index, setIndex] = useState(0);
  const [nameText, setNameText] = useState('');
  const [aadhaarText, setAadhaarText] = useState('');
  const [nameError, setNameError] = useState('');
  const [aadhaarError, setAadhaarError] = useState('');
  const [panNameError, setPanNameError] = useState('');
  const [panError, setPanError] = useState('');
  const [panNameText, setPanNameText] = useState('');
  const [panText, setPanText] = useState('');
  const [isKycVerified, setisKycVerified] = useState(false);
  const [isKycRejected, setisKycRejected] = useState(false);
  const [date, setdate] = useState('');
  const [month, setmonth] = useState('');
  const [year, setyear] = useState('');
  const [dateError, setdateError] = useState('');
  const [monthError, setmonthError] = useState('');
  const [yearError, setyearError] = useState('');
  const [kycError, setkycError] = useState('');
  const firstInputRef = useRef(null);
  const secondInputRef = useRef(null);
  const thirdInputRef = useRef(null);








  useEffect(() => {
    const unsubscribe = navigation?.addListener('focus', () => {
      getData();
    });
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('EditProfile');
      return true;
    })
    return ()=>{
      unsubscribe();
      backHandler.remove();
    }
  }, []);



  const getData = async() =>{
    // showProgress();
    userInfo = JSON.parse(await AsyncStorage.getItem("player6-userdata"));
    type = await AsyncStorage.getItem("kyc-type");
    if(type == 'Adhar'){
      setIndex(0)
      setAadhaarText("");
      setAadhaarError("");
    }
    else if(type == 'Pan'){
      setIndex(1);
      setPanNameError("");
      setPanError("");
      setdateError("");
      setmonthError("");
      setyearError("");
      setdate("");
      setmonth("");
      setyear("");
      setPanText("");
      setPanNameText("");
    }
    else{
      setIndex(0);
      setAadhaarText("");
      setAadhaarError("");
    }
    Functions.getInstance().checkExpiration(userInfo.userId, userInfo.refToken, navigation);
    Functions.getInstance().checkInternetConnectivity().then((state)=>{
      if(state == true){
        // hideProgress();
      }
      else{
        // hideProgress();
      }
    })
  }





  const handleVerifyButtonPress = () => {
    if (index === 0) {
      let properties = new MoEProperties();
      properties.addAttribute("(KYC-Aadhar)> Verify", true);
      ReactMoE.trackEvent("KYC verification (Aadhar)", properties);

      if (!validateAadhaar(aadhaarText)) {
        setAadhaarError('Please enter a 12-digit Aadhaar number');
        return;
      }
      else{
        showProgress();
        const obj ={
          aadhaarno: aadhaarText
        }
        Services.getInstance().updateAdhar(obj,userInfo.userId,userInfo.accesToken).then((result)=>{
          console.log(result)
          if(result.status == 200){
            UserStore.setAdharNumber(result.msg.aadhaarno);
            UserStore.setAdharClientId(result.msg.clientId);
            hideProgress();
            navigation.navigate("VerifyAdharOTP",{OTP : "Adhar"});
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
            hideProgress();
          }
        })
      }
      // Perform verification logic here
    } else if (index === 1) {
      let properties = new MoEProperties();
      properties.addAttribute("(KYC-PAN)> Verify button", true);
      ReactMoE.trackEvent("KYC verification (PAN)", properties);
      if (!validateName(panNameText)) {
        setPanNameError('Please enter only characters for the name');
        return;
      }
      else if (panText == '') {
        setPanError('Please enter a Pan number');
        return;
      }
      else if((panText.length > 10) || (panText.length < 10)){
        setPanError('PAN number should be of 10 characters');
        return;
      }
      else if(date == ''){
        setdateError('Enter Birth date');
        return;
      }
      else if(month == ''){
        setmonthError('Enter Birth month');
        return;
      }
      else if(year == ''){
        setyearError('Enter Birth year');
        return;
      }
      else{
        showProgress();
        setdateError('');
        setmonthError('');
        setyearError('');
        const obj = {
          panno : panText,
          dob : year + "-" + month + "-" + date,
          fullName : panNameText
        }
        console.log(obj);
        Services.getInstance().verifyPAN(obj, userInfo.userId, userInfo.accesToken).then((result)=>{
          if(result.status == 200){
            UserStore.setKycSuccess("Your Pan Card has been successfully verified");
            setisKycVerified(true);
            hideProgress();
          }
          else if(result.status == 403){
            UserStore.setKycError("Incorrect details of PAN Card");
            setisKycRejected(true);
            hideProgress();
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
            hideProgress();
          }
        })

      }
    }
    
  };







  function allCases(string) {
    const
        upper = /[A-Z]/.test(string),
        lower = /[a-z]/.test(string);

    return upper && lower;
}









  const validateName = (text) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(text);
  };

  const validateAadhaar = (text) => {
    const aadhaarRegex = /^\d{12}$/;
    return aadhaarRegex.test(text);
  };

  const validatePan = (text) => {
    if(text.length == 10){
      if(allCases(text)){
        return false
      }
      else{
        return true
      }
    }
  };

  const handleNameBlur = () => {
    if (!validateName(nameText)) {
      setNameError('Please enter only characters for the name');
    } else {
      setNameError('');
    }
  };

  const handleAadhaarBlur = () => {
    if (!validateAadhaar(aadhaarText)) {
      setAadhaarError('Please enter a valid Aadhaar number');
    } else {
      setAadhaarError('');
    }
  };

  const handlePanNameBlur = () => {
    if (!validateName(panNameText)) {
      setPanNameError('Please enter only characters for the name');
    } else {
      setPanNameError('');
    }
  };

  const handlePanBlur = () => {
    if (!validatePan(panText)) {
      setPanError('Please enter a valid Pan number');
    } else {
      setPanError('');
    }
  };
  const handleGoBack = () => {
    // navigation.navigate('UpdateProfile');
    navigation.navigate('EditProfile', { 
      screen: 'UpdateProfile',
    });
  };


  const closeSuccess = () =>{
    setisKycVerified(false);
    let properties = new MoEProperties();
    properties.addAttribute("(KYC-PAN)> OKAY button", true);
    ReactMoE.trackEvent("KYC verification (PAN)", properties);
    // navigation.navigate('UpdateProfile');
    navigation.navigate('EditProfile', { 
      screen: 'UpdateProfile',
    });
  }
  const closeRejected = () =>{
    setisKycRejected(false);
    
  }

  return (
    <SafeAreaView style={styles.flex1}>
      <KeyboardAvoidingView style={styles.flex1} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.mainContainer}>
            <View style={styles.headerBox}>
              <View style={styles.mainHeader}>
                <TouchableOpacity style={styles.backIcon} onPress={handleGoBack}>
                  <Image
                    resizeMode='contain'
                    style={{ width: 8 }}
                    source={Previous}
                  />
                </TouchableOpacity>
                {/* <View style={styles.backIcon}>
                  <Image
                    resizeMode='contain'
                    style={{ width: 11 }}
                    source={Notification}
                  />
                </View> */}
              </View>
              <View style={styles.bodyContainer}>
                <View style={styles.bodyText}>
                  <Text style={styles.getVerifiedText}>Verify Your</Text>
                  <Text style={[styles.getVerifiedText, { bottom: 5 }]}>{(type == "Adhar" || type == "") ? "Address" : "Identity"}</Text>
                </View>
                <View style={styles.flex3}>
                  <Image source={KycVerification} resizeMode='contain' style={styles.kycImage} />
                </View>
              </View>
            </View>



            <View style={styles.tabContainer}>
              {/* <Tab
                style={styles.tabbutton}
                value={index}
                onChange={(e) => setIndex(e)}
                indicatorStyle={{
                  backgroundColor: 'none',
                  height: 0,
                }}
                variant="primary"
              >
                <Tab.Item
                  containerStyle={(active) => ({
                    backgroundColor: active ? "#279bff" : undefined,
                    borderRadius: active ? 60 : undefined,
                  })}
                  title="Aadhaar Verfication"
                  titleStyle={{
                    fontWeight: '700',
                    fontSize: 14, fontFamily: 'Poppins-Medium',
                    color: '#fff', paddingVertical: 0, paddingHorizontal: 0,
                  }}
                />
                <Tab.Item
                  containerStyle={(active) => ({
                    backgroundColor: active ? "#279bff" : undefined,
                    borderRadius: active ? 60 : undefined,
                  })}
                  title="Pan Verification"
                  titleStyle={{
                    fontWeight: '700',
                    fontSize: 14, fontFamily: 'Poppins-Medium',
                    color: '#fff', paddingVertical: 0, paddingHorizontal: 0,
                  }}
                />
              </Tab> */}
              {index === 0 && (
                <>
                  <View style={styles.textFieldContainer}>
                    {/* <Text style={styles.labelText}>Your Name</Text>
                    <View style={styles.textInputContainer}>
                      <View style={styles.prefixIconContainer}>
                        <Image resizeMode='contain' source={AadharCard} style={styles.prefixIcon} />
                      </View>
                      <TextInput
                        style={styles.textField}
                        placeholder="Enter Your Name"
                        placeholderTextColor="white"
                        value={nameText}
                        onChangeText={setNameText}
                        onBlur={handleNameBlur}
                      />

                    </View>
                    {Boolean(nameError) && <Text style={styles.errorText}>{nameError}</Text>} */}
                    <View >
                      <Text style={styles.labelText}>Your Aadhaar Number</Text>
                      <View style={styles.textInputContainer}>
                        <View style={styles.prefixIconContainer}>
                          <Image resizeMode='contain' source={AadharCard} style={styles.prefixIcon} />
                        </View>
                        <TextInput
                          style={styles.textField}
                          placeholder="Enter Aadhaar Number"
                          placeholderTextColor="white"
                          value={aadhaarText}
                          keyboardType='numeric'
                          onChangeText={(text) =>{
                            if(text.length > 12){
                              Keyboard.dismiss();
                            }
                            else{
                              setAadhaarText(text);
                            }}
                          }
                          onBlur={handleAadhaarBlur}
                        />

                      </View>
                      {Boolean(aadhaarError) && <Text style={styles.errorText}>{aadhaarError}</Text>}
                    </View>
                  </View>
                  <View style={styles.getStartedButtonContainer}>
                    <CustomButton
                      colour={'#279BFF'}
                      btnLabel="Verify"
                      onPress={handleVerifyButtonPress}
                    />

                  </View>
                </>
              )}
              {index === 1 && (
                <>
                
                  <View style={styles.textFieldContainer}>
                    <Text style={styles.labelText}>Your Pan Card Name</Text>
                    <View style={styles.textInputContainer}>
                      <View style={styles.prefixIconContainer}>
                        <Image resizeMode='contain' source={PanCard} style={styles.prefixIcon} />
                      </View>
                      <TextInput
                        style={styles.textField}
                        placeholder="Enter Your Name"
                        placeholderTextColor="white"
                        value={panNameText}
                        onChangeText={setPanNameText}
                        onBlur={handlePanNameBlur}

                      />
                    </View>
                    {Boolean(panNameError) && <Text style={styles.errorText}>{panNameError}</Text>}
                    <View >
                      <Text style={styles.labelText}>Your Pan Number</Text>
                      <View style={styles.textInputContainer}>
                        <View style={styles.prefixIconContainer}>
                          <Image resizeMode='contain' source={PanCard} style={styles.prefixIcon} />
                        </View>
                        <TextInput
                          style={styles.textField}
                          placeholder="Enter Pan Number"
                          placeholderTextColor="white"
                          value={panText}
                          onChangeText={(text)=>{
                            if(text.length > 10){
                              Keyboard.dismiss();
                            }
                            else{
                              setPanText(text)
                            }
                          }}
                          onBlur={handlePanBlur}
                        />
                      </View>
                      {Boolean(panError) && <Text style={styles.errorText}>{panError}</Text>}
                    </View>


                  <Text style={styles.labelText}>Your Date Of Birth</Text>
                  <View style={[styles.textBoxs,{height : 68}]}>

                    <View style={[styles.textInputContainer,{width:'25%',marginRight:20}]}>
                        <TextInput
                          ref={firstInputRef}
                          style={styles.textField}
                          placeholder="DD"
                          keyboardType='numeric'
                          placeholderTextColor="white"
                          value={date}
                          onChangeText={(text)=>{
                            if(text.length > 2){
                              // Keyboard.dismiss();
                              secondInputRef.current?.focus();
                            }
                            else{
                              setdate(text)
                            }
                          }}
                          onBlur={handlePanBlur}
                        />
                        
                    </View>

                    <View style={[styles.textInputContainer,{width:'25%',marginRight:20}]}>
                          <TextInput
                            ref={secondInputRef}
                            style={styles.textField}
                            placeholder="MM"
                            keyboardType='numeric'
                            placeholderTextColor="white"
                            value={month}
                            onChangeText={(text)=>{
                              if(text.length > 2){
                                // Keyboard.dismiss();
                                thirdInputRef.current?.focus();
                              }
                              else{
                                setmonth(text)
                              }
                            }}
                            onBlur={handlePanBlur}
                          />
                          
                    </View>
                    
                    <View style={[styles.textInputContainer,{width:'25%'}]}>
                      <TextInput
                        ref={thirdInputRef}
                        style={[styles.textField]}
                        placeholder="YYYY"
                        keyboardType='numeric'
                        placeholderTextColor="white"
                        value={year}
                        onChangeText={(text)=>{
                          if(text.length > 4){
                            Keyboard.dismiss();
                          }
                          else{
                            setyear(text)
                          }
                        }}
                        onBlur={handlePanBlur}
                      />
                      
                    </View>
                    
                  </View>
                  {dateError != "" ? <Text style={styles.errorText}>{dateError}</Text> : ""}
                  {monthError != "" ? <Text style={styles.errorText}>{monthError}</Text> : ""}
                  {yearError != "" ? <Text style={styles.errorText}>{yearError}</Text> : ""}


                  </View>







                  <View style={styles.getStartedButtonContainer}>
                    <CustomButton
                      colour={'#279BFF'}
                      btnLabel="Verify"
                      onPress={handleVerifyButtonPress}
                    />
                  </View>
                </>
              )}

            </View>

            { isKycVerified ? 
              <KycSuccessPopup
                navigation={navigation}
                onClose={closeSuccess} 
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};




















const styles = StyleSheet.create({
  flex1: { flex: 1 },
  mainContainer: {
    flex: 1, backgroundColor: 'black'
  },
  headerBox: {
    height: '30%',
    width: '100%',
    padding: 15,
    backgroundColor: '#3054C4',
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  mainHeader: { flex: 1, justifyContent: 'space-between', flexDirection: 'row' },
  backIcon: {
    margin: 10,
    padding: 15,
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#0e349f',
  },
  bodyContainer: { flex: 3, flexDirection: 'row' },
  bodyText: { justifyContent: 'center', paddingLeft: 15 },
  getVerifiedText: { color: 'white', fontSize: 18, fontFamily: 'Poppins-SemiBold', },
  flex3: { flex: 3 },
  kycImage: { width: 220, height: '100%' },
  tabContainer: {
    marginHorizontal: 14,
    marginTop: 18,
    flex: 1
  },
  tabbutton: {
    backgroundColor: 'none',
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#4d4d4d',
    borderStyle: 'solid',
    paddingHorizontal: 4,
    paddingVertical: 4,
    alignItems: 'center',
    marginBottom: 16,
  },
  getStartedButtonContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  labelText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 8,
  },
  textFieldContainer: {
    marginTop: 16,

  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 8,
    padding: 6,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#4d4d4d',
  },
  prefixIconContainer: {
    marginRight: 8,
    paddingRight: 8,
    borderRightWidth: 1,
    borderColor: '#404040',
  },
  textBoxs: {
    // display :"flex",
    flexDirection: 'row',
    width: '100%',
  },
  prefixIcon: {
    width: 30,
    height: 30,
  },
  textField: {
    flex: 1,
    height: 40,
    color: '#fff',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },

});

export default WithProgress(KycScreen);
