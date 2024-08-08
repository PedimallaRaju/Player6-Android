import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message'
import { React, Component } from "react";
import { Alert, PermissionsAndroid, Text, View } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import Services from '../../Services/Services';
import moment from "moment";
import "moment-duration-format";
import { Adjust, AdjustEvent, AdjustConfig } from 'react-native-adjust';
import analytics from '@react-native-firebase/analytics'
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';


export class Functions extends Component{


    static myInstance = null;

    static getInstance() {  
        return new Functions();
    }



//////////////////////// Check Internet Connectivity //////////////////////////////////
  async checkInternetConnectivity() {
    try {
        const state = await NetInfo.fetch();
        if(state.isConnected == false){
            Toast.show({
                type: 'error',
                text1: 'No Internet Connection',
                visibilityTime: 1500,
                position : 'bottom'
              });
        }
        return state.isConnected; 
    } catch (error) {
        console.error(error);
        return error;
    }
}







/////////////////////////// Convert UTC date,time to Local date,time format //////////////////////////////////////////////////////////




displayMatchDateTime = function(data1){
    if(data1){
      //- data1 = new Date(data1.replace(/[-]/g,'/'));
      data1 = new Date(data1);
      let data2 = new Date(Date.UTC(data1.getFullYear(), data1.getMonth(), data1.getDate(), data1.getHours(), data1.getMinutes(), data1.getSeconds()));  
      const currentTime = new Date();
      let returnTime = '';
      if(data2.getTime() > currentTime.getTime()){
          tmpdate = (data2.getTime() - currentTime.getTime()) / 1000;
          if(tmpdate < 60){
            returnTime = '0' + parseInt(tmpdate) + 'Sec';
          }else if(tmpdate < 3600){
            let min = parseInt(tmpdate/60);
            let sec = tmpdate - (min * 60);
            let timem = data2.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            returnTime = min+'m  | '+ this.returnMonth(data2.getMonth()) + " " + data2.getDate()+' | '+timem;
          }else if (tmpdate < 86400){
            let hours = parseInt(tmpdate/3600);
            let totmin = parseInt(tmpdate/60);
            let min = totmin - (hours * 60);
            let sec = tmpdate - (totmin * 60);
            sec = parseInt(sec);
            let timem = data2.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            returnTime = hours+'h '+min+'m | '+ this.returnMonth(data2.getMonth()) + " " + data2.getDate()+' | '+timem;

          
          }else if (tmpdate < 31536000){
            let days = parseInt(tmpdate/86400);
            let hours = Math.abs((days*24) - (parseInt(tmpdate/3600)));
            let totmin = parseInt(tmpdate/60);
            let min = parseInt(totmin - (((days *24) + hours) * 60));
            let sec = tmpdate - (totmin * 60);
            sec = parseInt(sec);
            let timem = data2.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            returnTime = days+'d '+ hours+'h '+min+'m | '+ this.returnMonth(data2.getMonth()) + " " + data2.getDate()+' | '+timem;
          }
        }
        else{
          let timem = data2.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
          returnTime = this.returnMonth(data2.getMonth()) + " " + data2.getDate()+' | '+timem;
        }
        return returnTime;

    }
  }





  HistoryMatchDateTime = function(data1){
    if(data1){
        //- data1 = new Date(data1.replace(/[-]/g,'/'));
        data1 = new Date(data1);
        let data2 = new Date(Date.UTC(data1.getFullYear(), data1.getMonth(), data1.getDate(), data1.getHours(), data1.getMinutes(), data1.getSeconds()));  
        const currentTime = new Date();
        let returnTime = '';
        let timem = data2.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        returnTime = this.returnMonth(data2.getMonth()) + " " + data2.getDate()+' | '+timem;
        return returnTime;

    }
  }





  returnMonth(month){
    let m = month + 1;
    if(m == 1){
      return "Jan"
    }
    else if(m == 2){
      return "Feb"
    }
    else if(m == 3){
      return "March"
    }
    else if(m == 4){
      return "April"
    }
    else if(m == 5){
      return "May"
    }
    else if(m == 6){
      return "June"
    }
    else if(m == 7){
      return "July"
    }
    else if(m == 8){
      return "Aug"
    }
    else if(m == 9){
      return "Sep"
    }
    else if(m == 10){
      return "Oct"
    }
    else if(m == 11){
      return "Nov"
    }
    else{
      return "Dec"
    }
  }
    




