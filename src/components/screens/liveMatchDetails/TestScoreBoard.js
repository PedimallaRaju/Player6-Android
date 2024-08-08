import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import { CloseIcon, CorrectIcon, NextArrow, TBC } from '../../../assets';
import { styles } from './RunningMatch.styles';
import { secondary } from '../../../style';
import { ScrollView } from 'react-native-gesture-handler';
import UserStore from '../../stores/UserStore';
import WithProgress from '../LoadingOverlay/WithProgress';
import AsyncStorage from '@react-native-community/async-storage';
import Services from '../../../Services/Services';
import {inject, observer} from 'mobx-react';
import EventSource from 'react-native-event-source';
import Functions from '../Functions';




let userPF, userInfo, myPic,gameDetails, currentPlayers=[], status = false, inningsGlobal=[];
const TestScoreBoard = ({isVisible, closePopup, navigation, showProgress, hideProgress}) => {
    const [index, setIndex] = useState("liveScore");
    const [team1Data, setTeam1Data] = useState({});
    const [indexOpen, setIndexOpen] = useState();
    const [team2Data, setTeam2Data] = useState({});
    const [innings, setInnings] = useState([]);
    const [batTeamName,  setBatTeamName] = useState("");
    let newSocket;



    useEffect(() => {
            currentPlayers=[];
            inningsGlobal=[];
            setTeam1Data({});
            setTeam2Data({});
            setInnings([]);
            setBatTeamName("");
            console.log("liveScore for test matches");
            if (isVisible) {
                setIndex("liveScore");
                gameDetails = UserStore.selectedGameData;
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
        console.log('console');
        userInfo = JSON.parse(await AsyncStorage.getItem("player6-userdata"));
         newSocket = new EventSource(`https://www.xhtmlreviews.com/api-player6/1.0/auth/User/${userInfo.userId}/watchEvents`);
        // newSocket = new EventSource(`https://apidemo.player6sports.com/1.0/auth/User/${userInfo.userId}/watchEvents`);
        // newSocket = new EventSource(`https://apiqa.player6sports.com/1.0/auth/User/${userInfo.userId}/watchEvents`);
        // newSocket = new EventSource(`https://api.player6sports.com/1.0/auth/User/${userInfo.userId}/watchEvents`);
        
        newSocket.addEventListener("ping", (event) => {
            console.log('console for Test Score Board');
        });
  
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
            // newSocket.removeEventListener();
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






      const updatePlayerIndexScores = (ds) => {
        inningsGlobal = inningsGlobal.map(element => {
            console.log("125------>",inningsGlobal);
            element.scoreCard.map(plElement=>{
                if (plElement.playerId == ds.playerId) {
                    plElement.runs = ds.runs
                    plElement.balls = ds.balls
                    plElement.fours = ds.fours
                    plElement.sixes = ds.sixes
                    plElement.strikeRate = ds.strikeRate
                    plElement.outDesc = ds.outDesc
                }
                return plElement;
            })
            
        return element;  
        })
        setInnings(inningsGlobal);

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
    }



    const updateInningsFromSocket = (event) =>{
        const ds = JSON.parse(event.data);
        // console.log(ds);
        if(ds.matchId == gameDetails.matchId){
            setInnings([]);
            inningsGlobal = inningsGlobal.map(data=>{
                if(data?.inningsId == ds.innings){
                    data.overs = ds.overs
                    data.score = ds.runs
                    data.wick = ds.wickets
                }
                return data;  
            })
            setInnings(inningsGlobal);
            
        }
      }


    // const updatePlayerIndexScores = (ds) => {
    //     innings = innings.map((data,index)=>{

    //     })
    // }





      const getLiveMatchDetails = async()=>{
        showProgress();
        userInfo = JSON.parse(await AsyncStorage.getItem("player6-userdata"));
        userPF = JSON.parse(await AsyncStorage.getItem("player6-profile"));
        console.log("Calling API ------------------------>")
        Services.getInstance().runningMatchTeamWiseScores(userInfo.userId, gameDetails.matchId, userInfo.accesToken).then((result)=>{
            console.log(JSON.stringify(result));
            inningsGlobal = result.innings;
            setInnings(result.innings);
            setTeam1Data(result.teamAdetails);
            setTeam2Data(result.teamBdetails);
            setBatTeamName(result.innings[0].name);
            filterCurrentPlayerDetails(result.innings[0].scoreCard);
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

          <View style={[styles.ppscs]}>
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
                            handleButton2Press()
                            }} >
                        <View >
                            <Text style={styles.teamTitle}>Score Card</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
            :

            "" }

            {index == "scoreCard" ? 
                <View style={styles.teamtab}>
                    <TouchableOpacity
                        onPress={()=>{
                            Functions.getInstance().fireAdjustEvent("4augxv");
                            Functions.getInstance().fireFirebaseEvent("LiveScore");
                            handleButton1Press();
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
            : ""}













                {index == "liveScore" ? 
                    <View style={[styles.teamviw,{paddingBottom:10}]}>
                        <View style={styles.teamLive}>
                            <View style={styles.temInfo}>
                                <View style={styles.temtxt}>
                                {(team1Data.logo == "") || (team1Data.logo == "https://cdn.sportmonks.com") ? 
                                        <Image style={[styles.tmsdimg, {marginTop : 10}]} source={TBC}/>
                                       :
                                        <Image style={styles.tmsdimg} source={{ uri: `https://cdn.sportmonks.com/images/cricket/teams/${team1Data.logo}` }}/>
                                }
                                    <Text style={styles.temcnt}>{team1Data.name}</Text>
                                    {
                                    innings && innings.length > 0 ? innings.map((data,keyIndex)=>{
                                        return(
                                            data.name == team1Data.name ? 
                                            <View key={key={keyIndex}}>
                                                <Text style={styles.temnum}>{data.score}/{data.wick} in {data.overs} overs</Text>
                                            </View>
                                            : "" 
                                        )
                                    }) : ""
                                }
                                </View>

                            </View>
                            <View style={styles.temBat}>
                                <View style={styles.temtxt}>
                                {(team2Data.logo == "") || (team2Data.logo == "https://cdn.sportmonks.com") ? 
                                        <Image style={[styles.tmsdimg, {marginTop : 10}]} source={TBC}/>
                                       :
                                        <Image style={styles.tmsdimg} source={{ uri: `https://cdn.sportmonks.com/images/cricket/teams/${team2Data.logo}` }}/>
                                }
                                    <Text style={styles.temcnt}>{team2Data.name}</Text>
                                    {
                                    innings && innings.length > 0 ? innings.map((data,keyIndex)=>{
                                        return(
                                            data.name == team2Data.name ? 
                                            <View key={keyIndex}>
                                                <Text style={styles.temnum}>{data.score}/{data.wick} in  {data.overs} overs</Text>
                                            </View>
                                            : "" 
                                        )
                                    }) : ""
                                }
                                </View>
                            </View>
                        </View>

                    {currentPlayers && currentPlayers.length > 0 ? 
                        <View style={styles.temBating}>
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
                            <View style={{marginTop : 0,paddingLeft:7,paddingBottom:5}}>
                            {innings && innings.length > 0 ? innings.map((inningData, inningIndex)=>{
                                return(
                                    <View style={{ backgroundColor : '#494949',borderRadius:10, borderBottomWidth : 1, borderBottomColor : 'black'}} key={inningIndex}>
                                    <TouchableOpacity 
                                        style={[styles.scoreCard]}
                                        onPress={()=>{
                                            if(status == false){
                                                status = true;
                                                setIndexOpen(inningIndex);
                                                }
                                                else{
                                                if(indexOpen == inningIndex){
                                                    status = false;
                                                    setIndexOpen();
                                                }
                                                else{
                                                    status = true;
                                                    setIndexOpen(inningIndex);
                                                }
                                                }
                                        }}
                                    >
                                        <View>
                                            <Text style={{color:'#fff'}}>{inningData.name} Inn {inningData.inningsId}</Text>
                                        </View>
                                        <View style={{flexDirection:'row'}}>
                                            <Text style={{color:'#fff'}}>{inningData.score}/{inningData.wick} ({inningData.overs})</Text>
                                            <View style={[styles.scorearw]}>
                                                <Image source={NextArrow}
                                                    style={{width:10, height : 10}}
                                                />
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                {indexOpen == inningIndex ?
                                        <View style={[styles.scoreCard, {borderTopWidth : 1, borderTopColor : 'black'}]}>
                                            <View style={styles.plyrName}>
                                            <Text style={[styles.scoreCardHeader,{width:'40%'}]}>Batting</Text>
                                            </View>
                                            <View style={[styles.scorelst]}>
                                                <Text style={[styles.scoreCardHeader]}>R</Text>
                                                <Text style={[styles.scoreCardHeader]}>B</Text>
                                                <Text style={[styles.scoreCardHeader]}>4s</Text>
                                                <Text style={[styles.scoreCardHeader]}>6s</Text>
                                                <Text style={[styles.scoreCardHeader]}>S/R</Text>
                                            </View>
                                        </View>
                                : "" }

                                {indexOpen == inningIndex ?

                                    inningData.scoreCard && inningData.scoreCard.length > 0 ? inningData.scoreCard.map((score, scoreIndex)=>{      
                                        return(
                                            <View style={styles.scoreCard} key={scoreIndex}>
                                                <View style={styles.plyrName}>
                                                    <Text style={{color:'#fff'}}>{score.name}</Text>
                                                    <Text style={[styles.scoreCardHeader,{borderBottomWidth:0}]}
                                                        numberOfLines={1}
                                                        ellipsizeMode="tail"
                                                        >{score.outDesc}
                                                    </Text>
                                                </View>
                                                <View style={[styles.scorelst]}>    
                                                    <Text style={[styles.scoreNo]}>{score.runs}</Text>
                                                    <Text style={[styles.scoreNo]}>{score.balls}</Text>
                                                    <Text style={[styles.scoreNo]}>{score.fours}</Text>
                                                    <Text style={[styles.scoreNo]}>{score.sixes}</Text>
                                                    <Text style={[styles.scoreNo]}>{score.strikeRate}</Text>
                                                </View>
                                            </View>
                                        )
                                            
                                    }) : ""

                                : "" }
            
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

export default WithProgress(inject('UserStore')(observer(TestScoreBoard)));
