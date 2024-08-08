import { Image, StatusBar, TouchableOpacity } from 'react-native';
import { View, Text, ScrollView, Pressable} from 'react-native'
import React, { useEffect, useState } from 'react'
import ImageSlider from './common/ImageSlider'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Dislike } from '../../../assets';
import { styles } from './crickLeagueStyles/CricketLeague.style';
import MatchBanner from './MatchBanner';
import { inject, observer } from 'mobx-react';
import WithProgress from '../LoadingOverlay/WithProgress';
import UserStore from '../../stores/UserStore';
import Functions from '../Functions';
import AsyncStorage from '@react-native-community/async-storage';
import EventSource from 'react-native-event-source';



let selectedUserMatch={},gameDetails={},selectedUserContest={}, timeout,interval;
const TossLoss = ({ onPress, waiting = true,detail, navigation }) => {
    const [opEvent, setopEvent] = useState(false);
    const [dis, setDis] = useState(false);
    let newSocket;

    useEffect(()=>{
      const unsubscribe = navigation.addListener('focus', () => {
        selectedUserMatch = UserStore.selectedMatch;
        gameDetails = UserStore.selectedGameData;
        selectedUserContest = UserStore.selectedContest;
        AsyncStorage.setItem("players", "false");
        callSocket();
        console.log("gameDetails After Toss Socket :::::::::::::::::::::::::::::::::", gameDetails);
        Functions.getInstance().Toast("success", "Waiting for playing 11's");
        setDis(true);
        interval = setInterval(() => {
          let myTime = getCurrentTime();
          const delay = Functions.getInstance().contestClosedTimeDifference(myTime,gameDetails?.startTime);
          if(delay <= (10*60)){
            if(timeout){
              clearTimeout(timeout);
            }
            if(interval){
              clearInterval(interval);
            }
            navigation.navigate("CricketLeague");
          }
        },1000)
        timeout = setTimeout(function(){
          const routes = navigation.getState()?.routes;
          if(routes[0].name == 'TossLoss'){
            Functions.getInstance().Toast("success", "Player selection begins shortly");
          }
        },(2*60000));

        console.log("selectedUserMatch", selectedUserMatch);
        
      });

      return () => {
        if(timeout){
          clearTimeout(timeout);
        }
        if(interval){
          clearInterval(interval);
        }
        if(newSocket){
          newSocket.removeAllListeners();
          newSocket.close();
        }
        unsubscribe();
    };

    },[]);




    const callSocket = async() =>{
        userInfo = JSON.parse(await AsyncStorage.getItem("player6-userdata"));
         newSocket = new EventSource(`https://www.xhtmlreviews.com/api-player6/1.0/auth/User/${userInfo.userId}/watchEvents`);
        // newSocket = new EventSource(`https://apidemo.player6sports.com/1.0/auth/User/${userInfo.userId}/watchEvents`);
        // newSocket = new EventSource(`https://apiqa.player6sports.com/1.0/auth/User/${userInfo.userId}/watchEvents`);
        // newSocket = new EventSource(`https://api.player6sports.com/1.0/auth/User/${userInfo.userId}/watchEvents`);


        newSocket.addEventListener("ping", (event) => {
          console.log("ping List Socket ::::: " );
        });



        if(opEvent == false){
          newSocket.addEventListener("matFinlList", (event) => {
            let ds = JSON.parse(event.data);
            console.log("Final List Socket ::::: " , ds);
            if(ds.matchId == gameDetails.matchId && ds.pairId == gameDetails.gameId){
              playersAnnouncement(event);
            }
          });
      }


      newSocket.addEventListener("contestClosed", (event) => {
        let ds = JSON.parse(event.data);
        if(ds.matchId == gameDetails.matchId){
          navigation.navigate("CricketLeague");
        }
      });
 
      return () => {
        console.log("helloo cancelled newSocket");
        newSocket.removeAllListeners();
        newSocket.close();
      };
      }


      const playersAnnouncement = async(event) =>{
        setopEvent(true);
        const stat = await AsyncStorage.getItem('players');
        const toss =  JSON.parse(event.data);
        if(gameDetails.matchId == toss.matchId && stat == "false" && toss.pairId == gameDetails.gameId){
          AsyncStorage.setItem("players", "true");
          navigation.navigate("PlayersInteraction",{destination : "BothTeamOpponentSelection"});
        }
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











    return !dis ? null :  (
            <SafeAreaView style={styles.root}>
                <StatusBar backgroundColor="#111111" />
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.mainContainer}>
            <MatchBanner selectedUserMatch = {selectedUserMatch}/>

                <View style={[styles.tosslosscontainer, styles.open]}>
                    <View style={[styles.contentContainer, styles.pickTeam]}>
                    <Text style={[styles.text, styles.selected]}>Your Team Loss the Toss</Text>
                    <View style={[styles.celebration, styles.dislike]}>
                        <Image style={styles.celebrationImage} source={Dislike} />
                    </View>
                    <Text style={[styles.teamName, styles.winnerText, styles.lossTossText]}>Your Opponent will get 1st pick</Text>
                    <Text style={[styles.teamName, styles.winnerText, styles.lossTossText]}>Waiting for Playing 11's</Text>
                    </View>
                </View>




                

                
            </View>
            </ScrollView>
            </SafeAreaView>
    );
};

export default WithProgress(inject('UserStore')(observer(TossLoss)));