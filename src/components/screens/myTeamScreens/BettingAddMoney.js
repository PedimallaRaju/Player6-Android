import React, {useEffect, useState} from 'react';
import {AppState, BackHandler, FlatList, Image, View} from 'react-native';
import {Text} from '@rneui/base';
import {secondary} from '../../../style';
import WithProgress from '../LoadingOverlay/WithProgress';
import CustomButton from '../customComponents/CustomButton';
import { styles } from './BettingAddMoney.styles';
import Functions from '../Functions';
import AsyncStorage from '@react-native-community/async-storage';
import Services from '../../../Services/Services';
import UserStore from '../../stores/UserStore';
import { useRoute } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import RestrictedLocation from '../customComponents/RestrictedLocation';
import { inject, observer } from 'mobx-react';
import { MyGameEmpty, TBC } from '../../../assets';
import ReactMoE,{
  MoEProperties,
} from "react-native-moengage";   



const MatchType = {
  "1": "1",
  "2": "5",
  "3": "10",
  "4": "20",
};



const TeamView = ({team, image}) => {
  return (
    <View style={styles.teamContainer}>
      <View style={styles.plyrprfl}>
      {(image == "") || (image == "https://cdn.sportmonks.com") ? 
          <Image style={[styles.image, styles.mnimg,{marginTop : 5}]} source={TBC}/>
              :
        <Image
          style={styles.image}
          source={{
            uri: `https://cdn.sportmonks.com/images/cricket/teams/${image}`,
          }}
        />
}
      </View>
      <Text style={styles.teamName}>{team}</Text>
    </View>
  );
};









