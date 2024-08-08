import { View, Text, ScrollView, TouchableOpacity, Alert, Linking, StatusBar, BackHandler, ImageBackground, AppState, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import ImageSlider from './common/ImageSlider'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './crickLeagueStyles/CricketLeague.style'
import MatchesList from './common/MatchesList'
import WithProgress from '../LoadingOverlay/WithProgress'
import Geolocation from '@react-native-community/geolocation';
import Functions from '../Functions'
import AsyncStorage from '@react-native-community/async-storage'
import Popup from '../customComponents/Popup'
import UserStore from '../../stores/UserStore'
import Services from '../../../Services/Services'
import RestrictedLocation from '../customComponents/RestrictedLocation'
import MatchBanner from './MatchBanner'
import InsufficientWallet from '../customComponents/InsufficientWallet'
import GameRulesPopup from '../customComponents/GameRulesPopup'
import ReactMoE,{
  MoEProperties,
} from "react-native-moengage";
import KycPendingPopup from '../customComponents/KycPendingPopup'
import { CrossImage } from '../../../assets'



let userInfo,selectedMatch,contestPriceNew=0;
const ChooseContest = ({navigation,showProgress,hideProgress }) => {
  const [selectedContest, setSelectedContest] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [contestPrices, setcontestPrices] = useState(
    [
      {"contestId" : 1,"price" : 1},
      // {"contestId" : 5,"price" : 2},
      // {"contestId" : 6,"price" : 3},
      // {"contestId" : 7,"price" : 4},
      {"contestId" : 2,"price" : 5},
      {"contestId" : 3,"price" : 10},
      {"contestId" : 4,"price" : 20},
    ]
    );
    const [upcomingMatches, setupcomingMatches] = useState([]);
    const [askLocation, setaskLocation] = useState(false);
    const [restricted, setRestricted] = useState(false);
    const [insufficient, setInsufficient] = useState(false);
    const [gameRules, setGameRules] = useState(false);
    const [prevContests, setprevContests] = useState([]);
    const [kycPending, setkycPending] = useState(false);
    const [maxReturn, setMaxReturn] = useState("");
    const [maxRunDiff, setRunDiff] = useState("");




  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      selectedMatch = UserStore.selectedMatch;
      getData();
    });
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    })
    // const handleAppStateChange = (nextAppState) => {
    //   if (nextAppState === 'active') {
    //     getData();
    //   }
    // };
    // AppState.addEventListener('change', handleAppStateChange);
    return () => {
      unsubscribe();
      backHandler.remove()
      // AppState.removeEventListener('change', handleAppStateChange);
    };
  }, ([navigation]));



  const getData= async() =>{
    showProgress();
    userInfo = JSON.parse(await AsyncStorage.getItem("player6-userdata"));
    AsyncStorage.setItem('Opn', "null");
    Functions.getInstance().checkInternetConnectivity();
    Functions.getInstance().checkExpiration(userInfo.userId, userInfo.refToken, navigation);
    Functions.getInstance().offlineUpComingMatches().then(result => {
      setupcomingMatches(result);
      
    });
    console.log(userInfo.accesToken)
    Services.getInstance().previousContests(userInfo.userId, selectedMatch.matchId, userInfo.accesToken).then((result)=>{
      console.log("Previous contest", result)
      AsyncStorage.setItem("prev-contests", JSON.stringify(result.msg));
      setprevContests(result.msg);
      hideProgress();
    })

    
  }




    // function to check permissions and get Location
  // const getLocation = () => {
  //   if(selectedContest == ''){
  //     Functions.getInstance().Toast("error","Select a contest from the list");
  //   }
  //   else{
  //     const result = Functions.getInstance().requestLocationPermission();
  //     result.then(res => {
  //       if (res) {
  //         showProgress();
  //         Geolocation.getCurrentPosition(
  //           position => {
  //             const latitude = position.coords.latitude;
  //             const longitude = position.coords.longitude;
  //             setLatitude(latitude);
  //             setLongitude(longitude);
  //             setTimeout(function(){
  //               if(latitude !== "" && longitude !== ""){
  //                 pricesPage();
  //               }
  //               else{
  //                 Functions.getInstance().Toast("error","You are from an unauthorized location");
  //                 hideProgress();
  //               }
  //             },2000)
              
  //           },
  //           error => {
  //             hideProgress();
  //             console.log("Error getting geolocation: " + error.code, error.message);
  //           },
  //           { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  //         );
  //       }
  //       else{
  //       // setaskLocation(true);   
  //       }
  //     });
  //   }

  // };




  const getLocation2 = () => {
    Functions.getInstance().fireAdjustEvent("5mu6ml");
    Functions.getInstance().fireFirebaseEvent("ChooseYourContest");
    if(selectedContest == ''){
      hideProgress();
      Functions.getInstance().Toast("error","Select a contest from the list");
    }
    else{
        const result = Functions.getInstance().requestLocationPermission();
        let properties = new MoEProperties();
        properties.addAttribute("location tracking Prompt", true);
        ReactMoE.trackEvent("Choose your Contest", properties);

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
                  pricesPage2(latitude,longitude);
                },
                error => {
                  hideProgress();
                  console.log("Error getting geolocation: " + error.code, error.message);
                  Functions.getInstance().Toast("error", "Please enable your device location");
                },
                { timeout: 15000}
              );
            }
            else{
              pricesPage2(latitude,longitude);
            }

          }
          else{
          // setaskLocation(true);   
          }
        });
     }
    }




  const userSelectedItem = (item) =>{
      showProgress();
      setSelectedContest(item);
      UserStore.setselectedContest(item);
      AsyncStorage.setItem("selected-game-match", JSON.stringify(selectedMatch));
      AsyncStorage.setItem("selected-game-contest", JSON.stringify(item));
      if(item.contestId == 1){
        Functions.getInstance().fireAdjustEvent("v2x2e0");
        Functions.getInstance().fireFirebaseEvent("ContestRs1");
        let properties = new MoEProperties();
        properties.addAttribute("₹1", true);
        ReactMoE.trackEvent("Contest tier", properties);
      }
      if(item.contestId == 2){
        Functions.getInstance().fireAdjustEvent("nvaoo6");
        Functions.getInstance().fireFirebaseEvent("ContestRs5");
        let properties = new MoEProperties();
        properties.addAttribute("₹5", true);
        ReactMoE.trackEvent("Contest tier", properties);
      }
      if(item.contestId == 3){
        Functions.getInstance().fireAdjustEvent("ngc4ay");
        Functions.getInstance().fireFirebaseEvent("ContestRs10");
        let properties = new MoEProperties();
        properties.addAttribute("₹10", true);
        ReactMoE.trackEvent("Contest tier", properties);
      }
      if(item.contestId == 4){
        Functions.getInstance().fireAdjustEvent("ifj89x");
        Functions.getInstance().fireFirebaseEvent("ContestRs20");
        let properties = new MoEProperties();
        properties.addAttribute("₹20", true);
        ReactMoE.trackEvent("Contest tier", properties);
      }
      Services.getInstance().getEntryFees(userInfo.userId, userInfo.accesToken, item.contestId,  selectedMatch.matchType).then((result)=>{
        console.log(result);
        contestPriceNew = result.price;
        AsyncStorage.setItem('contestPriceValue',(result.price))
        const MaxReturnvalue = (((result.price)*2) - (((result.price)*8)/100));
        setMaxReturn(MaxReturnvalue);
        if(result.priceId == "1"){
          setRunDiff("25");
        }else if(result.priceId == "2"){
          setRunDiff("50");
        }else if(result.priceId == "3"){
          setRunDiff("100");
        }else if(result.priceId == "4"){
          setRunDiff("50");
        }else if(result.priceId == "5"){
          setRunDiff("100");
        }else if(result.priceId == "6"){
          setRunDiff("200");
        }else if(result.priceId == "7"){
          setRunDiff("100");
        }else if(result.priceId == "8"){
          setRunDiff("200");
        }else if(result.priceId == "9"){
          setRunDiff("400");
        }else if(result.priceId == "10"){
          setRunDiff("200");
        }else if(result.priceId == "11"){
          setRunDiff("300");
        }else if(result.priceId == "12"){
          setRunDiff("500");
        }else{
          setRunDiff("");
        }
        hideProgress();
    })
    }


  const pricesPage2 = (L1,L2) =>{
    let properties = new MoEProperties();
    properties.addAttribute("Choose your contest", true);
    ReactMoE.trackEvent("Match tile", properties);
    if(selectedContest == ''){
      hideProgress();
      Functions.getInstance().Toast("error","Select a contest from the list");
    }
    else{
      showProgress();
      const obj = {
        lat: L1,
        lng: L2,
        page: "game room enty"
      }
      Services.getInstance().verifyLocation(userInfo.userId, userInfo.accesToken,obj).then((result)=>{
        if(result.status == 200 && result.locVerify == true){
          hideProgress();
          if((result.aadhaarVerify == "0")){
            AsyncStorage.setItem("from", "contest");
            setkycPending(true);

          }
          else if((result.aadhaarVerify == "1") && ((parseInt(result.walletBal)) >= contestPriceNew)){
            let properties = new MoEProperties();
            properties.addAttribute("Redirect to Play Now", true);
            ReactMoE.trackEvent("Choose your Contest", properties);
            navigation.navigate("EntryFee",{
              maxReturn : maxReturn,
              maxRunDiff : maxRunDiff
            });
          }
          else if((result.aadhaarVerify == "1") && ((parseInt(result.walletBal)) < contestPriceNew)){
            AsyncStorage.setItem("from", "contest");
            UserStore.setkycBtnTitle("Start playing");
            setInsufficient(true);
            // navigation.navigate("Wallet");
          }
          else if(result.aadhaarVerify == "2"){
            Functions.getInstance().Toast("error", "Your KYC has been rejected,You can't participate in contest")
          }
          else{
            AsyncStorage.setItem("from", "contest");
            setInsufficient(true);
            // navigation.navigate("Wallet");
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
      // 
    }
  }












    //render contest content
    const renderContestContent = (item,setContest) => {
      return (
        <TouchableOpacity
          key={item.contestId}
          disabled={prevContests.includes(String(item.contestId))}
          style={[
            prevContests.includes(String(item.contestId)) ? [styles.contestItem,{backgroundColor : "#525151"}] 
            :
            selectedContest?.contestId === item.contestId
              ? styles.activeContestItem
              : styles.contestItem,
            item.isDisabled && styles.disabled
          ]}
          onPress={() => userSelectedItem(item)}
          >
          <Text
            style={[
              selectedContest?.contestId === item.contestId
                ? styles.activeContestText
                : styles.contestText,
            ]}>{`${item.price}x`}</Text>
        </TouchableOpacity>
      );
    };




  return (
    <SafeAreaView style={styles.root}>
      <StatusBar backgroundColor="#111111" />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.mainContainer}>
           <MatchBanner selectedUserMatch = {selectedMatch}/>
          <View style={styles.contestContainer}>
                <View style={styles.contestList}>
                  {contestPrices.map(item => renderContestContent(item))}
                </View>
                <TouchableOpacity
                  disabled={selectedContest === undefined}
                  onPress={() => {
                    // pricesPage();
                    // pricesPage2();
                    getLocation2();
                  }}
                  >
                  <View style={styles.chscnst}>
                    <Text style={[styles.chstxt, styles.plynw]}>Choose Your Contest</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    setGameRules(true);
                    let properties = new MoEProperties();
                    properties.addAttribute("Game rules", true);
                    ReactMoE.trackEvent("Match tile", properties);
                  }}>
                  <Text style={styles.termsCondition}>Game Rules</Text>
                </TouchableOpacity>
          </View>


        {selectedContest != "" ?
        <View style={{backgroundColor: '#383838' ,marginTop:10,borderRadius:12,padding:10, marginBottom : 50}}> 
          <View style={{backgroundColor:'#525151',borderRadius:16,flexDirection:'row',justifyContent:'space-between',padding:5,paddingRight:14,paddingLeft:14}}>
            <Text style={[styles.chstxt,{color:"white", fontSize:11}]}>Maximum Return</Text>
            <Text style={[styles.chstxt,{color:"white", fontSize:11}]}>₹ {maxReturn}</Text>
          </View>
          <View style={{marginTop:5,backgroundColor:'#525151',borderRadius:16,flexDirection:'row',justifyContent:'space-between',padding:5,paddingRight:14,paddingLeft:14}}>
            <Text style={[styles.chstxt,{color:"white", fontSize:11}]}>Maximum Run Difference</Text>
            <Text style={[styles.chstxt,{color:"white", fontSize:11}]}>{maxRunDiff}</Text>
          </View>

          <View style={{display: 'flex',flexDirection:'row',justifyContent:"space-between", marginTop:10,backgroundColor:'#46361f',borderRadius:14,padding:5,paddingRight:14,paddingLeft:14}}>
            <View style={{borderRightColor : 'white', flexBasis: "50%",borderRightWidth: 0.8,borderStyle: "dashed"}}>
                <Text style={[{color:"white", fontSize:11,textAlign:'center',fontFamily: 'Poppins-SemiBold'}]}>Winnings</Text>
                <View style={{flexDirection : 'row', justifyContent : 'space-around', display: 'flex', alignItems : 'center', marginTop : 10, marginRight : 10}}>
                    <View style={{flexDirection : 'column', display: 'flex'}}>
                        <Text style={[{color:"white", fontSize:11,textAlign:'left',fontFamily: 'Poppins-SemiBold'}]}>Runs</Text>
                        <Text style={[{color:"white", fontSize:11,textAlign:'left',fontFamily: 'Poppins-SemiBold'}]}>Difference</Text>
                    </View>
                    <View >
                      <Image source={CrossImage} style={{width : 15, height : 15}}/>
                    </View>
                    <View style={{flexDirection : 'column', display: 'flex'}}>
                        <Text style={[{color:"white", fontSize:11,textAlign:'right',fontFamily: 'Poppins-SemiBold'}]}>Contest</Text>
                        <Text style={[{color:"white", fontSize:11,textAlign:'right',fontFamily: 'Poppins-SemiBold'}]}>Multiplier</Text>
                    </View>
                  </View>
            </View>
            
            <View style={{display: 'flex', marginTop : 10}}>
                <Text style={[{color:"white", fontSize:11,textAlign:'center',fontFamily: 'Poppins-SemiBold'}]}>50% chance of</Text>
                <Text style={[{color:"white", fontSize:11,textAlign:'center',fontFamily: 'Poppins-SemiBold'}]}>winning everytime</Text>
                <Text style={[{color:"white", fontSize:11,textAlign:'center',fontFamily: 'Poppins-SemiBold'}]}>you play</Text>
            </View>
          </View>
        </View>

        : "" }


         





          <MatchesList
            title="Upcoming Matches"
            showMore={false}
            data={[]}
            extraData={[]}
            onPressMatch={() => {}}
          />
        </View>

      {askLocation ?
        <Popup 
        onClose={() => setaskLocation(false)}
        />
      : ""}

      {restricted ? 
      <RestrictedLocation
        onClose={() => setRestricted(false)} 
      />
      : "" }

      {insufficient ? 
        <InsufficientWallet
            onClose={()=>setInsufficient(false)}
            onYes = {()=>{
              setInsufficient(false);
              navigation.navigate("Wallet");
            }}
            amount = {contestPriceNew}
        />
        : "" }




    {gameRules ? 
      <GameRulesPopup
        onClose={() => setGameRules(false)}
      />
      : "" }


{kycPending ? 
      <KycPendingPopup
        onClose={()=>setkycPending(false)}
        onYes={()=>{
          UserStore.setkycBtnTitle("Start playing");
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




      </ScrollView>
    </SafeAreaView>
  )
}

export default WithProgress(ChooseContest)