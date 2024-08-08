import React, {useEffect, useState} from 'react';
import {Alert, AppState, Image, Pressable, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import BlinkView from 'react-native-smooth-blink-view';
import { styles } from './crickLeagueStyles/CricketLeague.style';
import Functions from '../Functions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import ImageSlider from './common/ImageSlider';
import UserStore from '../../stores/UserStore';
import Services from '../../../Services/Services';
import AsyncStorage from '@react-native-community/async-storage';
import EventSource from 'react-native-event-source';
import MatchBanner from './MatchBanner';
import { inject, observer } from 'mobx-react';
import WithProgress from '../LoadingOverlay/WithProgress';
import { useNavigation } from '@react-navigation/native';



let userInfo,gameDetails={},teamDetails={},selectedUserMatch={},selectedUserContest={};
const PTFT = ({}) => {
  const [currentTime, setCurrentTime] = useState();
  const [teamSelected, setteamSelected] = useState(false);
  const [timerRef, setTimerRef] = useState();
  const [opEvent, setopEvent] = useState(false);
  const navigation = useNavigation();
  let newSocket;


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      gameDetails = UserStore.selectedGameData;
      teamDetails = UserStore.selectedTeamDetails;
      selectedUserMatch = UserStore.selectedMatch;
      selectedUserContest = UserStore.selectedContest;
      getData();
      callSocket();
      setCurrentTime(Functions.getInstance().getTimer(gameDetails?.startTime));
    });
    // const handleAppStateChange = (nextAppState) => {
    //   if (nextAppState === 'active') {
    //     getData();
    //     callSocket();
    //   }
    // };
    // AppState.addEventListener('change', handleAppStateChange);
    return () =>{
      newSocket.removeAllListeners();
      newSocket.close();
      unsubscribe();
      // AppState.removeEventListener('change', handleAppStateChange);
    }
  }, ([navigation]));


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Functions.getInstance().getTimer(gameDetails?.startTime));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, ([gameDetails, teamDetails]));


  useEffect(() => {
    if (currentTime == '00:00') {
      clearInterval(timerRef);
      setTimerRef(null);
    }
  }, ([]));






  const callSocket = async() =>{
    userInfo = JSON.parse(await AsyncStorage.getItem("player6-userdata"));
     newSocket = new EventSource(`https://www.xhtmlreviews.com/api-player6/1.0/auth/User/${userInfo.userId}/watchEvents`);
    // newSocket = new EventSource(`https://apidemo.player6sports.com/1.0/auth/User/${userInfo.userId}/watchEvents`);
    // newSocket = new EventSource(`https://apiqa.player6sports.com/1.0/auth/User/${userInfo.userId}/watchEvents`);
    // newSocket = new EventSource(`https://api.player6sports.com/1.0/auth/User/${userInfo.userId}/watchEvents`);

    
    if(opEvent == false){
        newSocket.addEventListener("tossDec", (event) => {
            setopEvent(true);
            const toss =  JSON.parse(event.data);
            UserStore.setTossDeclared(JSON.parse(event.data));
            if((gameDetails.matchId == toss.matchId)&&(toss.teamaId == toss.winTeamId)){
              navigation.navigate('TossWon');
            }
            else if((gameDetails.matchId == toss.matchId) && (toss.teamaId != toss.winTeamId)){
              navigation.navigate('TossLoss');
            }
        });
    }

    newSocket.addEventListener("teamSel", (event) => {
      setteamSelected(true);
    });

    return () => {
      newSocket.removeAllListeners();
      newSocket.close();
    };
  }



  const getData= async() =>{
    userInfo = JSON.parse(await AsyncStorage.getItem("player6-userdata"));
    if(teamDetails?.userOneTeam !== '0'){
      if(teamDetails?.userOneTeam == teamDetails?.contOne){
        const obj = {
          contOne : teamDetails?.userOneTeam,
          contOneSnam : teamDetails?.contOneSnam,
          contOneImg : teamDetails?.contOneImg,
          isSelected : true
        }
        UserStore.setselectedTeamDetails(obj);
        setteamSelected(true);
      }
      else{
        const obj = {
          contOne : teamDetails?.userTwoTeam,
          contOneSnam : teamDetails?.contTwoSnam,
          contOneImg : teamDetails?.contTwoImg,
          isSelected : true
        }
        UserStore.setselectedTeamDetails(obj);
        setteamSelected(true);
      }

    }
    else{
        setteamSelected(false);
    }
    Functions.getInstance().checkExpiration(userInfo.userId, userInfo.refToken, navigation);
    Functions.getInstance().checkInternetConnectivity();
  }







  onPressTeam = (id, name, image) =>{
    const obj = {
      contOne : id,
      contOneSnam : name,
      contOneImg : image,
      isSelected : true
    }
    UserStore.setselectedTeamDetails(obj);
    console.log(UserStore.getselectedTeamDetails());
    const payload = {
      userId: userInfo.userId,
      gameId: gameDetails.gameId,
      team: id
    }
    console.log(payload)
    Services.getInstance().selectTeam(payload, userInfo.userId, gameDetails.gameId, userInfo.accesToken).then((result)=>{
      setteamSelected(true);
      // if(result.status == 200){
      //   setteamSelected(true);
      // }
      // else{
      //   Functions.getInstance().Toast("error", "Unable to select the team")
      // }
      
    })
  }









  const renderContestContent = (image, name, id, disabled) => {
    return (
      <TouchableOpacity
        disabled={disabled}
        onPress={() => onPressTeam(id, name, image)}
        style={styles.team}>
        
          <BlinkView
            delayVisible={300}
            delayInvisible={0}
            duration={500}
            blinking={true}>
            <View
              style={[
                styles.teamView,
                styles.pickTeamView,
                styles.blnk,
              ]}></View>
          </BlinkView>

          
        <View style={[styles.teamView, styles.pickTeamView]}>
          <Image
            style={styles.teamImage}
            source={{
              // uri: `https://www.cricbuzz.com/a/img/v1/40x40/i1/c${image}/player_face.jpg`,
              uri: `https://cdn.sportmonks.com/images/cricket/teams/${image}`,
              
            }}
          />
        </View>
        <Text style={[styles.teamName, styles.teamText, styles.tctblnlk]}>
          {name}
        </Text>
        {disabled && (
          <View style={styles.matchTime}>
            <View style={[styles.pickTimer, styles.onpg]}>
              <Text style={[styles.teamName, styles.teamTimerText]}>
                {currentTime}
              </Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };









  return (


    <SafeAreaView style={styles.root}>
      <StatusBar backgroundColor="#111111" />
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.mainContainer}>
      <MatchBanner selectedUserMatch = {selectedUserMatch}/>

        <View style={[styles.teamcontest, styles.opmn,{marginBottom : 30}]}>
      <View style={[styles.contestMain, styles.pickTeam]}>
        <Text style={[styles.mainText, styles.selectedText, styles.pickText]}>
          {teamSelected ? 'Your Team For The Toss Is' : 'Pick Your Team To Win The Toss'}
        </Text>

        {teamSelected ? 
          (
            <View style={[styles.matchCard, styles.pickMatch]}>
              <Pressable style={styles.team}>
                  <View style={[styles.teamView, styles.pickTeamView]}>
                    <Image
                      style={styles.teamImage}
                      source={{
                        // uri: `https://www.cricbuzz.com/a/img/v1/40x40/i1/c${teamDetails.contOneImg}/player_face.jpg`,
                        uri: `https://cdn.sportmonks.com/images/cricket/teams/${teamDetails.contOneImg}`,
                      }}
                    />
                  </View>
                  <Text style={[styles.teamName, styles.teamText, styles.tctblnlk]}>
                    {teamDetails.contOneSnam}
                  </Text>
                 
                  
                    <View style={styles.matchTime}>
                      <View style={[styles.pickTimer, styles.onpg]}>
                        <Text style={[styles.teamName, styles.teamTimerText]}>
                          {currentTime}
                        </Text>
                      </View>
                    </View>
              </Pressable>
            </View>
          ) 
          : 
          (
          <View style={[styles.matchCard, styles.pickMatch]}>
            {renderContestContent(
              gameDetails?.contOneImg,
              gameDetails?.contOneSnam,
              gameDetails?.contOne,
              false,
            )}
            <View style={styles.matchTime}>
              <View style={styles.pickTimer}>
                <Text style={[styles.teamName, styles.teamTimerText]}>
                  {currentTime}
                </Text>
              </View>
            </View>
            {renderContestContent(
              gameDetails?.contTwoImg,
              gameDetails?.contTwoSnam,
              gameDetails?.contTwo,
              false,
            )}
          </View>
        )}

        <Text style={[styles.teamName, styles.winnerText]}>
          Winner of toss gets 1st pick in player selection
        </Text>
        {currentTime == '00:00' && (
          <Text style={[styles.teamName, styles.winnerText]}>
            toss will be announced shortly.
          </Text>
        )}

        <Pressable onPress={() => navigation.navigate('DraftRoute')}>
          <View
            style={[styles.chooseContest, styles.waitingRoom, styles.openGame]}>
            <Text
              style={[styles.mainText, styles.playNow, styles.waitingRoomText]}>
              
                 Update Draft
                
            </Text>
          </View>
        </Pressable>
      </View>
    </View>


      </View>
    </ScrollView>
  </SafeAreaView>





  );
};

export default WithProgress(inject('UserStore')(observer(PTFT)));
