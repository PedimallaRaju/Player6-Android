import {
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  Modal
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GREEN, primary} from '../../../style';
import {inject, observer} from 'mobx-react';
import { styles } from './RunningMatch.styles';
import WithProgress from '../LoadingOverlay/WithProgress';
import { BorderLine2, CorrectIcon, England, India, LiveArrow, LiveScoreImage, Player1, Player2, Player3, Player4, Player5, Player6, Player7, PlusIcon, PlusIcon2, TickIcon } from '../../../assets';
import ScoreBoard from './ScoreBoard';
import TestScoreBoard from './TestScoreBoard';
import UserStore from '../../stores/UserStore';
import AsyncStorage from '@react-native-community/async-storage';
import Services from '../../../Services/Services';
import { ScrollView } from 'react-native-gesture-handler';
import EventSource from 'react-native-event-source';
import { useRoute } from '@react-navigation/native';
import Functions from '../Functions';




let userPF, userInfo, myPic,gameDetails;
const RunningMatch = ({navigation,showProgress,hideProgress}) => {
  const [matchType, setMatchType] = useState();
  const [opponentName, setopponentName] = useState('');
  const [opponentPic, setopponentPic] = useState('');
  const route = useRoute();
  const [teamA, setTeamA] = useState([]);
  const [teamB, setTeamB] = useState([]);
  const [teamARuns, setTeamARuns] = useState(0);
  const [teamBRuns, setTeamBRuns] = useState(0);
  const screenHeight = Dimensions.get('window').height;
  const [livescroreDisplay, setLiveScoreDisplay] = useState(false);
  const [testScroreDisplay, setTestScroreDisplay] = useState(false);
  const [viewScore, setViewScore] = useState(false);
  const [runScreen, setRunScreen] = useState(false);
  let newSocket;



  if(UserStore){
    const profile = UserStore.getuserPF();
    if(profile){
      myPic = profile?.replace(/['"]+/g, '');
    } 
  }


useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      gameDetails = UserStore.selectedGameData;
      AsyncStorage.setItem("pl6-socket", 'null');
      // setTeamA([]);
      // setTeamB([]);
      callSocket();
      getLiveMatchDetails();
      setRunScreen(true);
    });
    return()=> {
      unsubscribe();
    };
  }, [teamARuns, teamBRuns, teamA, teamB]);


  useEffect(()=>{

    return ()=>{
      newSocket.removeAllListeners();
      newSocket.close();
    }

  },[])





  
  const callSocket = async() =>{
    userInfo = JSON.parse(await AsyncStorage.getItem("player6-userdata"));
     newSocket = new EventSource(`https://www.xhtmlreviews.com/api-player6/1.0/auth/User/${userInfo.userId}/watchEvents`);
    // newSocket = new EventSource(`https://apidemo.player6sports.com/1.0/auth/User/${userInfo.userId}/watchEvents`);
    // newSocket = new EventSource(`https://apiqa.player6sports.com/1.0/auth/User/${userInfo.userId}/watchEvents`);
    // newSocket = new EventSource(`https://api.player6sports.com/1.0/auth/User/${userInfo.userId}/watchEvents`);

    newSocket.addEventListener("ping", (event) => {
      console.log('console for Running match',event);
    });

    newSocket.addEventListener("playerScore", (event) => {
        updatePlayerScoreFromSocket(event);
    });
    
  }



  const updatePlayerScoreFromSocket = (event) =>{
    
    const ds = JSON.parse(event.data);
    if(route.name == 'RunningMatch' && ds.matchId == gameDetails.matchId ){
      // console.log("Socket Data for Runs ---> ",ds);
      setViewScore(true);
      updatePlayerIndexScores(ds);
      // console.log('console for 104');
      // console.log(teamA);
      calculateTeamScores(teamA,teamB);

    }
  }



  // const updatePlayerIndexScores = (ds) =>{
  //   if(teamA.length > 0){
  //     teamA.forEach(element => {
  //       if(element.playerId == ds.playerId){
  //         element.scors = ds.runs;
  //         return element;
  //       }
  //     });
  //   }

  //   if(teamB.length > 0){
  //     teamB.forEach(element => {
  //       if(element.playerId == ds.playerId){
  //         element.scors = ds.runs;
  //         return element;
  //       }
  //     });
  //   }
  // }

  const updatePlayerIndexScores = (ds) => {
    setTeamA(prevTeamA => {
      const updatedTeamA = prevTeamA.map(element => {
        if (element.playerId == ds.playerId) {
          return { ...element, scors: ds.runs };
        }
        return element;
      });
      // console.log("updatedTeamA : ",updatedTeamA);
      calculateTeamScores(updatedTeamA,teamB);
      return updatedTeamA;
    });

    setTeamB(prevTeamB => {
      const updatedTeamB = prevTeamB.map(element => {
        if (element.playerId == ds.playerId) {
          return { ...element, scors: ds.runs };
        }
        return element;
      });
      // console.log("updatedTeamB : ",updatedTeamB);
      calculateTeamScores(teamA,updatedTeamB);
      return updatedTeamB;
    });
  };
















  const getLiveMatchDetails = async()=>{
    showProgress();
    userInfo = JSON.parse(await AsyncStorage.getItem("player6-userdata"));
    userPF = JSON.parse(await AsyncStorage.getItem("player6-profile"));
    // console.log("gameDetails ----> ", gameDetails);
    const obj = {
      gameId : gameDetails.gameId
    }
    Services.getInstance().runningMatchDetails(obj, userInfo.userId, gameDetails.gameId, userInfo.accesToken).then((result)=>{
      // console.log("Running Match API--->",result);
      hideProgress();
      if(result.status == 200){
        setTeamA(result.myPlayer);
        setTeamB(result.opnPlayer);
        setopponentName(result.name);
        setopponentPic(result.profileImg);
        setMatchType(result.matchType);
        calculateTeamScores(result.myPlayer,result.opnPlayer);
        
      }
    })

    Services.getInstance().runningMatchTeamWiseScores(userInfo.userId, gameDetails.matchId, userInfo.accesToken).then((result)=>{
      if(result.innings.length > 0){
        setViewScore(true);
      }
    })
  }



