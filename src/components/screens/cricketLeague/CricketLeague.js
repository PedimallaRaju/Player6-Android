import { View, Text, ScrollView, Pressable,PermissionsAndroid, StatusBar, BackHandler, ToastAndroid, AppState, TouchableOpacity, RefreshControl} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ImageSlider from './common/ImageSlider'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './crickLeagueStyles/CricketLeague.style'
import MatchesList from './common/MatchesList'
import WithProgress from '../LoadingOverlay/WithProgress'
import Services from '../../../Services/Services'
import Functions from '../Functions'
import UserStore from '../../stores/UserStore'
import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation } from '@react-navigation/native'
import { secondary } from '../../../style'
import { checkVersion } from "react-native-check-version";
import AppVersionUpdate from '../customComponents/AppVersionUpdate'
import ReactMoE,{
  MoEGeoLocation,
  MoEProperties,
} from "react-native-moengage";
import VersionCheck from "react-native-version-check";
import BonusPopup from '../customComponents/BonusPopup'

let userInfo, count=0, contest_prices, bonusStatus;

const CricketLeague = ({navigation,showProgress,hideProgress}) => {
  const [runningMatches, setRunningMatches] = useState([]);
  const [upcomingMatches, setupcomingMatches] = useState([]);
  const [net, setNet] = useState();
  const [bannerData, setBannerData] = useState([]);
  const [load, setLoad] = useState(false);
  const [versionUpdate, setVersionUpdate] = useState(false);
  const [manualVersion, setManualVersion] = useState(false);
  const [bonusPopup, setBonusPopup] = useState(false);


  useEffect(() => {
    const unsubscribe = navigation?.addListener('focus', () => {
      setRunningMatches([]);
      setupcomingMatches([]);
      getData();
      checkPlayStoreVersion();
    });

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      count = count + 1;
      if(count%2 !== 0){
        Functions.getInstance().Toast("warning", "Press again to exit");
        return true;
      }
      else if(count%2 == 0){
        BackHandler.exitApp();
        return true;
      }
    })
    return () => {
      console.log("Leavng home")
      unsubscribe();
      backHandler.remove();
      // AppState.removeEventListener('change', handleAppStateChange);
    };
  }, ([bonusPopup]));






  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setRunningMatches(prevData =>
  //       prevData.map(item => ({
  //         ...item,
  //       }))
  //     );
  //   }, 60000);

  //   return () => clearInterval(intervalId);
  // }, []);




  

  const updateData = (data) => {
    if (!data) {
      console.warn('Data is undefined in updateData function.');
      hideProgress();
      return;
    }
    data.forEach(element => {
      element.timer = Functions.getInstance().getTimer(element.startTime);
      return element;
    });
    setRunningMatches(data);
    hideProgress();
  };





  // useEffect(() => {

  //   const handleAppStateChange = AppState.addEventListener('change', (nextAppState) => {
  //       if (nextAppState === 'active') {
  //           // active code
  //           console.log("Active at Home");
  //         }
  //         else{
  //           console.log("CLosed at Home");
  //         }
  //       return true;
  //     })
   
  //   return () => {
  //   handleAppStateChange.remove()
  //   };
  // }, []);















  const getData= async() =>{
    showProgress();
    AsyncStorage.setItem('Opn', "null");
    UserStore.setselectedMatch({});
    UserStore.setselectedContest({});
    UserStore.setopponentSocketData({});
    UserStore.setselectedGameData({});
    UserStore.setselectedTeamDetails({});
    userInfo = JSON.parse(await AsyncStorage.getItem("player6-userdata"));
    contest_prices = JSON.parse(await AsyncStorage.getItem("Contest-Prices"));
    bonusStatus = await AsyncStorage.getItem("Bonus-status");
    AsyncStorage.removeItem("from");
    AsyncStorage.removeItem("kyc-type");
    AsyncStorage.removeItem("prev-contests");
    AsyncStorage.setItem("toss", "null");
    AsyncStorage.setItem("players", "null");
    AsyncStorage.setItem("p6data", "null");
    AsyncStorage.setItem("pl6-socket", 'null');
    Functions.getInstance().checkExpiration(userInfo.userId, userInfo.refToken, navigation).then((result)=>{
      if(result == "home"){
        console.log("Loading Home page");
        loadHomePage();
      }
      else{
        Functions.getInstance().offlineRunningMatches().then(result => {
          updateData(result);
        });
        Functions.getInstance().offlineUpComingMatches().then(result => setupcomingMatches(result));
        hideProgress();
      }
    });
  }


 const loadHomePage = async() =>{
  userInfo = JSON.parse(await AsyncStorage.getItem("player6-userdata"));
  console.log("Loading Home page at 171");
  Functions.getInstance().checkInternetConnectivity().then((state)=>{
    UserStore.updateUserData(userInfo);
    if(state == true){
      Services.getInstance().getHomeBanners(userInfo.userId, userInfo.accesToken).then((result)=>{
        if(result.status == 200){
          console.log(result);
          const images = result.msg.map(element => element.name);
          setBannerData(images);
          setLoad(true);
        }
        else{
          setLoad(true);
        }
      })

      Services.getInstance().getRunningMatches(userInfo.userId, userInfo.accesToken).then((result)=>{
        console.log(result)
        if(result.status == 401){
          Functions.getInstance().offlineRunningMatches().then(result => {
            updateData(result);
          });
        }
        else{
            // setRunningMatches(result.list);
            updateData(result.list);
            checkVersionManually(result.version);
            console.log("bonus status : ", bonusStatus);
            console.log("Bonus POPUP, ", result.bonusPop);
            console.log("bonus status : ", typeof(bonusStatus) );
            console.log(" result.bonusPop : ", typeof( result.bonusPop) );
            if((typeof(bonusStatus) == "object") && (result.bonusPop == true)){
              setBonusPopup(true);
            }
            AsyncStorage.setItem("Running-Matches", JSON.stringify(result.list));
            // setInterval(function(){
            //   updateData(result.list);
            // }, 1000);
        }
      })
      Services.getInstance().getUpComingMatches(userInfo.userId, userInfo.accesToken).then((result)=>{
        setupcomingMatches(result.list);
        AsyncStorage.setItem("Upcoming-Matches", JSON.stringify(result.list));
      })

      if(!contest_prices){
        Services.getInstance().getAllContestPrices(userInfo.userId, userInfo.accesToken).then((result)=>{
          console.log(result);
          AsyncStorage.setItem("Contest-Prices", JSON.stringify(result.list));
        })
      }
      
    }
    else{
      Functions.getInstance().offlineRunningMatches().then(result => {
        // setRunningMatches(result);
        updateData(result);
        // setInterval(function(){
        //   updateData(result);
        // }, 1000);
      });
      Functions.getInstance().offlineUpComingMatches().then(result => setupcomingMatches(result));
      setLoad(true);
      hideProgress();

    }
  })
  
 }








 const checkVersionManually = (latestVers) =>{
  VersionCheck.needUpdate({
    currentVersion : VersionCheck.getCurrentVersion(),
    latestVersion : latestVers
  }).then((res)=>{
    console.log(" Manual Version : ",res);
    if(res.isNeeded){
      setManualVersion(true);
    }
  })
 }



  const getCurrentTime = () =>{
    var currentDate = new Date();
    // Get the components of the date and time
    var year = currentDate.getUTCFullYear();
    var month = ('0' + (currentDate.getUTCMonth() + 1)).slice(-2); 
    var day = ('0' + currentDate.getUTCDate()).slice(-2);
    var hours = ('0' + currentDate.getUTCHours()).slice(-2);
    var minutes = ('0' + currentDate.getUTCMinutes()).slice(-2);
    var seconds = ('0' + currentDate.getUTCSeconds()).slice(-2);
    var currentSystemTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    return currentSystemTime;
}
  

   const selectMatch = (data) =>{
    console.log(data);
    Functions.getInstance().checkInternetConnectivity().then((state)=>{
      if(state == true){
        Functions.getInstance().fireAdjustEvent("ezt32m");
        Functions.getInstance().fireFirebaseEvent("HomeUpComingMatches");
        Services.getInstance().checkSquad(userInfo.userId, data.item.matchId, userInfo.accesToken).then((result)=>{
          console.log(result);
          if(result.status == true){
            UserStore.setselectedMatch(data.item);
            navigation.navigate('ChooseContest');
          }
          else{
            if(result.msg == 'No Squad'){
              Functions.getInstance().Toast("error","Squads are yet to be announced!");
            }
            else if(result.msg == 'Started'){
              Functions.getInstance().Toast("error","Match has been started,You can't participate now");
            }
            else if(result.msg == 'No Content'){
              Functions.getInstance().Toast("error","Match has been started,You can't participate now");
            }
            
          }
        })
      }
      else{
        Functions.getInstance().Toast("error","Check your internet");
      }
    })

  }



  const checkPlayStoreVersion = async() =>{
    const version = await checkVersion();
    console.log("Got version info:", version);
    if (version.needsUpdate) {
      // your popup goes here
      console.log(`App has a ${version.updateType} update pending.`);
      setVersionUpdate("Playstore");
      checkVersionManually(version.version);
    }
  }


  return !load ? 
  <SafeAreaView style={styles.root}>
      <StatusBar backgroundColor="#111111" />
  </SafeAreaView>
  
  : (
    <SafeAreaView style={styles.root}>
      <StatusBar backgroundColor="#111111" />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.mainContainer}>
          {/* <TouchableOpacity onPress={()=>
                navigation.navigate("BothTeamOpponentSelection")
                // navigation.navigate("PlayerSelection",{screen : 'RunningMatch'})
                }>
                  <Text style={[styles.teamnm, styles.mtchab, { color: secondary }]}>Dummy UI</Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity onPress={()=>
                navigation.navigate("Wallet",{screen : 'PhonePe'})
                }>
                  <Text style={[styles.teamnm, styles.mtchab, { color: secondary }]}>Dummy UI</Text>
            </TouchableOpacity> */}

          <ImageSlider navigation={navigation} bannerData = {bannerData}/>
          <MatchesList
            title="Upcoming Matches"
            showMore={true}
            data={runningMatches}
            extraData={upcomingMatches}
            onPressMatch={selectMatch}
          />
          { manualVersion ? 
              <AppVersionUpdate 
                onClose={()=>setManualVersion(false)}
              /> : "" }

        {
          bonusPopup ? <BonusPopup onClose={()=>{
            AsyncStorage.setItem("Bonus-status", "false");
            setBonusPopup(false);
          } 
          } 
            onYes={()=>{
              AsyncStorage.setItem("Bonus-status", "false");
              setBonusPopup(false);
            }} /> : ""
        }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default WithProgress(CricketLeague)