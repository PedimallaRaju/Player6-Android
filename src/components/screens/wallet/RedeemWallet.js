import React, {FC, useEffect, useState} from 'react';
import {
  BackHandler,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BagRupees, BankBlueIcon, Info, InfoWallet, InsufficientBalance, TickIcon} from '../../../assets';
import WithProgress from '../LoadingOverlay/WithProgress';
import { styles } from './AddMoneyWallet.styles';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Services from '../../../Services/Services';
import { Buffer } from 'buffer';
import { sha256 } from "react-native-sha256";
import PhonePePaymentSDK from 'react-native-phonepe-pg';
import Functions from '../Functions';
import { secondary } from '../../../style';
import RedeemSuccessPopup from './RedeemSuccessPopup';
import Tooltip from 'react-native-walkthrough-tooltip';
import ReactMoE,{
  MoEProperties,
} from "react-native-moengage";




let userInfo,f_tds;
const RedeemWallet = ({navigation,showProgress,hideProgress}) => {
  const [amount, setAmount] = useState('');
  const [bankList, setBankList] = useState([]);
  const [totalDeposits, setTotalDeposits] = useState('');
  const [totalWithDraws, setTotalWithDraws] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [tdsReq, setTdsReq] = useState(false);
  const [bankId, setBankId] = useState('');
  const [successVisible, setSuccessVisible] = useState(false);
  const [toolTipVisible,settoolTipVisible] = useState(false);
  const [oldTDS, setOldTDS] = useState('');



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
    showProgress();
    userInfo = JSON.parse(await AsyncStorage.getItem("player6-userdata"));

    Services.getInstance().getTransactionDetailsTDS(userInfo.userId, userInfo.accesToken).then((result)=>{
      console.log(result);
      if(result.status == 200){
        setTotalDeposits(result.msg.deposits);
        setTotalWithDraws(result.msg.withDrawals);
        setMaxAmount(result.msg.maxWith);
        setOldTDS(result.msg.oldTds);
      }
    })

    Services.getInstance().getBankDetails(userInfo.userId, userInfo.accesToken).then((result)=>{
      console.log(result);
      hideProgress();
      if(result.status == 200){
        setBankList(result.msg);
        if(result.msg.length > 0){
          result.msg.forEach(element => {
            if(element.isPrimary == '1'){
              setBankId(element.id);
            }
          });
        }
      }
    })

  }




  const handleAmountChange = (text) => {
    // Remove non-numeric characters from the input
    const cleanedText = text.replace(/[^0-9]/g, '');
    setAmount(cleanedText);
    f_tds = ((Number(totalWithDraws)) + (Number(cleanedText)) - (Number(totalDeposits)))
    if(cleanedText == ''){
      setTdsReq(false);
    }
    else if((((f_tds*30)/100) - oldTDS) > 0){
      setTdsReq(true);
    }
    else{
      setTdsReq(false);
    }
  };




  const changePrimary = (data,id) =>{
    setBankList(prevList => {
      const updatedList = prevList.map(element => {
        if (element.id == id) {
          setBankId(element.id);
          return { ...element, isPrimary : "1" };
        }
        else{
          return { ...element, isPrimary : "0" };
        }
      });
      return updatedList;
    });

  }



  
  const sendWithDrawRequest = async () => {
    Keyboard.dismiss();
    if(amount == ""){
      Functions.getInstance().Toast("error","Enter an amount to withdraw");
    }
    else if(amount < 300){
      Functions.getInstance().Toast("error","Minimum ₹ 300 is required to withdraw");
    }
    else if(amount > maxAmount){
      Functions.getInstance().Toast("error",`You can't redeem more than ₹. ${maxAmount}`);
    }
    else if(bankId == ""){
      Functions.getInstance().Toast("error","Select bank account");
    }
    else{
      showProgress();
      const obj ={
        amount : amount,
        bankId : bankId
      }
      console.log(obj);
      Services.getInstance().sendRequestForWithdrawal(obj, userInfo.userId, userInfo.accesToken).then((result)=>{
        console.log(result);
        if(result.status == 200){
          hideProgress();
          setSuccessVisible(true);
          ReactMoE.setUserAttribute("Redeem ", amount);
        }
        else if(result.status == 203){
          hideProgress();
          Functions.getInstance().Toast("error", result.error);
        }
        else{
          hideProgress();
          Functions.getInstance().Toast("error", "We are unable to process the request now, Please try again later");
        }
      })
    }
    
  }









