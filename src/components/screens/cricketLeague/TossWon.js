import { Image, StatusBar, TouchableOpacity } from 'react-native';
import { View, Text, ScrollView, Pressable} from 'react-native'
import React, { useEffect, useState } from 'react'
import ImageSlider from './common/ImageSlider'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Celebration, India } from '../../../assets';
import { styles } from './crickLeagueStyles/CricketLeague.style';
import UserStore from '../../stores/UserStore';
import MatchBanner from './MatchBanner';
import { inject, observer } from 'mobx-react';
import WithProgress from '../LoadingOverlay/WithProgress';
import Functions from '../Functions';
import AsyncStorage from '@react-native-community/async-storage';
import EventSource from 'react-native-event-source';



let finalToss={},gameDetails={},selectedUserMatch={},selectedUserContest={}, timeout, interval;
const TossWon = ({ onPress, waiting = true,detail, navigation }) => {
    const [opEvent, setopEvent] = useState(false);
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [win, setWin] = useState(false);
    let newSocket;

    useEffect(()=>{
      const unsubscribe = navigation.addListener('focus', () => {
        finalToss = UserStore.tossDeclared;
        gameDetails = UserStore.selectedGameData;
        selectedUserMatch = UserStore.selectedMatch;
        selectedUserContest = UserStore.selectedContest;
        AsyncStorage.setItem("players", "false");
        console.log("gameDetails After Toss Socket :::::::::::::::::::::::::::::::::", gameDetails);
        callSocket();
        setWin(true);
        if(finalToss){
            if(finalToss?.winTeamId == gameDetails?.contOne){
                setImage(gameDetails?.contOneImg);
                setName(gameDetails?.contOneSnam);
            }
            else{
                setImage(gameDetails?.contTwoImg);
                setImage(gameDetails?.contTwoSnam);
            }
        }
        
        Functions.getInstance().Toast("success", "Waiting for playing 11's");
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
        },1000);


        timeout = setTimeout(function(){
          const routes = navigation.getState()?.routes;
          if(routes[0].name == 'TossWon'){
            Functions.getInstance().Toast("success", "Player selection begins shortly");
          }
        },(2*60000));
      });

      return () => {
        if(timeout){
          clearTimeout(timeout);
        }
        if(interval){
          clearInterval(interval);
        }
        newSocket.removeAllListeners();
        newSocket.close();
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
          console.log("Final List Socket ::::: " );
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








    return !win ? null : (
            <SafeAreaView style={styles.root}>
            <StatusBar backgroundColor="#111111" />
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.mainContainer}>
            <MatchBanner selectedUserMatch = {selectedUserMatch}/>
                <View style={[styles.tosswoncontainer, styles.open]}>
                    <View style={[styles.cntstmain, styles.pktm]}>
                        <Text style={[styles.chstxt, styles.slctd]}>Your Team Won the Toss</Text>
                        <View style={styles.celb}>
                            <Image style={styles.celbimg} source={Celebration} />
                            <View style={[styles.teamvw, styles.pteam, styles.twintm]}>
                                {/* <Image style={[styles.tmimg, styles.twnimg]} source={{uri:`https://www.cricbuzz.com/a/img/v1/40x40/i1/c${image}/player_face.jpg`}} /> */}
                                <Image style={[styles.tmimg, styles.twnimg]} source={{uri:`https://cdn.sportmonks.com/images/cricket/teams/${image}`}} />
                            </View>
                        </View>
                        {waiting ? <TouchableOpacity onPress={() => {}}>
                            <Text style={[styles.teamnm, styles.wnrtxt]}>You will get first pick in player selection</Text>
                            <Text style={[styles.teamnm, styles.wnrtxt]}>Waiting for Playing 11's</Text>
                        </TouchableOpacity> : <TouchableOpacity onPress={() => onPress()}>
                            <View style={[styles.chscnst, styles.wrm, styles.opngm]}>
                                <Text style={[styles.chstxt, styles.plynw, styles.wrim]}>You will get first pick in player selection</Text>
                            </View>
                        </TouchableOpacity>}
                    </View>
                </View>






                
            </View>
            </ScrollView>
            </SafeAreaView>
    );
};

export default WithProgress(inject('UserStore')(observer(TossWon)));