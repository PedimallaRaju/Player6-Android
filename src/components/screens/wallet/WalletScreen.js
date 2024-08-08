import React, { FC, useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ImageBackground,
  BackHandler,
} from 'react-native';

import { PlusIcon, Reedem, Rupees, Wallet1, WalletBox, WalletEmpty } from '../../../assets';
import { styles } from './WalletScreen.styles';
import WithProgress from '../LoadingOverlay/WithProgress';
import Functions from '../Functions';
import Geolocation from '@react-native-community/geolocation';
import Services from '../../../Services/Services';
import UserStore from '../../stores/UserStore';
import AsyncStorage from '@react-native-community/async-storage';
import RestrictedLocation from '../customComponents/RestrictedLocation';
import { useFocusEffect } from '@react-navigation/native';
import KycPendingPopup from '../customComponents/KycPendingPopup';
import ReactMoE,{
  MoEProperties,
} from "react-native-moengage"; 
import KYCPopupRedeem from '../customComponents/KYCPopupRedeem';

let userInfo,contestPriceValue,source, totalDepositAmount = 0, totalWithDrawAmount = 0;
const WalletScreen = ({navigation,userStore,showProgress,hideProgress}) => {
  const [selectedButton, setSelectedButton] = useState('All');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [restricted, setRestricted] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const [inPlayBalance, setInPlayBalance] = useState();
  const [withdrawlBalance, setwithdrawlBalance] = useState();
  const [kycPending, setkycPending] = useState(false);
  const [kycPendingRedeem, setkycPendingRedeem] = useState(false);
  
  // const userService = useUserService();









  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    })
    const unsubscribe = navigation.addListener('focus', () => {
      getUserData();
    });

    return ()=>{
      unsubscribe();
      backHandler.remove();
    };
  }, []);




  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.navigate('CricketLeague');
        return true;
      });

      return () => {
        backHandler.remove();
      };
    }, [])
  );




  const getUserData = async() =>{
    userInfo = JSON.parse(await AsyncStorage.getItem("player6-userdata"));
    source = await AsyncStorage.getItem("from");
    contestPriceValue = await AsyncStorage.getItem('contestPriceValue');
    getAllWalletTransactions();
  }






  const getAllWalletTransactions = async () => {
    showProgress();
    Services.getInstance().getAllWalletTransactions(userInfo.userId,userInfo.accesToken).then((result)=>{
      console.log(result);
      if(result.status == 200){
        setWalletBalance(result.msg.totalBalen);
        setAllTransaction(result.msg.userRecords);
        setInPlayBalance(result.msg.inPlayBalen);
        setwithdrawlBalance(result.msg.withBalen);
        fireMoEngageEvent(result.msg.userRecords);
        hideProgress();
      }
      else{
        hideProgress();
      }
      
    })

  };

  const getData = (tab) => {
    if (tab === 'Credits') {
      let properties = new MoEProperties();
      properties.addAttribute("Credits", true);
      ReactMoE.trackEvent("Wallet Section", properties);
      return allTransaction?.filter(
        transaction => (transaction.credit > 0),
      );
    }
    else if (tab === 'Debits') {
      let properties = new MoEProperties();
      properties.addAttribute("Debits", true);
      ReactMoE.trackEvent("Wallet Section", properties);
      return allTransaction?.filter(
        transaction => (transaction.debit > 0),
      );
    }
    return userStore?.walletTransactions?.filter(
      transaction => transaction.debited,
    );
  };

  const navigationHandler = (screen) => {
    return navigation?.navigate(screen);
  };



  const fireMoEngageEvent = (data) =>{
    data.forEach(element => {
      if(element.text == "Funds deposit"){
        totalDepositAmount = totalDepositAmount + Number(element.credit);
      }
      if(element.text == "Withdraw"){
        totalWithDrawAmount = totalWithDrawAmount + Number(element.debit);
      }
    });
    ReactMoE.setUserAttribute("Amount Added", totalDepositAmount);
    ReactMoE.setUserAttribute("Amount Withdrawn", totalWithDrawAmount);
    ReactMoE.setUserAttribute("Wallet Balance", Number(walletBalance));
    let properties = new MoEProperties();
    const date = new Date();
    properties.addAttribute("Cash Deposited", true);
    properties.addAttribute("Amount", totalDepositAmount);
    properties.addAttribute("Date", date.toLocaleDateString());
        properties.addAttribute("Time", date.toLocaleTimeString());
    ReactMoE.trackEvent("All", properties);
  }





  const checkLocation = () =>{
    // navigation.navigate('AddMoney');

    let properties = new MoEProperties();
    properties.addAttribute("Add money", true);
    ReactMoE.trackEvent("Wallet Section", properties);
    const result = Functions.getInstance().requestLocationPermission();
    Functions.getInstance().fireAdjustEvent("dm69c1");
    Functions.getInstance().fireFirebaseEvent("AddMoneyToWallet");
    result.then(res => {
      if (res) {
        showProgress();
        if(latitude == ''){
          Geolocation.getCurrentPosition(
            position => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              setLatitude(latitude);
              setLongitude(longitude);
              UserStore.setlattitude(latitude);
              UserStore.setlongitude(longitude);
              checkKYC(latitude,longitude);
            },
            error => {
              hideProgress();
              console.log("Error getting geolocation: " + error.code, error.message);
              Functions.getInstance().Toast("error", "Please enable your device location");
            },
            { timeout: 15000 }
          );
        }
        else{
          AsyncStorage.setItem("player6-lat", String(latitude));
          AsyncStorage.setItem("player6-long", String(longitude));
          checkKYC(latitude,longitude);
          
        }

      }
      else{
      // setaskLocation(true);   
      }
    });
  }




  const checkKYC =(L1,L2)=>{
      const obj = {
        lat: L1,
        lng: L2,
        page: "wallet deposit"
      }
      Services.getInstance().verifyLocation(userInfo.userId, userInfo.accesToken,obj).then((result)=>{
        console.log(result);
        if(result.status == 200 && result.locVerify == true){
          hideProgress();
          if(result.aadhaarVerify == "0"){
            AsyncStorage.setItem("kyc-type", "Adhar");
            AsyncStorage.setItem("from", "wallet");
            // UserStore.setkycBtnTitle("Add Money");
            setkycPending(true);
            // navigation.navigate('KYC', { 
            //   screen: 'KycPage',
            //   params: {require : "Adhar"}
            // });
          }
          else if(result.aadhaarVerify == "1"){
            if((source == "contest") && ((parseInt(result.walletBal)) > contestPriceValue)){
              navigation.navigate("EntryFee");
            }
            else if((source == "contest") && ((parseInt(result.walletBal)) < contestPriceValue)){
              Functions.getInstance().Toast("error",`Insufficient Wallet Balance, This contest require min Rs.${contestPriceValue}`);
              navigation.navigate('AddMoney');
            }
            else{
              // Functions.getInstance().Toast("success", "KYC verification has been done already");
              navigation.navigate('AddMoney');
            }
          }
          else{
            Functions.getInstance().Toast("error", "KYC verification has been rejected");
          }
        }
        else if(result.status == 401){
          hideProgress();
          setRestricted(true);
        }
        else{
          hideProgress();
          setRestricted(true);
        }
      })
  }











  const redeemMoneyFun = () =>{
    showProgress();
    let properties = new MoEProperties();
    properties.addAttribute("Redeem Money", true);
    ReactMoE.trackEvent("Wallet Section", properties);
    Services.getInstance().checkKYCStatus(userInfo.userId, userInfo.accesToken).then((result)=>{
      console.log(result);
      hideProgress();
      if(result.status == 200){
        if((result.msg.aadhaarVerify != "1") || (result.msg.bankVerify != "1") || (result.msg.panVerify != "1") || (result.msg.email != "1") || (result.msg.number != "1")){
          setkycPendingRedeem(true);
        }
        else if(result.msg.aadhaarVerify == "1"){
          navigationHandler('RedeemMoney');
        }
        else{
          Functions.getInstance().Toast("error", "KYC verification has been rejected");
        }
      }
    })
  }







  const cardHeader = () => {
    return (
      <View style={styles.boxHeaderContainer}>
        <Text style={styles.boxHeader}>Total Balance</Text>
        <View style={styles.imageContainer}>
          <Image
            style={styles.imageContent}
            source={Wallet1}
            resizeMode="cover"
          />
        </View>
      </View>
    );
  };


  const cardUpperBody = () => {
    return (
      <View style={styles.commonFlex}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.imageContent}
            source={Rupees}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.textRupees}>
          {walletBalance}
        </Text>
      </View>
    );
  };

  const cardLowerBody = () => {
    return (
      <View style={{flexDirection : 'row', justifyContent : 'space-between'}}>

        <View style={{flexBasis:'35%'}}>
            <Text style={{
              fontSize: 12,
              fontFamily: 'Poppins-Medium',
              color: '#fff',
            }}>
              In play Amount
            </Text>
          <Text style={{
              fontSize: 16,
              fontFamily: 'Poppins-Medium',
              color: '#fff',
          }}>
            ₹ {inPlayBalance}
          </Text>
        </View>


          <View style={{flexBasis:'45%'}}>
              <Text style={{
                fontSize: 12,
                fontFamily: 'Poppins-Medium',
                color: '#fff',
                textAlign : 'left'
              }}>
                Withdrawable Amount
              </Text>
            <Text style={{
                fontSize: 16,
                fontFamily: 'Poppins-Medium',
                color: '#fff',
                textAlign : 'left'
            }}>
              ₹ {withdrawlBalance}
            </Text>
          </View>
      </View>

    );
  };

  const cardFooter = () => {
    return (
      <View style={[styles.commonFlex,{justifyContent : 'space-between'}]}>
        <TouchableOpacity
          // onPress={() => navigationHandler('AddMoney')}
          onPress={() => checkLocation()}
          style={[
            styles.buttonContainer,
            { width: '35%', marginRight: 15, backgroundColor: 'black' },
          ]}>
          <Text style={styles.buttonText}>Add Money</Text>
          <Image
            style={styles.cardButtonImages}
            source={PlusIcon}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => redeemMoneyFun()}
          style={[
            styles.buttonContainer,
            { width: '45%', backgroundColor: '#fff' },
          ]}>
          <Text style={[styles.buttonText, { color: 'black' }]}>
            Redeem Money
          </Text>
          <Image
            style={styles.reedemCardButtonImages}
            source={Reedem}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    );
  };


  
  const renderHistoryButton = (text) => {
    const buttonStyle =
      selectedButton === text ? styles.selectedButton : styles.summaryContent;
    const textStyle =
      selectedButton === text
        ? styles.selectedButtonText
        : styles.summaryContentText;

    return (
      <TouchableOpacity
        style={buttonStyle}
        onPress={() => setSelectedButton(text)}>
        <Text style={textStyle}>{text}</Text>
      </TouchableOpacity>
    );
  };









  const renderContent = ({ item }) => {
    return (
      <View style={styles.contentItem}>
        <View style={styles.flstlistContent}>
          <View>
            <Text style={styles.contentText}>{item.text}</Text>
            <Text style={styles.contentText}>
              {Functions.getInstance().displayMatchDateTime(item.dateCreated)}
            </Text>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <Text style={[styles.contentText, { textAlign: 'center' }]}>
              {
                (item.credit != "0" ? `+ ₹${item.credit}` : `- ₹${item.debit}`)
              }
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderAllContent = () => {
    switch (selectedButton) {
      case 'All':
        console.log('I am in ALL');
        return (
        allTransaction.length > 0 ? 
          <FlatList
            data={allTransaction}
            keyExtractor={item => item.trans_id}
            renderItem={renderContent}
            contentContainerStyle={styles.contentContainer}
          />

          :
          <View style={{marginTop:'50%',zIndex:222}}>
            <Image source={WalletEmpty} style={{width : '100%',resizeMode:"contain",height:120,alignSelf:'center'}}/>
          </View>
        
        );
      case 'Credits':
        console.log('Credits');
        return (
          getData('Credits').length > 0 ? 
          <FlatList
            data={getData('Credits')}
            keyExtractor={item => item.trans_id}
            renderItem={renderContent}
            contentContainerStyle={styles.contentContainer}
          />
          :
          <View style={{marginTop:'50%',zIndex:222}}>
            <Image source={WalletEmpty} style={{width : '100%',resizeMode:"contain",height:120,alignSelf:'center'}}/>
          </View>
        );
      case 'Debits':
        console.log('Debits');
        return (
          getData('Debits').length > 0 ? 
            <FlatList
              data={getData('Debits')}
              keyExtractor={item => item.trans_id}
              renderItem={renderContent}
              contentContainerStyle={styles.contentContainer}
            />
            :
            <View style={{marginTop:'50%',zIndex:222}}>
              <Image source={WalletEmpty} style={{width : '100%',resizeMode:"contain",height:120,alignSelf:'center'}}/>
            </View> 
        );
      default:
        return(
        <View style={{marginTop:'50%',zIndex:222}}>
          <Image source={WalletEmpty} style={{width : '100%',resizeMode:"contain",height:120,alignSelf:'center'}}/>
        </View>
        )
    }
  };

  return (
    <ScrollView style={styles.scrollViewContainer}>
      <View style={styles.mainContainer}>
        {/* <Text style={styles.headerText}>Player6 Wallet</Text> */}
        <ImageBackground source={WalletBox} style={styles.backgroundImage}>
          {cardHeader()}
          {cardUpperBody()}
          {cardLowerBody()}
          {cardFooter()}
        </ImageBackground>
        <View style={styles.paymentHistory}>
          <Text style={styles.summaryText}>Summary</Text>
          <View style={{ flexDirection: 'row' }}>
            {renderHistoryButton('All')}
            {renderHistoryButton('Credits')}
            {renderHistoryButton('Debits')}
          </View>
        </View>
        {renderAllContent()}
      </View>
      {restricted ? 
      <RestrictedLocation
        onClose={() => setRestricted(false)} 
      />
      : "" }

    {kycPending ? 
      <KycPendingPopup
        onClose={()=>setkycPending(false)}
        onYes={()=>{
          if(source == "contest"){
            UserStore.setkycBtnTitle("Start playing");
          }
          else{
            UserStore.setkycBtnTitle("Add Money");
          }
          AsyncStorage.setItem("kyc-type", "Adhar");
          setkycPending(false);
          let properties = new MoEProperties();
          properties.addAttribute("(KYC-Aadhar)> Continue button", userInfo.userId);
          ReactMoE.trackEvent("KYC verification (Aadhar)", properties);
          navigation.navigate('KYC', { 
            screen: 'KycPage',
            params: {require : "Adhar"}
          });
        }}
      />
    : ""}


{kycPendingRedeem ? 
      <KYCPopupRedeem
        onClose={()=>setkycPendingRedeem(false)}
        onYes={()=>{
          setkycPendingRedeem(false);
          navigation.navigate('EditProfile');
        }}
      />
    : ""}
    </ScrollView>
  );
};

export default WithProgress(WalletScreen);