// const returnACNumber = (number) =>{
//   const lastFourDigits = number.substring(number.length - 4);
//   const maskedString = "X".repeat(number.length - 4) + lastFourDigits;
//   return maskedString;
// }













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
              onChangeText={handleAmountChange}
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>
    );
  };










  return (
    <View style={{flex : 1, backgroundColor : '#111111'}}>
    <ScrollView style={styles.scrollViewContainer} keyboardShouldPersistTaps='always'>
      {/* <KeyboardAvoidingView style={{flex: 1}} behavior="padding"> */}
        <View style={styles.mainContainer}>
          <Text style={styles.headerText}>Redeem Your Money</Text>
          <View style={styles.selectAmountContainer}>
            {renderTextInput()}
          </View>




        <View>
          <View style={{marginTop : 30, backgroundColor : '#383838',borderRadius:10}}>
            <View style={{flexDirection:'row',padding:20,}}>
              <Text style={{color:'white',fontWeight:'bold',fontSize : 14,flexBasis: '90%'}}>TDS Calculation</Text>
              <Tooltip
                  isVisible={toolTipVisible}
                  content={<Text style={{color : 'black'}}>According to the law TDS @ 30% is deducted on your net winnings only i.e. Winnings from all games after adjusting for the losses at the time of withdrawal.</Text>}
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
                  <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12,flexBasis: '50%'}}>Requested Amount </Text> 
                  <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12,flexBasis:'45%',textAlign:'right'}} >₹ {amount}</Text>
                </View>
                { tdsReq ? 
                <View style={{flexDirection:'row',alignItems:'center',paddingBottom:8,paddingLeft:20,paddingRight:10}}>
                   <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12,flexBasis: '50%'}}>TDS deductions </Text>
                   <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12,flexBasis:'42%',textAlign:'right'}} >-₹ {(((f_tds*30)/100) - oldTDS).toFixed(2)}</Text>
                </View>
                : "" }
                <View style={{borderBottomWidth:1,borderBottomColor:'grey' ,width:'100%'}}></View>
                <View style={{flexDirection:'row',alignItems:'center',paddingBottom:8,paddingLeft:20,paddingRight:20,paddingTop:10}}>
                  <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12,flexBasis: '50%'}}>Total Receivable Amount</Text>
                  <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12,flexBasis:'45%',textAlign:'right'}}>₹ { tdsReq ? (amount - (((f_tds*30)/100) - oldTDS)).toFixed(2) : amount}</Text>
                </View>
            </View>
          </View>
         </View>


    {bankList && bankList.length > 0 ?
      <Text style={{color:'white',fontWeight:'bold',fontSize : 14,paddingBottom:15,marginTop : 40}}>Select Bank</Text>
    : ""}
      {bankList && bankList.length > 0 ? bankList.map((account, index)=>{
        return(
              <View style={{ backgroundColor : '#383838',borderRadius:10,marginTop : 10,padding:10,flexDirection:'row',justifyContent:'space-between'}} key={index}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                  <View style={{width:40,height:40,borderRadius:8,backgroundColor:'#fff'}}>
                    <Image source={BankBlueIcon} style={{width:30,height:30,alignSelf:'center',marginTop:4}}/>
                  </View>
                  <View style={{paddingLeft:10}}>
                    <Text style={[styles.getVerifiedText,{color:'#fff'}]}>A/C : {account.accNumber}</Text>
                    <Text style={[styles.getVerifiedText,{fontSize:14,color:'#C5C5C5'}]}>IFSC : {account.ifsc}</Text>
                    <Text style={[styles.getVerifiedText,{fontSize:14,color:'#C5C5C5'}]}>Name : {account.name}</Text>
                  </View>
                </View>
                <TouchableWithoutFeedback onPress={()=>{changePrimary(account, account.id)}}>
                  <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'space-between', padding:15}}>
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
                          alignItems:'center',
                          justifyContent:'center',
                          backgroundColor: account.isPrimary == "1" ? '#32CD32' : 'transparent',
                        }}
                      >
                      {account.isPrimary == "1" && (
                        <Image style={styles.tickMarkImage} source={TickIcon} />
                     )}
                    </View>
                </View>
              </TouchableWithoutFeedback>
                  
              </View>
        )
      }) : ""}

         <View style={{marginTop:15,marginBottom : 30}}>
          <TouchableOpacity onPress={
            ()=>{
              AsyncStorage.setItem("bankRedType", "RedeemMoney");
              navigation.navigate("KYC",{
                screen : "BankAccount"
              })
              
            }

            }>
            <Text style={{fontSize:16,color:'#C5C5C5',textAlign:'right', fontFamily: 'Poppins-SemiBold'}}>+  Add New Bank</Text>
          </TouchableOpacity>
         </View>
        </View>

        <RedeemSuccessPopup 
          isVisible={successVisible}
          closePopup={()=>{
            setSuccessVisible(false);
            navigation.navigate("Wallet");
          }}
        />
      {/* </KeyboardAvoidingView> */}
    </ScrollView>

    <TouchableOpacity onPress={()=>{
          Functions.getInstance().fireAdjustEvent("3ylcwt");
          sendWithDrawRequest();
        }}>
      <View style={{marginBottom : 62,backgroundColor:secondary,borderRadius:8,padding:15,marginRight:12,marginLeft:12}}>
        <Text style={{color : 'white',textAlign:'center',fontFamily : 'Poppins-SemiBold'}}>Continue</Text>
      </View>
    </TouchableOpacity>




    </View>
  );
};
export default WithProgress(RedeemWallet);