 getTimer(newDate) {
  try {
    const currentTimeUTC = new Date();
    const targetTimeUTC = new Date(newDate);
    const timeDifference = (targetTimeUTC - currentTimeUTC) + (((5 * 60)+30) * 60 * 1000);
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    let showTimer = "";
    if (hours === 0) {
      showTimer = `0H : ${minutes}M`;
    } else {
      showTimer = `${hours}H:${minutes}M`;
      // showTimer = `${hours}H:${minutes}M:${seconds}S`;
    }
    if (hours < 0) {
      return "00:00";
    } else {
      return showTimer;
    }
  } catch (error) {
    console.log(error);
  }
}



getHours = function(data1){
  if(data1){
    //- data1 = new Date(data1.replace(/[-]/g,'/'));
    data1 = new Date(data1);
    let data2 = new Date(Date.UTC(data1.getFullYear(), data1.getMonth(), data1.getDate(), data1.getHours(), data1.getMinutes(), data1.getSeconds()));  
    const currentTime = new Date();
    if(data2.getTime() > currentTime.getTime()){
        tmpdate = (data2.getTime() - currentTime.getTime()) / 1000;
       if(tmpdate < (12*3600)){
          return "Yes"
      }
      else{
        return "No"
      }
  }
  else{
    return "No";
  }
}
}




getMatchTimeonly = function(data1){
  if(data1){
    //- data1 = new Date(data1.replace(/[-]/g,'/'));
    data1 = new Date(data1);
    let data2 = new Date(Date.UTC(data1.getFullYear(), data1.getMonth(), data1.getDate(), data1.getHours(), data1.getMinutes(), data1.getSeconds()));  
    let timem = data2.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    return timem;
  }
}


getMatchDateonly = function(data1){
  if(data1){
    //- data1 = new Date(data1.replace(/[-]/g,'/'));
    data1 = new Date(data1);
    let data2 = new Date(Date.UTC(data1.getFullYear(), data1.getMonth(), data1.getDate(), data1.getHours(), data1.getMinutes(), data1.getSeconds()));
    let x =   this.returnMonth(data2.getMonth()) + " " + data2.getDate()
    return x;
  }
}




findTimeDifference = function(data1, endDate){
  if(data1 && endDate){
    //- data1 = new Date(data1.replace(/[-]/g,'/'));
    data1 = new Date(data1);
    let data2 = new Date(endDate);
    let returnTime = '';
      if(data2.getTime() > data1.getTime()){
        returnTime = (data2.getTime() - data1.getTime()) / 1000;
      }
      else{
        returnTime = (data1.getTime() - data2.getTime()) / 1000;
      }
      
      return returnTime;

  }
}


contestClosedTimeDifference = function(data1, endDate){
  if(data1 && endDate){
    //- data1 = new Date(data1.replace(/[-]/g,'/'));
    data1 = new Date(data1);
    let data2 = new Date(endDate);
    let returnTime = '';
    returnTime = (data2.getTime() - data1.getTime()) / 1000;
      return returnTime;

  }
}











///////////////////////////////// Access and Refresh Tokens ///////////////////////////////////////////////////////////////




getTimeStamp=async()=>{
  try{
    const currentTimestamp = new Date().getTime();
    const newTimestamp = currentTimestamp + 45 * 60 * 1000;
    AsyncStorage.setItem("Expiry", String(newTimestamp));
  }catch(error){
      console.log(error)
  }
}


checkExpiration=async(id,token,navigation)=>{
  try{
    const currentTimestamp = new Date().getTime();
    const maxExpiry = currentTimestamp + 9 * 60 * 1000;
    const minExpiry = await AsyncStorage.getItem("Expiry");
    if((currentTimestamp >= minExpiry)){
      console.log("line 305");
      Services.getInstance().regenerateToken(id,token).then((result)=>{
        console.log(result);
        console.log("line 308");
        if(result.status == 200){
          const obj = {
            refToken : token,
            accesToken : result.accesToken,
            userId : id,
          }
          AsyncStorage.mergeItem("player6-userdata", JSON.stringify(obj));
          const currentTimestamp = new Date().getTime();
          const newTimestamp = currentTimestamp + 45 * 60 * 1000;
          AsyncStorage.setItem("Expiry", String(newTimestamp));
          console.log("line 315");
          return "home"
        }
        else{
          AsyncStorage.clear();
          navigation.navigate("Login");
          return "login"
        }
      })
    }
    else{
      console.log("line 328");
      return "home"
    }
  }
  catch(error){
    AsyncStorage.clear();
    navigation.navigate("Login");
    return "login"
  }
}







////////////////////// Get Matches Data from local When Internet is Not Connected //////////////////////////////////////////////



