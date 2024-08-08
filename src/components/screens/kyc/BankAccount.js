import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput, StyleSheet, BackHandler, Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native';
import CustomButton from '../customComponents/CustomButton';
import KycSuccessPopup from './KycSuccessPopup';
import KycRejected from './KycRejected';
import WithProgress from '../LoadingOverlay/WithProgress';
import Services from '../../../Services/Services';
import Functions from '../Functions';
import AsyncStorage from '@react-native-community/async-storage';
import { AadharCard, BankBannerIcon, BankBlueIcon, BankOrangeIcon, BankUserName, BankWhiteIcon, CorrectIcon, InsufficientBalance, KycVerification, PlusIcon, Previous, TickIcon } from '../../../assets';
import { secondary } from '../../../style';
import { TouchableWithoutFeedback } from 'react-native';
import UserStore from '../../stores/UserStore';
import BankSuccessPopup from './BankSuccessPopup';
import ReactMoE,{
  MoEProperties,
} from "react-native-moengage";  







let userInfo,RedType;
const BankAccount = ({navigation,showProgress,hideProgress}) => {


  const [index, setIndex] = useState(0);
  const [nameText, setNameText] = useState('');
  const [nameError, setNameError] = useState('');
  const [numberText, setNumberText] = useState('');
  const [numberError, setNumberError] = useState('');
  const [confnumberText, setConfNumberText] = useState('');
  const [confnumberError, setConfNumberError] = useState('');
  const [ifscText, setIFSCText] = useState('');
  const [ifscError, setIFSCError] = useState('');
  const [fError,setFError] = useState('');
  const [isKycVerified, setisKycVerified] = useState(false);
  const [isKycRejected, setisKycRejected] = useState(false);
  const [type1,setType1] = useState(true);
  const [formType,setFormType] = useState(false);
  const [type2,setType2] = useState(false);
  const [bankList, setBankList] = useState([]);


  useEffect(() => {
    const unsubscribe = navigation?.addListener('focus', () => {
      getData();
    });

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      setType1(true);
      setFormType(false);
      setType2(false);
      setNameError("");
      setNumberError("");
      setConfNumberError("");
      setIFSCError("");
      setNameText("");
      setNumberText("");
      setConfNumberText("");
      setIFSCText("");
      if(RedType == "RedeemMoney"){
        navigation.navigate('RedeemMoney');
      }
      else{
        navigation.navigate('EditProfile');
      }
      return true;
    })
    return ()=>{
      console.log("Banking Out")
      unsubscribe();
      backHandler.remove();
    }
  }, []);



  const getData = async() =>{
    showProgress();
    userInfo = JSON.parse(await AsyncStorage.getItem("player6-userdata"));
    RedType = await AsyncStorage.getItem("bankRedType");
    Functions.getInstance().checkInternetConnectivity().then((state)=>{
      if(state == true){
        Services.getInstance().getBankDetails(userInfo.userId, userInfo.accesToken).then((result)=>{
          console.log(result);
          hideProgress();
          if(result.status == 200){
            setBankList(result.msg);
            if(result.msg.length > 0){
              setType2(true);
              setType1(false);
              setFormType(false);
            }
          }
        })

      }
      else{
        // hideProgress();
      }
    })
  }






  const handleGoBack = () => {
    console.log("RedType : ",RedType)
    if(RedType == "RedeemMoney"){
      navigation.navigate('RedeemMoney');
    }
    else{
      navigation.navigate('EditProfile', { 
        screen: 'UpdateProfile',
      });
    }
  };


  const handleVerifyButtonPress = () => {
    if(numberText == ""){
      setNumberError("Enter Account Number");
    }
    else if(confnumberText == ''){
      setConfNumberError("Confirm Account Number");
    }
    else if(numberText != confnumberText){
      setConfNumberError("Confirm A/c number doesn't matched");
    }
    else if(ifscText == ''){
      setIFSCError("Enter IFSC Number");
    }
    else if(nameText == ""){
      setNameError("Enter Beneficiary Name");
    }
    else{
      showProgress();
      let properties = new MoEProperties();
      properties.addAttribute("(KYC-Bank)> SAVE button", true);
      ReactMoE.trackEvent("KYC verification (Bank)", properties);

      const obj = {
        accNumber : numberText,
        ifsc : ifscText,
        name : nameText
      }
      Services.getInstance().verifyBank(obj,userInfo.userId,userInfo.accesToken).then(result=>{
        console.log(result)
        // setisKycVerified(true);
        console.log(typeof(result.error));
        if((result.status == 203) && ((typeof(result.error)) == "string")){
          hideProgress();
          UserStore.setKycError(result.error);
          setisKycRejected(true);
        }

        if((result.status == 203) && ((typeof(result.error)) == "object")){
          hideProgress();
          if((result.error) && (result.error.length > 0)){
            result.error.map(dtext=>{
              if(dtext.hasOwnProperty("accNumber")){
                setNumberError(dtext.accNumber);
              }
              else if(dtext.hasOwnProperty("ifsc")){
                setIFSCError(dtext.ifsc);
              }
              else if(dtext.hasOwnProperty("name")){
                setNameError(dtext.name);
              }
              else if(dtext.hasOwnProperty("duplicate")){
                UserStore.setKycError(dtext.duplicate);
                setisKycRejected(true);
              }
            })
          }
        }



        if((result.status == 401) && (result.error)){
          hideProgress();
          UserStore.setKycError(result.error);
          setisKycRejected(true);
        }


        if(result.status == 200){
          hideProgress();
          let properties = new MoEProperties();
          properties.addAttribute("bank-verified", true);
          ReactMoE.trackEvent("click_verifationcompleted", properties);
          setisKycVerified(true);
        }

      })
    }
  };

  const toggleCheckbox = (data) => {
    showProgress();
    const obj = {
      userId : userInfo.userId,
      bankId : data.id,
    }
    Services.getInstance().updatePrimaryAccount(obj, data.id,userInfo.userId, userInfo.accesToken).then((result)=>{
      console.log(result);
      if(result.status == 200){
        setBankList(prevList => {
          const updatedList = prevList.map(element => {
            if (element.id == data.id) {
              return { ...element, isPrimary : "1" };
            }
            else{
              return { ...element, isPrimary : "0" };
            }
          });
          return updatedList;
        });
      }
      hideProgress();
    })
  };







  const closeSuccess = () =>{
    setType1(true);
    setFormType(false);
    setType2(false);
    setNameError("");
    setNumberError("");
    setConfNumberError("");
    setIFSCError("");
    setNameText("");
    setNumberText("");
    setConfNumberText("");
    setIFSCText("");
    setisKycRejected(false);
    setisKycVerified(false);

    let properties = new MoEProperties();
    properties.addAttribute("(KYC-Bank)> DONE button", true);
    ReactMoE.trackEvent("KYC verification (Bank)", properties);

    if(RedType == "RedeemMoney"){
      navigation.navigate('RedeemMoney');
    }
    else{
      navigation.navigate('EditProfile');
    }
  }

  const closeRejected = () =>{
    // navigation.navigate('EditProfile');
    setisKycVerified(false);
    setisKycRejected(false);
  }


  return (
    <SafeAreaView style={styles.flex1}>
      <KeyboardAvoidingView style={styles.flex1} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        
        {!formType ? "" : 
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
                  </View>
                  <View style={styles.bodyContainer}>
                    <View style={styles.bodyText}>
                      <Text style={styles.getVerifiedText}>Add Your</Text>
                      <Text style={[styles.getVerifiedText, { bottom: 5 }]}>Bank Account</Text>
                    </View>
                    <View style={styles.flex3}>
                      <Image source={BankBannerIcon} resizeMode='contain' style={styles.kycImage} />
                    </View>
                  </View>
                </View>

                <ScrollView style={{flex : 1}} keyboardShouldPersistTaps="always">
                <View style={styles.tabContainer}>
                  {index === 0 && (
                    <>
                      <View style={styles.textFieldContainer}>
                        <Text style={styles.labelText}>Enter Account Number</Text>
                        <View style={styles.textInputContainer}>
                          <View style={styles.prefixIconContainer}>
                            <Image resizeMode='contain' source={BankWhiteIcon} style={styles.prefixIcon} />
                          </View>
                          <TextInput
                            style={styles.textField}
                            placeholder="Enter"
                            placeholderTextColor="white"
                            value={numberText}
                            keyboardType='numeric'
                            onChangeText={(text)=>{
                              setNumberText(text);
                              setNumberError('');
                            }}
                            // onBlur={handleNameBlur}
                          />

                        </View>
                        {<Text style={styles.errorText}>{numberError}</Text>}
                        <View >
                          <Text style={styles.labelText}>Confirm Account Number</Text>
                          <View style={styles.textInputContainer}>
                            <View style={styles.prefixIconContainer}>
                              <Image resizeMode='contain' source={BankWhiteIcon} style={styles.prefixIcon} />
                            </View>
                            <TextInput
                              style={styles.textField}
                              placeholder="Enter"
                              placeholderTextColor="white"
                              value={confnumberText}
                              keyboardType='numeric'
                              onChangeText={(text) =>{
                                  setConfNumberText(text);
                                  setConfNumberError('');
                              }}
                              // onBlur={handleAadhaarBlur}
                            />

                          </View>
                          {<Text style={styles.errorText}>{confnumberError}</Text>}
                        </View>



                        <View >
                          <Text style={styles.labelText}>IFSC</Text>
                          <View style={styles.textInputContainer}>
                            <View style={styles.prefixIconContainer}>
                              <Image resizeMode='contain' source={BankWhiteIcon} style={styles.prefixIcon} />
                            </View>
                            <TextInput
                              style={styles.textField}
                              placeholder="Enter"
                              placeholderTextColor="white"
                              value={ifscText}
                              onChangeText={(text) =>{
                                  setIFSCText(text);
                                  setIFSCError('');
                                }}
                              // onBlur={handleAadhaarBlur}
                            />

                          </View>
                          {<Text style={styles.errorText}>{ifscError}</Text>}
                        </View>


                        <View >
                          <Text style={styles.labelText}>Beneficiary Name</Text>
                          <View style={styles.textInputContainer}>
                            <View style={styles.prefixIconContainer}>
                              <Image resizeMode='contain' source={BankUserName} style={styles.prefixIcon} />
                            </View>
                            <TextInput
                              style={styles.textField}
                              placeholder="Enter"
                              placeholderTextColor="white"
                              value={nameText}
                              onChangeText={(text) =>{
                                  setNameText(text);
                                  setNameError('');
                                }}
                              // onBlur={handleAadhaarBlur}
                            />

                          </View>
                          {<Text style={styles.errorText}>{nameError}</Text>}
                        </View>


                      </View>
                      <Text style={styles.errorText}>{fError}</Text>
                      <View style={styles.getStartedButtonContainer}>
                        <CustomButton
                          colour={'#279BFF'}
                          btnLabel="Save"
                          onPress={handleVerifyButtonPress}
                        />

                      </View>
                    </>
                  )}

                </View>
              
                { isKycVerified ? 
                  <BankSuccessPopup
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
                
                </ScrollView>
            </View>
        }




    {!type1 ? "" :
      <View style={[styles.mainContainer]}>
        <View style={[styles.tabContainer,{marginTop : 150}]}>
          <Image source={BankOrangeIcon} style={{display:'flex',justifyContent:'center',alignSelf:'center',width : 100,height : 100}}/>
          <Text style={[styles.getVerifiedText,{textAlign : 'center',paddingTop : 20}]}>No Bank Account Yet!</Text>
          <Text style={[styles.getVerifiedText,styles.acctxt]}>You haven't added any bank account</Text>
          <View style={styles.getStartedButtonContainer}>
            <TouchableOpacity onPress={()=>{
              setType1(false);
              setFormType(true);
              setType2(false);
            }}>
              <View style={styles.addBtn}>
                <Image source={PlusIcon} style={{width : 20,height:20}}/>
                <Text style={[styles.getVerifiedText,{paddingLeft : 10}]}>Add Bank Account</Text>
              </View>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    }




    {!type2 ? "" : 
              <View style={[styles.mainContainer,{marginBottom : 0}]} key={index}>
                <View style={[styles.tabContainer]}>
                  <ScrollView>
                        { bankList && bankList.length > 0 ? bankList.map((bnkList,index)=>{
                              return(
                                    <View style={{backgroundColor : '#383838',borderRadius:8,marginBottom : 10}}>
                                        <View style={{flexDirection:'row',alignItems:'center',borderBottomWidth:1,borderBottomColor:'grey',padding:15}}>
                                          <View style={{width:40,height:40,borderRadius:8,backgroundColor:'#fff'}}>
                                            <Image source={BankBlueIcon} style={{width:30,height:30,alignSelf:'center',marginTop:4}}/>
                                          </View>
                                          <View style={{paddingLeft:10}}>
                                          <Text style={[styles.getVerifiedText]}>{bnkList.accNumber}</Text>
                                          </View>
                                        </View>
                                        <View style={{padding:15,borderBottomWidth:1,borderBottomColor:'grey'}}>
                                          <View style={{flexDirection:'row',paddingBottom:10}}>
                                            <Text style={[styles.ifctxt,{flexBasis:'35%'}]}>IFSC</Text>
                                            <Text style={{display:'flex',color : 'white'}}>:</Text>
                                            <Text style={[styles.ifctxt, {marginLeft : 10}]}>{bnkList.ifsc}</Text>
                                          </View>
                                          <View style={{flexDirection:'row'}}>
                                            <Text style={[styles.ifctxt,{flexBasis:'35%'}]}>Beneficiary</Text>
                                            <Text style={{display:'flex',color : 'white'}}>:</Text>
                                            <Text style={[styles.ifctxt, {marginLeft : 10}]}>{bnkList.name}</Text>
                                          </View>
                                        </View>

                                        <TouchableWithoutFeedback onPress={()=>toggleCheckbox(bnkList)} disabled = {bnkList.isPrimary == "1" ? true : false}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'space-between', padding:15}}>
                                            <Text style={[styles.ifctxt,{fontSize:18,color:'#fff'}]}>Set as primary</Text>
                                            <View
                                              style={{
                                                width: 24,
                                                height: 24,
                                                borderWidth: 1,
                                                borderColor: 'white',
                                                borderRadius: 50,
                                                marginRight: 8,
                                                marginTop : 2,
                                                marginBottom : 2,
                                                backgroundColor: bnkList.isPrimary == "1" ? '#32CD32' : 'transparent',
                                              }}
                                            >
                                              {bnkList.isPrimary == "1" && (
                                                <Image style={styles.tickMarkImage} source={TickIcon} />
                                              )}
                                            </View>
                                            </View>
                                        </TouchableWithoutFeedback>

                                      </View>
                              )})
                        : ""}

                  </ScrollView>

                  <TouchableOpacity onPress={()=>{
                      setType1(false);
                      setFormType(true);
                      setType2(false);
                    }}>
                      <View style={[styles.addBtn,{margin:0,marginBottom:10}]}>
                        <Image source={PlusIcon} style={{width : 20,height:20}}/>
                        <Text style={[styles.getVerifiedText,{paddingLeft : 10}]}>Add Bank Account</Text>
                      </View>
                  </TouchableOpacity>
                </View>
              </View>    
    }




       
      </KeyboardAvoidingView>
    </SafeAreaView>







     

  )
}



const styles = StyleSheet.create({
  flex1: { flex: 1 },
  mainContainer: {
    flex: 1, backgroundColor: 'black'
  },
  headerBox: {
    height: '25%',
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
    marginBottom : 100
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
    // marginBottom: 20,
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

  acctxt : {
    fontSize:12,
    fontFamily: 'Poppins-SemiBold',
    textAlign:'center',
    paddingTop : 10,
  },
  addBtn : {
    backgroundColor : secondary,
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'center',
    padding : 15,
    borderRadius : 8,
    margin : 30
  },
  ifctxt : {
    color:'#C5C5C5',
    fontFamily: 'Poppins-SemiBold'
  },
  tickMarkImage:{
    width:16,
    height:'100%',
    alignSelf : 'center',
    resizeMode: 'contain',
    alignItems : 'center',
    justifyContent : 'center', 
},

});

export default WithProgress(BankAccount);