let userInfo, cont1 = 0, cont5 = 0, cont10 = 0, cont20 = 0;
const BettingAddMoney = ({navigation,showProgress,hideProgress}) => {

  const[myGamesList, setMyGamesList] = useState([]);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [restricted, setRestricted] = useState(false);
  const route = useRoute();




  useEffect(() => {
    const unsubscribe = navigation?.addListener('focus', () => {
      navigation.reset({index:0,routes:[{name:'CricketLeague'}]})
      AsyncStorage.setItem('Opn', "null");
      AsyncStorage.setItem("toss", "null");
      AsyncStorage.setItem("players", "null");
      AsyncStorage.setItem("p6data", "null");
      AsyncStorage.setItem("pl6-socket", 'null');
      const obj = {}
      UserStore.selectedMatch = {};
      UserStore.setselectedContest(obj);
      UserStore.setopponentSocketData(obj);
      UserStore.setselectedGameData(obj); 
      UserStore.setselectedTeamDetails(obj);
      getMyContests();
    });
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('CricketLeague');
      return true;
    })
    // const handleAppStateChange = (nextAppState) => {
    //   if (nextAppState === 'active') {
    //     getMyContests();
    //   }
    // };
    // AppState.addEventListener('change', handleAppStateChange);
    return ()=>{
      console.log("Unmount is executed");
      unsubscribe();
      backHandler.remove();
      // AppState.removeEventListener('change', handleAppStateChange);
    };
  }, [navigation]);












  const getMyContests = async () => {
    showProgress();
    userInfo = JSON.parse(await AsyncStorage.getItem("player6-userdata"));
    console.log(userInfo)
    Functions.getInstance().checkExpiration(userInfo.userId, userInfo.refToken, navigation);
    Functions.getInstance().checkInternetConnectivity().then((state)=>{
      if(state == true){
        Services.getInstance().getMyGamesList(userInfo.userId, userInfo.accesToken).then((result)=>{
          // console.log(result);
          if(result.status == 200){
            setMyGamesList(result.data);
            AsyncStorage.setItem("My-GamesList", JSON.stringify(result.data));
            hideProgress();
            fireEventToMoEngage(result.data);
            // Functions.getInstance().offlineMyGamesList().then(result=>{
            //   setMyGamesList(JSON.stringify(result.data));
            // })
          }
          else{
            hideProgress();
            Functions.getInstance().Toast("error","Please try again later");
          }
        })
      }
      else{
        Functions.getInstance().offlineMyGamesList().then(result=>{
          setMyGamesList(result);
          hideProgress();
        })
      }
    })
    
  };




  const fireEventToMoEngage = (data) =>{
    ReactMoE.setUserAttribute("Contest",data.length);
    ReactMoE.setUserAttribute("Draft", data.length);
    data.forEach(element => {
      if(MatchType[element.contestId] == "1"){
        cont1 = cont1 + 1;
      }
      if(MatchType[element.contestId] == "5"){
        cont5 = cont5 + 1;
      }
      if(MatchType[element.contestId] == "10"){
        cont10 = cont10 + 1;
      }
      if(MatchType[element.contestId] == "20"){
        cont20 = cont20 + 1;
      }
    });
    ReactMoE.setUserAttribute("1rs Contests", cont1);
    ReactMoE.setUserAttribute("5rs Contests", cont5);
    ReactMoE.setUserAttribute("10rs Contests", cont10);
    ReactMoE.setUserAttribute("20rs Contests", cont20);
  }




  const screenRedirection = (data) => {
    showProgress();
    Functions.getInstance().fireAdjustEvent("rzz1nb");
    Functions.getInstance().fireFirebaseEvent("GameRoomOpenContestButton");
    let properties = new MoEProperties();
    properties.addAttribute("Gameroom's Contest tier blue button", true);
    ReactMoE.trackEvent("My Games", properties);
    UserStore.setopponentSocketData(data);
      const obj = {
        team1Logo: data.contOneImg,
        team1Name: data.contOneSnam,
        team2Logo: data.contTwoImg,
        team2Name: data.contTwoSnam,
        title: data.banTitle,
        matchId : data.matchId,
        matchType : data.matchType, 
        contestId : data.contestId,
        tosTime: data.tosTime,
        userOne: data.userOne,
        userOneTeam: data.userOneTeam,
        userTwo: data.userTwo,
        userTwoTeam: data.userTwoTeam,
        gameId : data.gameId,
        contTwoSnam : data.contTwoSnam,
        contTwoImg : data.contTwoImg,
        contTwo : data.contTwo,
        contOneSnam : data.contOneSnam,
        contOneImg : data.contOneImg,
        contOne : data.contOne
      }
      const x = Object.assign({},data,obj)
      UserStore.setselectedMatch(x);
      UserStore.setselectedGameData(data);
      UserStore.setselectedContest(data);
      AsyncStorage.setItem("selected-game-match", JSON.stringify(x));
      AsyncStorage.setItem("selected-game-contest", JSON.stringify(data));
      hideProgress();
      const clickT = getCurrentTime();
      const diffTime = Functions.getInstance().contestClosedTimeDifference(data.player11ST,data.startTime);
      const diffTimeBwclick = Functions.getInstance().contestClosedTimeDifference(clickT,data.startTime);
console.log(diffTimeBwclick)

// navigation.navigate("PlayersInteraction",{destination : "BothTeamOpponentSelection"});
      
      if(((clickT < data.startTime) && ((diffTimeBwclick < (10*60) && (diffTime < (10*60))) || (diffTimeBwclick < (10*60) && (data.player11ST == "")) || ((diffTimeBwclick < (10*60)) && (data.player11ST == "0000-00-00 00:00:00"))))){
        Functions.getInstance().Toast("success", "Players11 in queue,await for scoreboard");
      }
      else{
          if(data.status == "1"){
              Services.getInstance().previousContests(userInfo.userId, data.matchId, userInfo.accesToken).then((result)=>{
                console.log(result)
                if(result.status == 200){
                  AsyncStorage.setItem("prev-contests", JSON.stringify(result.msg));
                  navigation.navigate('PlayersInteraction',{destination : "FindOpponent"});
                }
                else{
                  Functions.getInstance().Toast("error", "Please try again later");
                }
              })
          }
          else if(data.status == "2" && data.userOne == userInfo.userId){
            let properties = new MoEProperties();
            properties.addAttribute("Toss chooser screen", true);
            ReactMoE.trackEvent("My Games", properties);
            navigation.navigate('PlayersInteraction',{destination : "PickTeamForToss"});
          }
          else if(data.status == "2" && data.userTwo == userInfo.userId){
            let properties = new MoEProperties();
            properties.addAttribute("Toss chooser screen(Opponent)", true);
            ReactMoE.trackEvent("My Games", properties);
            navigation.navigate('PlayersInteraction',{destination : "OpponentChooseToss"});
          }
          else if(data.status == "3" && data.userOne == userInfo.userId){
            let properties = new MoEProperties();
            properties.addAttribute("Toss chooser screen", true);
            ReactMoE.trackEvent("My Games", properties);
            navigation.navigate('PlayersInteraction',{destination : "PickTeamForToss"});
          }
          else if(data.status == "3" && data.userTwo == userInfo.userId){
            let properties = new MoEProperties();
            properties.addAttribute("Toss chooser screen(Opponent)", true);
            ReactMoE.trackEvent("My Games", properties);
            navigation.navigate('PlayersInteraction',{destination : "OpponentChooseToss"});
          }
          else if(data.status == "4" && (data.userTwo == "" || data.userTwo == "0")){
            Functions.getInstance().Toast("error", "Oops!, you haven't paired with anyone, your amount will be refunded back to you in wallet.");
          }
          else if(data.status == "4" && (data.tossWinner == "" || data.tossWinner == "0") && data.userOne == userInfo.userId){
            navigation.navigate("PlayersInteraction",{destination : "TossLoss"});              
          }
          else if(data.status == "4" && (data.tossWinner == "" || data.tossWinner == "0") && data.userOne != userInfo.userId){
            navigation.navigate("PlayersInteraction",{destination : "TossWon"});              
          }
          else if(data.status == "4" && data.tossWinner == userInfo.userId && data.finalPlayers == "0"){
            navigation.navigate("PlayersInteraction",{destination : "TossWon"});
          }
          else if(data.status == "4" && data.tossWinner != userInfo.userId && data.finalPlayers == "0"){
            navigation.navigate("PlayersInteraction",{destination : "TossLoss"});
          }
          else if(data.status == "4" && data.finalPlayers == "1" && data.userTwo != "0"){
            const myTimeWhenTouched = getCurrentTime();
            if((data.isCapSel == "0") && (myTimeWhenTouched < data.startTime)){
              verifyLocation(data.isCapSel , data.startTime);
            }
            else{
              navigation.navigate("PlayersInteraction",{destination : "RunningMatch"});
            }
          }
          else if(data.status == "5"){
            Functions.getInstance().Toast("success", "Match has been completed...");
          }
          else{
            Functions.getInstance().Toast("error","please try again after some time");
          }
          

      }
  };





  



  const verifyLocation = async(isCapSel, startTime) =>{
    const result = Functions.getInstance().requestLocationPermission();
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
              pricesPage2(latitude,longitude,isCapSel, startTime);
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
          pricesPage2(latitude,longitude,isCapSel,startTime);
        }
      }
    });
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



  const pricesPage2 = (L1,L2,isCapSel,startTime) =>{
      showProgress();
      const myTime = getCurrentTime();
      if(myTime > startTime){
        console.log("greater", myTime > startTime);
      }
      console.log("isCapsel", isCapSel);
      const obj = {
        lat: L1,
        lng: L2,
        page: "player selection"
      }
      console.log(obj);
      Services.getInstance().verifyLocation(userInfo.userId, userInfo.accesToken,obj).then((result)=>{
        console.log(result);
        if(result.status == 200 && result.locVerify == true){
          hideProgress();
          if((isCapSel == "0") && (myTime < startTime)){
            navigation.navigate("PlayersInteraction",{destination : "BothTeamOpponentSelection"});
          }
          else{
            navigation.navigate("PlayersInteraction",{destination : "RunningMatch"});
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






  const AllTeamView = (item) => {
      return (
        <View style={styles.container}>
          <View style={styles.leftContainer}>
          <Text style={[styles.heading,{marginRight:2,marginLeft:2}]}>{item.item.banTitle}</Text>
            <Text style={styles.subHeading}>
            {Functions.getInstance().displayMatchDateTime(item.item.startTime)}
            </Text>
            <View style={styles.row}>
              <TeamView team={item.item.contOneSnam} image={item.item.contOneImg} />
              <Text style={styles.vsText}>VS</Text>
              <TeamView team={item.item.contTwoSnam} image={item.item.contTwoImg} />
            </View>
          </View>

          <View style={styles.rightContainer}>
            <View style={styles.buttonContainer}>
              <CustomButton
                colour={secondary}
                onPress={() => {
                  screenRedirection(item.item);
                }}
                btnLabel={`₹${MatchType[item.item.contestId]}`}
                width={130}
              />
            </View>
          </View>
        </View>
      );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.subContainer}>
        <View style={styles.row}>
          <View style={styles.flex}>
            <Text style={styles.mainHeading}>Match</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.mainHeading}>Contest</Text>
          </View>
        </View>
        <View style={styles.listContainer}>

        {myGamesList && myGamesList.length > 0 ? 
          <FlatList
            data={myGamesList}
            renderItem={AllTeamView}
            extraData={myGamesList}
            keyExtractor={(item,index) => index}
          />
          :
          <View style={{marginTop:'50%'}}>
            <Image source={MyGameEmpty} style={{width : '100%',resizeMode:"contain",height:120,alignSelf:'center'}}/>
            <Text style={{color : 'white', fontSize : 16,textAlign:'center',marginTop:20,fontFamily: 'Poppins-SemiBold'}}>No Active Game Rooms</Text>
          </View>
        }
        </View>
      </View>
      {restricted ? 
      <RestrictedLocation
        onClose={() => setRestricted(false)} 
      />
      : "" }
    </View>
  );
};

export default WithProgress(inject('UserStore')(observer(BettingAddMoney)));
