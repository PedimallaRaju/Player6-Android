import { View, Text, ScrollView, Pressable, Image, StatusBar, AppState, } from 'react-native'
import React, { useEffect, useState } from 'react'
import ImageSlider from './common/ImageSlider'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './crickLeagueStyles/CricketLeague.style';
import Functions from '../Functions';
import UserStore from '../../stores/UserStore';
import AsyncStorage from '@react-native-community/async-storage';
import EventSource from 'react-native-event-source';
import MatchBanner from './MatchBanner';
import { inject, observer } from 'mobx-react';
import WithProgress from '../LoadingOverlay/WithProgress';
import { useNavigation } from '@react-navigation/native';


let gameDetails={},teamDetails={},selectedUserMatch={}, selectedUserContest={};
const OPCT = ({}) => {
  const [teamSelected, setteamSelected] = useState(false);
  const [currentTime, setCurrentTime] = useState();
  const [timerRef, setTimerRef] = useState();
  const [teamData,setTeamData] = useState({});
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
    setCurrentTime(Functions.getInstance().getTimer(gameDetails?.startTime))
  });
  return () => {
    unsubscribe();
    newSocket.removeAllListeners();
    newSocket.close();
  }
}, ([navigation]));




  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Functions.getInstance().getTimer(gameDetails?.startTime));
    }, 1000);
    setTimerRef(interval);
    // const handleAppStateChange = (nextAppState) => {
    //   if (nextAppState === 'active') {
    //     getData();
    //     callSocket();
    //   }
    // };
    // AppState.addEventListener('change', handleAppStateChange);
    return () => {
      clearInterval(timerRef);
      setTimerRef(null);
      // AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);



  useEffect(() => {
    if (currentTime == '00:00') {
      clearInterval(timerRef);
      setTimerRef(null);
    }
    return () => {};
  }, [currentTime]);




  const getData= async() =>{
    userInfo = JSON.parse(await AsyncStorage.getItem("player6-userdata"));
    Functions.getInstance().checkExpiration(userInfo.userId, userInfo.refToken, navigation);
    Functions.getInstance().checkInternetConnectivity();
        console.log("OPCT ::::",teamDetails);
      if(teamDetails?.userTwoTeam !== '0'){
      if(teamDetails?.userOne == userInfo.userId && teamDetails?.userOneTeam == teamDetails?.contOne){
        const obj = {
          userTwoTeam : teamDetails?.contOne
        }
        setTeamData(obj);
        setteamSelected(true);
      }

      if(teamDetails?.userOne == userInfo.userId && teamDetails?.userOneTeam == teamDetails?.contTwo){
        const obj = {
          userTwoTeam : teamDetails?.contTwo
        }
        setTeamData(obj);
        setteamSelected(true);
      }

      if(teamDetails?.userTwo == userInfo.userId && teamDetails?.userTwoTeam == teamDetails?.contOne){
        const obj = {
          userTwoTeam : teamDetails?.contOne
        }
        setTeamData(obj);
        setteamSelected(true);
      }
      if(teamDetails?.userTwo == userInfo.userId && teamDetails?.userTwoTeam == teamDetails?.contTwo){
        const obj = {
          userTwoTeam : teamDetails?.contTwo
        }
        setTeamData(obj);
        setteamSelected(true);
      }
    }
  }




 const callSocket = async() =>{
    userInfo = JSON.parse(await AsyncStorage.getItem("player6-userdata"));
    newSocket = new EventSource(`https://www.xhtmlreviews.com/api-player6/1.0/auth/User/${userInfo.userId}/watchEvents`);
    // newSocket = new EventSource(`https://apidemo.player6sports.com/1.0/auth/User/${userInfo.userId}/watchEvents`);
    // newSocket = new EventSource(`https://apiqa.player6sports.com/1.0/auth/User/${userInfo.userId}/watchEvents`);
    // newSocket = new EventSource(`https://api.player6sports.com/1.0/auth/User/${userInfo.userId}/watchEvents`);

    // newSocket.addEventListener('ping', (event) => {
    //   console.log('Received data from socket in SomeChildComponent:', event);
    //   console.log(JSON.parse(event.data));
    // });

    if(opEvent == false){
      newSocket.addEventListener("tossDec", (event) => {
          setopEvent(true);
            const toss =  JSON.parse(event.data);
            console.log(toss)
            if(toss.teambId == toss.winTeamId){
              navigation.navigate('TossWon');
            }
            else{
              navigation.navigate('TossLoss');
            }
      });
  }

    newSocket.addEventListener("teamSel", (event) => {
        console.log(JSON.parse(event.data));
        let ds = JSON.parse(event.data);
        if(ds.matchId == gameDetails.matchId && ds.gameId == gameDetails.gameId){
          console.log(JSON.parse(event.data));
          setTeamData(JSON.parse(event.data));
          teamDetails = JSON.parse(event.data);
          setteamSelected(true);
        }
        else{
            console.log("Out");
            console.log("ds.matchId",ds.matchId)
            console.log("gameDetails.matchId",gameDetails.matchId)
            console.log("ds.gameId",ds.gameId)
            console.log("gameDetails.gameId",gameDetails.gameId)
        }
      
    });
    return () => {
      newSocket.removeAllListeners();
      newSocket.close();
    };
  }



  

  const renderContestContent = (image, name) => {
    return (
      <View style={styles.team}>
        <View style={[styles.teamView, styles.pickTeamView]}>
          <Image
            style={styles.teamImage}
            source={{
              // uri: `https://www.cricbuzz.com/a/img/v1/40x40/i1/c${image}/player_face.jpg`,
              uri: `https://cdn.sportmonks.com/images/cricket/teams/${image}`,
            }}
          />
        </View>
        <Text style={[styles.teamName, styles.teamText, {marginTop: 55}]}>{name || ''}</Text>
        {teamSelected && (
          <View style={[styles.matchTime, {marginTop: 10, width: 120}]}>
            <View style={styles.pickTimer}>
              <Text style={[styles.teamName, styles.teamTimerText]}>
                {currentTime}
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  };





  
  return (





<SafeAreaView style={styles.root}>
<StatusBar backgroundColor="#111111" />
<ScrollView contentContainerStyle={{flexGrow: 1}}>
  <View style={styles.mainContainer}>
  <MatchBanner selectedUserMatch = {selectedUserMatch}/>

    <View style={[styles.opponentcontainer, styles.open, {marginBottom : 30}]}>
      <View style={[styles.cntstmain, styles.pktm]}>
        <Text style={[styles.chstxt, styles.slctd, styles.ptmtxt]}>
    {teamSelected
            ? 'Your Team For The Toss Is'
            : 'Please Wait While Your Opponent Choose Toss'}
        </Text>

    {teamSelected && (
          <View style={[styles.mtchcard, styles.pmtch]}>
            {renderContestContent(
              teamData?.userTwoTeam == teamDetails?.contTwo ? teamDetails?.contTwoImg : teamDetails?.contOneImg,
              teamData?.userTwoTeam == teamDetails?.contTwo ? teamDetails?.contTwoSnam : teamDetails?.contOneSnam
            )}
          </View>
        )}

    {teamSelected ||
          (!teamSelected && (
            <View style={styles.matchTime}>
              <View style={styles.pickTimer}>
                <Text style={[styles.teamName, styles.teamTimerText]}>
                  {currentTime}
                </Text>
              </View>
            </View>
          ))}

        <Text style={[styles.teamnm, styles.wnrtxt]}>
          {`Winner of toss gets 1st pick in player selection,\nWhile waiting you can draft your team`}
        </Text>
        {currentTime == '00:00' && (
          <Text style={[styles.teamnm, styles.wnrtxt]}>
            {`toss will be announced shortly.`}
          </Text>
        )}
        <Pressable onPress={() => navigation.navigate('DraftRoute')}>
          <View
            style={[styles.chooseContest, styles.waitingRoom, styles.openGame]}>
            <Text
              style={[styles.mainText, styles.playNow, styles.waitingRoomText]}>Update Draft  
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

export default WithProgress(inject('UserStore')(observer(OPCT)));
