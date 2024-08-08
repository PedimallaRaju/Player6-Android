import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import { CloseIcon, CorrectIcon, TBC } from '../../../assets';
import { styles } from './RunningMatch.styles';
import { graybg, secondary } from '../../../style';
import { ScrollView } from 'react-native-gesture-handler';
import UserStore from '../../stores/UserStore';
import WithProgress from '../LoadingOverlay/WithProgress';
import AsyncStorage from '@react-native-community/async-storage';
import Services from '../../../Services/Services';
import {inject, observer} from 'mobx-react';
import EventSource from 'react-native-event-source';
import Functions from '../Functions';




let userPF, userInfo, myPic,gameDetails, currentPlayers=[],team1Data={},team2Data={}, team1Score=[],  team2Score=[];
const ScoreBoard = ({isVisible, closePopup, navigation, showProgress, hideProgress}) => {
    const [index, setIndex] = useState("liveScore");
    const [teamScoreFinalList, setTeamScoreFinalList] = useState([]);
    const [teamType, setTeamType] = useState(1);
    const [innings, setInnings] = useState([]);
    const [batTeamName,  setBatTeamName] = useState("");
    const [team1Details, setTeam1Details] = useState({});
    const [team2Details, setTeam2Details] = useState({});
    let newSocket;





    useEffect(() => {
        currentPlayers=[];
        team1Data={};
        team2Data={};
        team1Score=[]; 
        team2Score=[];
        setTeamScoreFinalList([]);
        setBatTeamName("");
        setTeam1Details({});
        setTeam2Details({});
        console.log("liveScore");
        if (isVisible) {
            setIndex("liveScore");
            gameDetails = UserStore.selectedGameData;
            AsyncStorage.setItem("pl6-socket", 'null');
            callSocket();
            getLiveMatchDetails();
        }

        return ()=>{
            // newSocket.removeAllListeners();
            // newSocket.close();
        }

      }, [isVisible]);


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
        
        
  
        newSocket.addEventListener("playerScore", (event) => {
            updatePlayerScoreFromSocket(event);
        });

        newSocket.addEventListener("innScors", (event) => {
            updateInningsFromSocket(event);
        });

        newSocket.addEventListener("matComplete", (event) => {
            const matComplete = JSON.parse(event.data);
            if(matComplete.matchId == gameDetails.matchId && matComplete.gameId == gameDetails.gameId){
                navigation.navigate("TotalResult");
            }
        });
        
        return () => {
            // newSocket.removeAllListeners();
            // newSocket.close();
          };
      }




      const updatePlayerScoreFromSocket = (event) =>{
        const ds = JSON.parse(event.data);
        if(ds.matchId == gameDetails.matchId ){
          console.log(ds);
          updatePlayerIndexScores(ds);
        }
      }

      const updateInningsFromSocket = (event) =>{
        const ds = JSON.parse(event.data);
        if(ds.matchId == gameDetails.matchId ){
          console.log(ds);
          updateInningsIndexScores(ds);
        }
      }




      const updatePlayerIndexScores = (ds) => {
        team1Score = team1Score.map(element => {
            if (element.playerId == ds.playerId) {
                element.runs = ds.runs
                element.balls = ds.balls
                element.fours = ds.fours
                element.sixes = ds.sixes
                element.strikeRate = ds.strikeRate
                element.outDesc = ds.outDesc
            }
            return element;
          });


            team2Score = team2Score.map(element => {
              if (element.playerId == ds.playerId) {
                    element.runs = ds.runs
                    element.balls = ds.balls
                    element.fours = ds.fours
                    element.sixes = ds.sixes
                    element.strikeRate = ds.strikeRate
                    element.outDesc = ds.outDesc
              }
              return element;
            });



        currentPlayers = currentPlayers?.map(element => {
            if((element.playerId == ds.playerId) && (ds.status == "1")){
                currentPlayers = currentPlayers.filter(function( obj ) {
                    return obj.playerId !== ds.playerId;
                  });
            }
            if (element.playerId == ds.playerId) {
                return { ...element, 
                    runs: ds.runs,
                    balls : ds.balls,
                    fours : ds.fours,
                    sixes : ds.sixes,
                    strikeRate : ds.strikeRate,
                    

                };
            }
            if((element.playerId != ds.playerId) && (currentPlayers.length != 2)){
                console.log(element.playerId + "====" + ds.playerId)
                getLiveMatchDetails();
            }
            return element;
        });

      };


      const updateTeam1LatestScores = (scorecard1)=>{
        setTeam1Score(scorecard1);
        setTeamScoreFinalList(team1Score);
      }

      const updateTeam2LatestScores = (scorecard2)=>{
        setTeam2Score(scorecard2);
        setTeamScoreFinalList(team2Score);
      }



      const updateInningsIndexScores = (ds) => {
            if(team1Data?.inningsId == ds.innings){
                team1Data.overs = ds.overs
                team1Data.score = ds.runs
                team1Data.wick = ds.wickets
            }
            if(team2Data?.inningsId == ds.innings){
                team2Data.overs = ds.overs
                team2Data.score = ds.runs
                team2Data.wick = ds.wickets
            }


        }



      const getLiveMatchDetails = async()=>{
        console.log("scoresss")
        showProgress();
        userInfo = JSON.parse(await AsyncStorage.getItem("player6-userdata"));
        userPF = JSON.parse(await AsyncStorage.getItem("player6-profile"));
        Services.getInstance().runningMatchTeamWiseScores(userInfo.userId, gameDetails.matchId, userInfo.accesToken).then((result)=>{
            console.log(JSON.stringify(result));
            setInnings(result.innings);
            setTeam1Details(result.teamAdetails);
            setTeam2Details(result.teamBdetails);
            if(result.innings.length > 0){
                if(result.innings.length == 1){
                    if(result.teamAdetails.name == result.innings[0].name){
                        team1Data = result.innings[0];
                        team1Score = result.innings[0].scoreCard,
                        // setTeam1Data(result.innings[0]);
                        setBatTeamName(result.innings[0].name);
                        // setTeam1Score(result.innings[0].scoreCard);
                        setTeamScoreFinalList(result.innings[0].scoreCard);
                        filterCurrentPlayerDetails(result.innings[0].scoreCard);
                    }
                    if(result.teamBdetails.name == result.innings[0].name){
                        team2Data = result.innings[0];
                        team2Score = result.innings[0].scoreCard,
                        // setTeam1Data(result.innings[0]);
                        setBatTeamName(result.innings[0].name);
                        // setTeam1Score(result.innings[0].scoreCard);
                        setTeamScoreFinalList(result.innings[0].scoreCard);
                        filterCurrentPlayerDetails(result.innings[0].scoreCard);
                    }

                }
                if(result.innings.length == 2){
                    if(result.teamAdetails.name == result.innings[0].name){
                        setTeamType(2);
                        team1Data = result.innings[0];
                        team2Data = result.innings[1];
                        team1Score = result.innings[0].scoreCard,
                        team2Score = result.innings[1].scoreCard,
                        setBatTeamName(result.innings[0].name);
                        setTeamScoreFinalList(result.innings[1].scoreCard);
                        filterCurrentPlayerDetails(result.innings[0].scoreCard);
                    }
                    if(result.teamBdetails.name == result.innings[0].name){
                        setTeamType(1);
                        team1Data = result.innings[1];
                        team2Data = result.innings[0];
                        team1Score = result.innings[1].scoreCard,
                        team2Score = result.innings[0].scoreCard,
                        setBatTeamName(result.innings[0].name);
                        setTeamScoreFinalList(result.innings[1].scoreCard);
                        filterCurrentPlayerDetails(result.innings[0].scoreCard);
                    }

                }
            }
            hideProgress();
        })
      }



    
   const filterCurrentPlayerDetails = (data) =>{
        currentPlayers=[];
        data.forEach(element => {
            if(element.outDesc == "batting"){
                currentPlayers.push(element);
            }
        });
    }












    const handleButton1Press = () => {
        setIndex("liveScore");
    };

    const handleButton2Press = () => {
        // showProgress();
        setIndex("scoreCard");
    }



  return (
    <View style={{flex: 1}}>
      <Modal isVisible={isVisible}>
        <View style={{flex: 1}}>

          <View style={styles.ppscs}>
          <TouchableOpacity style={styles.scorecross} onPress={closePopup}>
            <Image source={CloseIcon}
             style={{width:15, height : 15}}
            />
          </TouchableOpacity>
            {index == "liveScore" ? 
                    <View style={styles.teamtab}>
                    <TouchableOpacity
                        onPress={()=>{
                            Functions.getInstance().fireAdjustEvent("4augxv");
                            Functions.getInstance().fireFirebaseEvent("LiveScore");
                            handleButton1Press();
                        }} 
                        style={[styles.team,  { backgroundColor: '#279bff'}]}>
                        <View >
                            <Text style={styles.teamTitle}>Live Score</Text>
                        </View>
                    </TouchableOpacity>

                        <TouchableOpacity
                            
                        style={[styles.team,{backgroundColor: ''}]}
                        onPress={()=>{
                            Functions.getInstance().fireAdjustEvent("js4izf");
                            Functions.getInstance().fireFirebaseEvent("ScoreCard");
                            handleButton2Press();
                            }} >
                        <View >
                            <Text style={styles.teamTitle}>Score Card</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
            :

            "" }

            {index == "scoreCard" ? 
            // <ScrollView>
                <View style={styles.teamtab}>
                    <TouchableOpacity
                        onPress={()=>{
                            Functions.getInstance().fireAdjustEvent("4augxv");
                            Functions.getInstance().fireFirebaseEvent("LiveScore");
                            handleButton1Press()
                        }} 
                        style={[styles.team,  { backgroundColor:''}]}>
                        <View >
                            <Text style={styles.teamTitle}>Live Score</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.team,{backgroundColor:'#279bff'}]}
                        onPress={()=>{
                            Functions.getInstance().fireAdjustEvent("js4izf");
                            Functions.getInstance().fireFirebaseEvent("ScoreCard");
                            handleButton2Press();
                        }} >
                        <View >
                            <Text style={styles.teamTitle}>Score Card</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            // </ScrollView>
            : ""}













                {index == "liveScore" ? 
                    <View style={[styles.teamviw,{paddingBottom:10}]}>
                        <View style={styles.teamLive}>
                            <View style={styles.temInfo}>
                                <View style={styles.temtxt}>
                                    
                                    {(team1Details.logo == "") || (team1Details.logo == "https://cdn.sportmonks.com") ? 
                                        <Image style={[styles.tmsdimg, {marginTop : 10}]} source={TBC}/>
                                       :
                                    
                                        <Image style={styles.tmsdimg} source={{ uri: `https://cdn.sportmonks.com/images/cricket/teams/${team1Details.logo}` }}/>
                                    }
                                    <Text style={styles.temcnt}>{team1Details.name}</Text>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={styles.temnum}>{team1Data.score}/{team1Data.wick}</Text>
                                        <Text style={styles.temcunt}>{team1Data.overs} Overs</Text>
                                    </View>
                                </View>
 
                            </View> 
                            <View style={styles.temBat}>
                                {/* {innings && innings.length > 0 ? "" :
                                    <View>
                                        <Text style={styles.temyet}>Yet to Bat</Text>
                                    </View>
                                } */}

                                <View style={styles.temtxt}>
                                {(team2Details.logo == "") || (team2Details.logo == "https://cdn.sportmonks.com") ? 
                                        <Image style={[styles.tmsdimg, {marginTop : 10}]} source={TBC}/>
                                       :
                                    <Image style={styles.tmsdimg} source={{ uri: `https://cdn.sportmonks.com/images/cricket/teams/${team2Details.logo}` }}/>
                                }
                                    <Text style={styles.temcnt}>{team2Details.name}</Text>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={styles.temnum}>{team2Data.score}/{team2Data.wick}</Text>
                                        <Text style={styles.temcunt}>{team2Data.overs} {team2Data.overs == "" ? "" : 'overs'}</Text>
                                    </View>
                                </View>

                            </View>
                        </View>

                        {currentPlayers && currentPlayers.length > 0 ? 
                        <View style={[styles.temBating]}>
                                <View style={{flexDirection:'row'}}> 
                                    <Text style={[styles.ctryname]}>{batTeamName}</Text>
                                </View>
                                {currentPlayers && currentPlayers.length > 0 ? currentPlayers.map((data, index)=>{
                                    return(
                                        <View style={{flexDirection : "row",alignItems:"center",marginTop:10}}>
                                                <Text style={[styles.prsnme,{marginRight:5}]}>{data.name} {data.runs} in </Text>
                                            <Text style={[styles.prsnme]}>({data.balls})</Text>
                                        </View>
                                    )
                                }) : ""}
                            </View>
                        : ""}

                        
                    </View>
                    : ""}
          




                {index == "scoreCard" ?
                <ScrollView>
                    <View style={{ backgroundColor : '#494949',borderRadius:10,paddingLeft:7,paddingBottom:5}}> 
                        <View style={[styles.scoreCard,{borderBottomWidth:1}]}>

                        {!team1Data.hasOwnProperty('name') ? "" : 
                            <TouchableOpacity onPress={()=>{
                                setTeamType(1);
                                setTeamScoreFinalList(team1Score);
                            }}>
                            <Text style={[styles.scoreCardHeader, {color : teamType == 1 ? secondary : 'white'}]}>{team1Data.name}</Text>
                            </TouchableOpacity>
                        }


                            {!team2Data.hasOwnProperty('name') ? "" : 
                                <TouchableOpacity onPress={()=>{
                                    if(team2Score.length > 0){
                                        setTeamType(2);
                                        setTeamScoreFinalList(team2Score);
                                    }
                                }}>
                                    <Text style={[styles.scoreCardHeader, {color : teamType == 2 ? secondary : 'white'}]}>{team2Data.name}</Text>
                                </TouchableOpacity>
                            }
                        </View>

                        <View style={styles.scoreCard}>
                            <View style={styles.plyrName}>
                               <Text style={[styles.scoreCardHeader,{width:'40%'}]}>Name</Text>
                            </View>
                            <View style={[styles.scorelst]}>
                                <Text style={[styles.scoreCardHeader]}>R</Text>
                                <Text style={[styles.scoreCardHeader]}>B</Text>
                                <Text style={[styles.scoreCardHeader]}>4s</Text>
                                <Text style={[styles.scoreCardHeader]}>6s</Text>
                                <Text style={[styles.scoreCardHeader]}>S/R</Text>
                            </View>
                        </View>


                        {teamScoreFinalList && teamScoreFinalList.length > 0 ? teamScoreFinalList.map((data, index)=>{
                            return(
                                <View>
                                <View style={styles.scoreCard} key={index+"score"}>
                                <View style={styles.plyrName}>
                                    <Text style={{color : '#fff'}}>{data.name}</Text>
                                    {/* {
                                        
                                        data.outDesc == "" ? "" : <View style={{}}><Text style={[styles.scoreCardHeader]}>{data.outDesc}</Text></View>
                                    } */}
                                    
                                    </View>
                                    <View style={[styles.scorelst]}>
                                        <Text style={[styles.scoreNo]}>{data.runs}</Text>
                                        <Text style={[styles.scoreNo]}>{data.balls}</Text>
                                        <Text style={[styles.scoreNo]}>{data.fours}</Text>
                                        <Text style={[styles.scoreNo]}>{data.sixes}</Text>
                                        <Text style={[styles.scoreNo]}>{data.strikeRate}</Text>
                                    </View>

                                </View>
                                {
                                        
                                    data.outDesc == "" ? "" : 
                                    <View style={{flexDirection:'row'}}>
                                        <Text 
                                            style={[styles.scoreCardHeader,{ borderBottomWidth:0}]}
                                            numberOfLines={1}
                                            ellipsizeMode="tail" 
                                            >{data.outDesc}
                                        </Text>
                                    </View>
                                }
                                </View>
                            )
                        }) : ""}

                            


                    </View>
                </ScrollView>
                : ""}

            </View>

        </View>
        
    </Modal>
    </View>
  );
};

export default WithProgress(inject('UserStore')(observer(ScoreBoard)));