  offlineRunningMatches=async()=>{
    try{
        const offlineRunningMatches = JSON.parse(await AsyncStorage.getItem("Running-Matches"));
        return offlineRunningMatches;
    }catch(error){
        console.log(error)
    }
  }



  offlineUpComingMatches=async()=>{
    try{
        const offlineUpComingMatches = JSON.parse(await AsyncStorage.getItem("Upcoming-Matches"));
        return offlineUpComingMatches;
    }catch(error){
        console.log(error)
    }
  }


  offlineHomeBanners=async()=>{
    try{
        const offlineHomeBanners = JSON.parse(await AsyncStorage.getItem("Home-Banners"));
        return offlineHomeBanners;
    }catch(error){
        console.log(error)
    }
  }


  offlineMyGamesList=async()=>{
    try{
        const offlineMyGamesList = JSON.parse(await AsyncStorage.getItem("My-GamesList"));
        return offlineMyGamesList;
    }catch(error){
        console.log(error)
    }
  }


  offlineDraftPlayers=async()=>{
    try{
        const offlineDraftPlayers = JSON.parse(await AsyncStorage.getItem("Draft-Players"));
        return offlineDraftPlayers;
    }catch(error){
        console.log(error)
    }
  }



  offlineSelectedDraftPlayers=async()=>{
    try{
        const offlineSelectedDraftPlayers = JSON.parse(await AsyncStorage.getItem("Selected-Draft-Players"));
        return offlineSelectedDraftPlayers;
    }catch(error){
        console.log(error)
    }
  }


  offlineHistory=async()=>{
    try{
        const offlineHistory = JSON.parse(await AsyncStorage.getItem("History"));
        return offlineHistory;
    }catch(error){
        console.log(error)
    }
  }





/////////////////////////////////// Permission Details /////////////////////////////////////////////////

requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      console.log("Location status : " + granted)
      if (granted === 'granted') {
        return true;
      } 
      else {
        return false;
      }
    } 
    catch (err) {
      return false;
    }
  };



  requestSMSPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
      );
      console.log("SMS status : " + granted)
      if (granted === 'granted') {
        return true;
      } 
      else {
        return false;
      }
    } 
    catch (err) {
      return false;
    }
  };



  requestNotificationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      console.log("Notification status: " + granted);  
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error("Error requesting notification permission:", err);
      return false;
    }
  };



/////////////////////////////////// Bottom Popup /////////////////////////////////////////////////

Toast = async (status,message) => {
  try {
    const data = Toast.show({
      type: status,
      text1: message,
      visibilityTime: 3000,
      position : 'bottom'
    });
    return data;
  } 
  catch (err) {
    return false;
  }
};


ForgroundNotificationsToast = async (status,message) => {
  try {
    const data = Toast.show({
      type: status,
      text1: message,
      visibilityTime: 3000,
      position : 'top'
    });
    return data;
  } 
  catch (err) {
    return false;
  }
};





profilePic=async()=>{
  try{
      const profilePicURI = JSON.parse(await AsyncStorage.getItem("player6-profile"));
      // console.log("profilePicURI",profilePicURI)
      return profilePicURI;
  }catch(error){
      console.log(error)
  }
}


///////////////////////////////////////////////////////////////////// ADJUST SDK For Analytics ////////////////////////////////////////////////


fireAdjustEvent = async(eventToken)=>{
  const userInfo = JSON.parse(await AsyncStorage.getItem("player6-userdata"));
  const userPf = JSON.parse(await AsyncStorage.getItem("player6-profile"));
  const adjustConfig = new AdjustConfig("r3v0oia4jda8", AdjustConfig.EnvironmentSandbox);
  adjustConfig.setLogLevel(AdjustConfig.LogLevelVerbose);
  var adjustEvent = new AdjustEvent(eventToken);
  adjustEvent.addCallbackParameter({
    "userId" : userInfo.userId,
    "email" : userPf.email,
    "Phone" : userPf.number
  });
  Adjust.trackEvent(adjustEvent);
  adjustEvent.addSessionCallbackParameter({
    "userId" : userInfo.userId,
    "email" : userPf.email,
    "Phone" : userPf.number
  });
  Adjust.create(adjustConfig);
}


///////////////////////////////////////////////////////////////////// Firebase SDK For Analytics ////////////////////////////////////////////////

fireFirebaseEvent = async(eventName)=>{
  await analytics().logEvent(eventName,{
    id : "123"
  })
}


render() 
    
{
return (
<View>
<Text>Hello</Text>
</View>
)

}
}

export default Functions