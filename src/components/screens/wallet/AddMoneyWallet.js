import React, {FC, useEffect, useState} from 'react';
import {
  BackHandler,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BagRupees, Info, InfoWallet} from '../../../assets';
import WithProgress from '../LoadingOverlay/WithProgress';
import { styles } from './AddMoneyWallet.styles';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Services from '../../../Services/Services';
import { Buffer } from 'buffer';
import { sha256 } from "react-native-sha256";
import PhonePePaymentSDK from 'react-native-phonepe-pg';
import Functions from '../Functions';
import Tooltip from 'react-native-walkthrough-tooltip';
import UserStore from '../../stores/UserStore';
import ReactMoE,{
  MoEProperties,
} from "react-native-moengage"; 



let userInfo,source, latitude,longitude;
const AddMoneyScreen = ({navigation,showProgress,hideProgress}) => {
  const [amount, setAmount] = useState('');
  const [selectedBox, setSelectedBox] = useState(null);
  const [appId, setAppId] = useState(null);
  // const [environmentDropDownValue, setEnvironmentValue] = useState('PRODUCTION');  //Payment Gateway prod
  const [environmentDropDownValue, setEnvironmentValue] = useState('SANDBOX');  //Payment Gateway demo 
  const [packageName, setPackageName] = useState('com.player6');
  const [toolTipVisible,settoolTipVisible] = useState(false);


  useEffect(() => {
    const unsubscribe = navigation?.addListener('focus', () => {
      getData();
    });


    return ()=>{
      unsubscribe();
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.navigate('Wallet');
        return true;
      });

      return () => {
        backHandler.remove();
      };
    }, [])
  );


  const getData = async() =>{
    userInfo = JSON.parse(await AsyncStorage.getItem("player6-userdata"));
    source = await AsyncStorage.getItem("from");
    latitude = UserStore.getlattitude();
    longitude = UserStore.getlongitude();

  }




  const handleAmountChange = (text) => {
    // Remove non-numeric characters from the input
    const cleanedText = text.replace(/[^0-9]/g, '');
    setAmount(cleanedText);
    setSelectedBox(null);
  };




  const handleBoxPress = (boxAmount) => {
    setSelectedBox(boxAmount);
    setAmount('');
  };



  
  const handleContinue = async () => {
    if(amount < 25){
      Functions.getInstance().Toast("error", "You need to enter min ₹25 to initiate the transaction");
    }
    else{
        showProgress();
        Functions.getInstance().fireAdjustEvent("kkoqdc");
        Functions.getInstance().fireFirebaseEvent("AddWalletMoneyInnerButton");
        let properties = new MoEProperties();
        properties.addAttribute("add(+)", amount);
        ReactMoE.trackEvent("Add Money to Wallet +", properties);
        let properties1 = new MoEProperties();
        properties1.addAttribute("Add₹", amount);
        ReactMoE.trackEvent("Gameroom", properties1);
        const obj = {
          amount : amount,
          lat : latitude,
          long : longitude,
        }
        console.log("myobject : ", obj);
        Services.getInstance().getPaymentObject(obj,userInfo.userId,userInfo.accesToken).then(result=>{
          console.log("Payment Data From backend testing: ",result);
          if(result.status == 200){
            const myObject = {
              merchantId: result.base64Body.merchantId,
              merchantTransactionId: result.base64Body.merchantTransactionId,
              merchantUserId: result.base64Body.merchantUserId,
              amount: (result.base64Body.amount)*100,
              callbackUrl: result.base64Body.callbackUrl,
              mobileNumber: result.base64Body.mobileNumber,
              paymentInstrument: {
                "type": "PAY_PAGE"
              }
            }
            const jsonString = JSON.stringify(myObject);
            const base64Encoded = Buffer.from(jsonString).toString('base64');
            console.log(base64Encoded);
            // //Test Mode
            sha256(base64Encoded+"/pg/v1/payd5aea50d-6f0c-4dc3-a812-0077776332c0").then((hash) => {

            //Live Mode
            //  sha256(base64Encoded+"/pg/v1/pay1f5f834f-7694-46b1-93c6-bf518ede1c5c").then((hash) => {
              console.log(hash);
              const hasWithSaltIndex = hash+'###1';
              payment(result.base64Body.merchantId, base64Encoded, hasWithSaltIndex, result.base64Body.callbackUrl);
              hideProgress();
            });
            
          }
          else{
            hideProgress();
            Functions.getInstance().Toast("error","Transaction initiation failed")
          }
        })
    }
  }


  const payment = (merchantId, requestBody, checksum, callbackURL) =>{
    PhonePePaymentSDK.init(
      environmentDropDownValue,
      merchantId,
      appId,
      true
    ).then(result => {
      console.log("SDK initialization : ", JSON.stringify(result));
      startTransaction(merchantId, requestBody, checksum, callbackURL);
    }).catch(error => {
      console.log(error);
    })
  }

 //Original function
  const startTransaction = (merchantId, requestBody, checksum, callbackURL) =>{
    console.log("callbackURL : ",callbackURL)
    PhonePePaymentSDK.startTransaction(
      requestBody,
      checksum,
      packageName,
      callbackURL
    ).then(a => {
      console.log("Final response : ", a)
      if(a.status == 'SUCCESS'){
        let properties = new MoEProperties();
        properties.addAttribute("Completed Payment successfully", true);
        ReactMoE.trackEvent("Pay", properties);
        if(source == "contest"){
          navigation.navigate("ChooseContest");
        }
        else{
          navigation.navigate('Wallet');
        }

      }
      else{
        navigation.navigate('Wallet');
      }
    }).catch(error => {
      console.log(error);
      navigation.navigate('Wallet');
    })
  }




  const renderMoney = (rupees) => {
    return (
      <TouchableOpacity
        style={[
          styles.box,
          selectedBox === rupees ? {backgroundColor: '#279bff'} : null,
        ]}
        onPress={() => handleBoxPress(rupees)}>
        <Text
          style={[
            styles.boxText,
            selectedBox === rupees ? {color: '#fff'} : null,
          ]}>
          ₹ {rupees}
        </Text>
      </TouchableOpacity>
    );
  };



  const renderMoneyContainer = () => {
    return (
      <View style={styles.renderMoneyContainer}>
        {/* {renderMoney(100)}
        {renderMoney(200)}
        {renderMoney(300)}
        {renderMoney(400)} */}
      </View>
    );
  };





  const renderTextInput = () => {
    return (
      <View style={{flex: 1}}>
        <Text style={styles.boxHeader}>Enter an Amount</Text>
        <View style={styles.inputFieldContainer}>
          <View style={styles.inputFieldWrapper}>
            <TextInput
              style={styles.inputField}
              placeholder="Enter Amount"
              placeholderTextColor="#ccc"
              value={amount}
              onTouchEnd={()=>{Functions.getInstance().fireAdjustEvent("2a2l27")}}
              onChangeText={handleAmountChange}
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>
    );
  };





  const renderFooter = () => {
    return (
      <View style={styles.buttonMainContainer}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleContinue}>
          <Text style={styles.buttonText}>
            {amount
              ? `Add ₹ ${amount}`
              : `Add ₹ ${selectedBox != null ? selectedBox : ''}`}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };





  return (
    <ScrollView style={styles.scrollViewContainer} keyboardShouldPersistTaps='always'>
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <View style={styles.mainContainer}>
          {/* <Text style={styles.headerText}>Redeem Your Money</Text> */}
          <View style={styles.selectAmountContainer}>
            {/* <View style={styles.moneyContainer}>
              <Text style={styles.boxHeader}>Select Amount</Text>
              {renderMoneyContainer()}
            </View> */}
            {renderTextInput()}
          </View>





          <View style={{marginTop : 30, backgroundColor : '#383838',borderRadius:10}}>
            <View style={{flexDirection:'row',padding:20}}>
              <Text style={{color:'white',fontWeight:'bold',fontSize : 14,flexBasis: '90%'}}>GST Calculation</Text>
              <Tooltip
                  isVisible={toolTipVisible}
                  content={<Text style={{color : 'black'}}>Effective from 1st October 2023, GST at 28% on all online gaming platforms is charged on the deposits made and there will be no separate GST on winnings.</Text>}
                  placement="top"
                  onClose={() =>settoolTipVisible(false)}
                >
                  <TouchableOpacity onPress={()=>settoolTipVisible(true)}>
                    <Image source={InfoWallet} />
                  </TouchableOpacity>
                </Tooltip>
            </View>
             <View>
                <View style={{flexDirection:'row',alignItems:'center',paddingBottom:8,paddingLeft:20,paddingRight:20}}>
                  <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12,flexBasis: '50%'}}>Deposit Amount </Text> 
                  <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12,flexBasis:'45%',textAlign:'right'}} >₹ {amount}</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',paddingBottom:8,paddingLeft:20,paddingRight:10}}>
                   <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12,flexBasis: '50%'}}>GST Amount (28%) </Text>
                   <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12,flexBasis:'42%',textAlign:'right'}} >-₹ {(amount*28)/100}</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',paddingBottom:8,paddingLeft:20,paddingRight:10}}>
                  <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12,flexBasis: '50%'}}>Bonus Amount </Text>
                  <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12,flexBasis:'42%',textAlign:'right'}} >+₹ {amount > 1000 ? 0 : ((amount*28)/100)}</Text>
                </View>
                <View style={{borderBottomWidth:1,borderBottomColor:'grey' ,width:'100%',paddingBottom:8}}></View>
                <View style={{flexDirection:'row',alignItems:'center',paddingBottom:8,paddingLeft:20,paddingRight:20, paddingTop : 10}}>
                  <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12,flexBasis: '50%'}}>Total Amount</Text>
                  <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12,flexBasis:'45%',textAlign:'right'}}>₹ {amount > 1000 ? (amount - ((amount*28)/100) + 0) : amount}</Text>
                </View>
              </View>
          </View>
          {renderFooter()}
        </View>


      </KeyboardAvoidingView>
      <View style={styles.backgroundBagImages}>
        <Image
          resizeMode="contain"
          style={{width: 150, height: 150}}
          source={BagRupees}
        />
      </View>
    </ScrollView>
  );
};
export default WithProgress(AddMoneyScreen);