const calculateTeamScores = (teamA, teamB) =>{
  console.log("Calculation");
  setTimeout(function(){
    let teamAfSC = 0;
    let teamBfSC = 0;
    teamA.forEach(element => {
      if(element.scors != null){
          if(element.isCap == "1"){
            teamAfSC = teamAfSC + ((Number(element.scors))*2);
          }
          else if(element.isvCap == "1"){
            teamAfSC = Math.round(teamAfSC + ((Number(element.scors))*1.5));
          }
          else{
            teamAfSC = teamAfSC + Number(element.scors);
          }
          setTeamARuns(teamAfSC);
        // return element;
      }
    });

    console.log(" teamAfSC "+teamAfSC);

    teamB.forEach(element => {
      if(element.scors != null){
        if(element.isCap == "1"){
          teamBfSC = teamBfSC + ((Number(element.scors))*2);
        }
        else if(element.isvCap == "1"){
          teamBfSC = Math.round(teamBfSC + ((Number(element.scors))*1.5));
        }
        else{
          teamBfSC = teamBfSC + Number(element.scors);
        }
        setTeamBRuns(teamBfSC);
        return element;
      }
    });
    console.log(" teamBfSC "+teamBfSC);

},0)

}




  const getLeadByruns = () => {
      if(teamARuns > teamBRuns){
        return `You lead by ${teamARuns - teamBRuns} Runs`
      }
      else if(teamARuns < teamBRuns){
        return `You trail by ${teamBRuns - teamARuns} Runs`
      }
      else{
        return ``
      }
  };


  const getColorByruns = () => {
    if(teamARuns > teamBRuns){
      return GREEN;
    }
    else if(teamARuns < teamBRuns){
      return 'red'
    }
    else{
      return primary
    }
};









  const renderCountryBoxHeader = () => {
      return (
          <View style={styles.countryBoxTopHeader}>
              <View style={styles.teamLeft}>
                  <View style={styles.teamsImage}>
                      {userPF?.profileImg == "https://s3.ap-south-1.amazonaws.com/player6sports/pl6Uplods/" ? 
                              <Image style={styles.teamsImageStyle} source={require('../../../assets/images/dummy.png')}/>
                              :
                              <Image style={styles.teamsImageStyle} source={ userPF ? {uri: myPic} : require('../../../assets/images/dummy.png')}/>
                      }
                      {/* <Image style={styles.teamsImageStyle} source={India} /> */}
                  </View>
                  <View style={styles.teamName}>
                      <Text style={styles.teamLeftNameText}>{userPF ? userPF?.name : ""}</Text>
                  </View>
              </View>
              <View style={styles.teamRight}>
                  <View style={styles.teamRightImage}>
                      {opponentPic &&  opponentPic == "https://s3.ap-south-1.amazonaws.com/player6sports/pl6Uplods/" ? 
                              <Image style={styles.teamsImageStyle} source={require('../../../assets/images/dummy.png')}/>
                              :
                              <Image style={styles.teamsImageStyle} source={ opponentPic ? { uri: opponentPic} : require('../../../assets/images/dummy.png')}/>
                      }
                  </View>
                  <View style={styles.teamRightTextContainer}>
                      <Text style={styles.teamLeftNameText}>{opponentName ? opponentName : ""}</Text>
                  </View>
              </View>

          </View>
      )
  }

  const renderTeamAItem = ({ item, index }) => (
          <View style={[styles.tmplyrlft,styles.borderTopBlueWidth]} key={index}>
              <View style={styles.plyrlft}>
                  <View style={[styles.plyrprfl, styles.plyrlftprfl]}>
                    {item.faceImageId == "" ?
                      <Image style={styles.teamsImageStyle} source={require('../../../assets/images/dummy.png')}/>
                      :
                      <Image style={styles.teamsImageStyle} source={{ uri: `https://cdn.sportmonks.com/images/cricket/players/${item.faceImageId}` }} />
                    }
                  </View>
                  <View style={{ marginTop: 5 }}>
                      <Text style={[styles.ortxt, styles.plyrtm, styles.plyrsd]} numberOfLines={1} ellipsizeMode="tail">{item.teamId}</Text>
                  </View>
              </View>
              <View style={[styles.dotp, styles.dotp2]}>
                  <Image style={styles.dotimg} source={BorderLine2} />
              </View>
              <View>
                  <Text style={[styles.teamnm, styles.wnrtxt, styles.tmname, styles.plyrname]} numberOfLines={2} ellipsizeMode="tail">{item.name}</Text>
                  <Text style={[styles.teamnm, styles.plyrruns]}>Score : {item.scors}</Text>
                  {item.isCap == "1" || item.isvCap == "1" ? 
                    <Text style={[styles.teamnm, styles.plyrruns]}>{item.isCap == "1" ? "2X Runs" : item.isvCap == "1" ? "1.5X Runs" : ""}</Text>
                  : "" }
              </View>
              {item.isCap == "1" || item.isvCap == "1" ? 
                <Text style={styles.cvctxt}>{item.isCap == "1" ? "C" : item.isvCap == "1" ? "Vc" : ""}</Text>
              : "" }

          </View>
  );

  const renderTeamBItem = ({ item, index }) => (
      <View style={[styles.tmplyrlft,styles.borderTopOrangeWidth]}>
          <View style={styles.plyrlft}>
              <View style={[styles.plyrprfl, styles.plyrlftprfl]}>
              {item.faceImageId == "" ?
                      <Image style={styles.teamsImageStyle} source={require('../../../assets/images/dummy.png')}/>
                      :                  
                  <Image style={styles.teamsImageStyle} source={{ uri: `https://cdn.sportmonks.com/images/cricket/players/${item.faceImageId}` }} />
              }
              </View>
              <View style={{ marginTop: 5 }}>
                  <Text style={[styles.ortxt, styles.plyrtm, styles.plyrsd]} numberOfLines={1} ellipsizeMode="tail">{item.teamId}</Text>
              </View></View>
          <View style={[styles.dotp, styles.dotp2]}>
              <Image style={styles.dotimg} source={BorderLine2} />
          </View>
          <View>
              <Text style={[styles.teamnm, styles.wnrtxt, styles.tmname, styles.plyrname]} numberOfLines={2} ellipsizeMode="tail">{item.name}</Text>
              <Text style={[styles.teamnm, styles.plyrruns]}>Score : {item.scors}</Text>
              {item.isCap == "1" || item.isvCap == "1" ? 
                    <Text style={[styles.teamnm, styles.plyrruns]}>{item.isCap == "1" ? "2X Runs" : item.isvCap == "1" ? "1.5X Runs" : ""}</Text>
                  : "" }
              </View>
              {item.isCap == "1" || item.isvCap == "1" ? 
                <Text style={styles.cvctxt}>{item.isCap == "1" ? "C" : item.isvCap == "1" ? "Vc" : ""}</Text>
              : "" }
      </View>
  );






  return !runScreen ? null : (
    <View style={[styles.root,{flex: 1, height: '100%',marginTop : 60}]}>
      <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1}}>
          <View>
            <View style={styles.rm_main}>
              <Text style={[styles.hdtxt, styles.tmtle, {color: getColorByruns()}]}>
                {getLeadByruns()}
              </Text>


              <View style={[styles.headerContainer]}>
                  <View style={styles.countryBox}>
                      {renderCountryBoxHeader()}
                  </View>
                  <View style={styles.playerContainer}>
                      <View style={styles.playerContentBox}>
                          <FlatList
                              data={teamA}
                              renderItem={renderTeamAItem}
                              keyExtractor={(item, index) => index.toString()}
                          />
                      </View>
                      <View style={styles.playerContentBox}>
                          <FlatList
                              data={teamB}
                              renderItem={renderTeamBItem}
                              keyExtractor={(item, index) => index.toString()}
                          />
                      </View>
                  </View>
              </View>

             
              <View style={styles.scoreMainContainer}>
                <View
                  style={styles.scoreSubMain1}>
                  <Text style={styles.scoreText}>Total Run {teamARuns}</Text>
                </View>
                <View style={styles.scoreSubMain2}>
                  <Text style={styles.scoreText}>Total Run {teamBRuns}</Text>
                </View>

              </View>
              {viewScore == true ? 
                <TouchableOpacity style={styles.scoreLive} onPress={()=>{
                  Functions.getInstance().fireAdjustEvent("qd27d0");
                  Functions.getInstance().fireFirebaseEvent("ViewLiveMatchScore");
                  if(matchType == "3" ){
                    setTestScroreDisplay(true);
                    setLiveScoreDisplay(false);
                  }
                  else{
                    setLiveScoreDisplay(true);
                    setTestScroreDisplay(false);

                  }
                  
                  }}>
                  <View style={styles.scoreMatch}>
                    <View>
                      <Image source={LiveScoreImage}
                        style={{
                          width:38,
                          height:38,
                          resizeMode:'contain',
                        }}
                      />
                    </View>
                    <View>
                      <Text style={styles.scoreTxt}>View Live Match Score</Text>
                    </View>
                  </View>
                  <View>
                    <Image source={LiveArrow}
                      style={{
                        width:16,
                        height:16,
                      }}
                    />
                  </View>
                </TouchableOpacity>
              : 

               <View style={styles.scoreLive}>
                <Text style={styles.scoreText}>Match yet be started...</Text>
               </View>
              }

            </View>
          </View>



          {livescroreDisplay ? 
            <ScoreBoard 
              isVisible = {livescroreDisplay} 
              closePopup = {()=>setLiveScoreDisplay(false)}
              navigation = {navigation}
            />

            : "" }




      {testScroreDisplay ? 
          <TestScoreBoard 
            isVisible = {testScroreDisplay} 
            closePopup = {()=>setTestScroreDisplay(false)}
            navigation = {navigation}
            />
        : "" }

        </View>
      </ScrollView>

    </View>
  );
};

export default WithProgress(inject('UserStore')(observer(RunningMatch)));
