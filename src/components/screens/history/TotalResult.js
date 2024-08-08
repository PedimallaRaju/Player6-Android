import React, {useEffect, useState} from 'react';
import {BackHandler, FlatList, ImageBackground, SafeAreaView, ScrollView, View} from 'react-native';
import {inject, observer} from 'mobx-react';
import WithProgress from '../LoadingOverlay/WithProgress';
import { styles } from './TotalResult.styles';
import CustomButton from '../customComponents/CustomButton';
import { HistoryEmpty, LooserBG, Player, TBC, ThumbsLoose, TotalButton, Trophy, TrophyBackground } from '../../../assets';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Image } from '@rneui/base';
import AsyncStorage from '@react-native-community/async-storage';
import Services from '../../../Services/Services';
import Functions from '../Functions';
import { secondary } from '../../../style';
import { useFocusEffect } from '@react-navigation/native';
import ReactMoE, {
  MoEProperties,
} from "react-native-moengage";





const MatchType = {
  "1": "1",
  "2": "5",
  "3": "10",
  "4": "20",
};

let userPF, userInfo,totalWin = 0,totalLoss = 0, status = false, winCount = 0, lossCount = 0;

const TotalResult = ({navigation,showProgress,hideProgress}) => {

  const [scoreBoard, setScoreBoard] = useState();
  const [historyList, setHistoryList] = useState([]);


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      AsyncStorage.setItem("pl6-socket", 'null');
      myHistory();
    });
    return unsubscribe;
  }, [navigation,totalWin,totalLoss]);




  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.navigate('CricketLeague');
        return true;
      });

      return () => {
        backHandler.remove();
      };
    }, [])
  );



  const myHistory = async () => {
    showProgress();
        userInfo = JSON.parse(await AsyncStorage.getItem("player6-userdata"));
        userPF = JSON.parse(await AsyncStorage.getItem("player6-profile"));
        Functions.getInstance().checkExpiration(userInfo.userId, userInfo.refToken, navigation);
        Functions.getInstance().checkInternetConnectivity().then((state)=>{
          if(state == true){
            Services.getInstance().historyData(userInfo.userId, userInfo.accesToken).then((result)=>{
              console.log(JSON.stringify(result.data));
              if(result.status == 200){
                setHistoryList(result.data);
                AsyncStorage.setItem("History", JSON.stringify(result.data));
                if(result.data.length > 0){
                  fireEventToMoEngage(result.data);
                }
                if(result.winTotal){
                  totalWin = result.winTotal;
                  AsyncStorage.setItem("History-WinTotal", String(result.winTotal));
                }
                if(result.loosTotal){
                  totalLoss = result.loosTotal;
                  AsyncStorage.setItem("History-LossTotal", String(result.loosTotal));
                }
              }
              hideProgress();
            })
          }
          else{
            getTotalWin();
            getTotalLoss();
            Functions.getInstance().offlineHistory().then(result => {
              setHistoryList(result);
            });
            hideProgress();
          }
        })
  };


  const getTotalWin = async()=>{
    totalWin =  await AsyncStorage.getItem("History-WinTotal");
  }
  const getTotalLoss = async()=>{
    totalLoss =  await AsyncStorage.getItem("History-LossTotal");
  }

  const fireEventToMoEngage = (data) =>{
    data.forEach(element => {
      if(element.winnStatus == "1"){
        winCount = winCount + 1;
      }
      else{
        lossCount = lossCount + 1;
      }
      ReactMoE.setUserAttribute("Wins", winCount);
      ReactMoE.setUserAttribute("Loses", lossCount);
    });
  }










  return (
    <SafeAreaView style={styles.root}>
      <ScrollView style={[styles.exvw]}>
        <View style={styles.rm_main}>
        <View style={styles.cardView}>
            <View style={styles.flexRow}>
                <CustomButton
                    width='45%'
                    onPress={() => null}
                    btnLabel={`Total Win ${totalWin}`} />
                <CustomButton
                    width='45%'
                    colour='orange'
                    onPress={() => null}
                    btnLabel={`Total Loss ${totalLoss}`} />
            </View>
            {(Number(totalWin) - Number(totalLoss)).toFixed(2) > 0 ? 
            <ImageBackground style={
                {
                    margin: 8,
                    padding: 8,
                    flex: 1,
                    borderRadius: 8,
                    overflow: 'hidden',
                    marginBottom: 7
                }}
                source={TotalButton}>
                <Text style={styles.normalFont}
                >Net</Text>
                <Text style={styles.boldFont}>₹{(Number(totalWin) - Number(totalLoss)).toFixed(2)}</Text>
            </ImageBackground>
            :
            <ImageBackground style={
                {
                    margin: 8,
                    padding: 8,
                    flex: 1,
                    borderRadius: 8,
                    overflow: 'hidden',
                    marginBottom: 7
                }}
                source={LooserBG}>
                <Text style={styles.normalFont}
                >Net</Text>
                <Text style={styles.boldFont}>₹{(Number(totalLoss) - Number(totalWin)).toFixed(2)}</Text>
            </ImageBackground>
            }
        </View>
          {historyList && historyList.length > 0 ? historyList.map((item, index)=>{
                return(
                  <View key={index}>
                    <TouchableOpacity onPress={() => {
                          Functions.getInstance().fireAdjustEvent("nd4sm7");
                          let properties = new MoEProperties();
                          properties.addAttribute("Archived Match tiles", true);
                          ReactMoE.trackEvent("Archived Match tiles", properties);
                          if(status == false){
                            status = true;
                            setScoreBoard(index);
                          }
                          else{
                            if(index == scoreBoard){
                              status = false;
                              setScoreBoard();
                            }
                            else{
                              status = true;
                              setScoreBoard(index);
                            }
                          }
                        
                        }}>
                      <View style={styles.container}>
                          <View style={styles.leftContainer}>
                            <Text style={styles.heading}>{item.title}</Text>
                            {/* <Text style={[styles.vsText,{fontSize : 12,bottom : 5}]}>{`₹ ${MatchType[(item.contestId)]}`}</Text> */}
                            <Text style={styles.subHeading}>
                              {Functions.getInstance().HistoryMatchDateTime(item.startTime)}
                            </Text>
                            
                            <View style={styles.row}>
                                <View style={{marginTop: 10}}>
                                  <View style={styles.plyrprfl}>
                                  {(item.contOneImg == "") || (item.contOneImg == "https://cdn.sportmonks.com") ? 
                                      <Image style={[styles.image, styles.mnimg,{marginTop : 5}]} source={TBC}/>
                                          :
                                      <Image
                                        style={styles.image}
                                        source={{uri: `https://cdn.sportmonks.com/images/cricket/teams/${item.contOneImg}`}}
                                      />
                                    }
                                  </View>
                                  <Text style={styles.teamName}>{item.contOneSnam}</Text>
                                </View>
                              {/* <Text style={styles.vsText}>VS</Text> */}
                              <Text style={[styles.vsText,{fontSize : 12,bottom : 5}]}>{`₹ ${MatchType[(item.contestId)]}`}</Text>
                              <View style={{marginTop: 10}}>
                                  <View style={styles.plyrprfl}>
                                  {(item.contTwoImg == "") || (item.contTwoImg == "https://cdn.sportmonks.com") ? 
                                      <Image style={[styles.image, styles.mnimg,{marginTop : 5}]} source={TBC}/>
                                          :
                                    <Image
                                      style={styles.image}
                                      source={{uri: `https://cdn.sportmonks.com/images/cricket/teams/${item.contTwoImg}`}}/>
                                  }
                                  </View>
                                  <Text style={styles.teamName}>{item.contTwoSnam}</Text>
                              </View>
                            </View>
                            
                          </View>
            
                          <View style={styles.rightContainer}>
                            <View style={{flex: 1, paddingVertical: 10}}>
                              <Text style={styles.runs}>{item.userOneScore}/{item.userTwoScore} Runs</Text>
                              
                              {item.winnStatus == "1" && (item.winnerId == userInfo.userId || item.winnerId == "0") ? 
                                  <View style={[styles.troffyImage,{marginLeft : 50, marginTop : 5,marginBottom : 5}]}>
                                    <Image style={styles.rightImage} source={Trophy} />
                                  </View>
                                  :
                                  <View style={[styles.troffyImage,{marginLeft : 50, marginTop : 5,marginBottom : 5}]}>
                                    <Image style={styles.rightImage} source={ThumbsLoose} />
                                </View>
                              }
            
                            </View>
                            <Image
                              style={{
                                height: 60,
                                top: 88,
                                right: 1,
                                width: 40,
                                marginEnd: 2,
                                marginBottom: 2,
                                alignSelf: 'flex-end',
                                resizeMode: 'center',
                                overflow: 'hidden',
                                position: 'absolute',
                              }}
                              source={TrophyBackground}
                            />
                            <View style={{flex: 1, paddingVertical: 10}}>
                            {item.winnStatus == "1" && (item.winnerId == userInfo.userId || item.winnerId == "0") ?
                              <Text style={[styles.amount, {color : secondary}]}>+Rs {item.amount}/-</Text>
                              :
                              <Text style={[styles.amount, {color : "#e79013"}]}>-Rs {item.amount}/-</Text>
                            }
                            </View>
                          </View>
                      </View>
                    </TouchableOpacity>
            
                    { scoreBoard == index ? 
                        <View style={[styles.cardView,{flexDirection:'row',paddingRight:40,}]}>
                                <View style={{maxWidth:'50%'}}>
                                {item.myPlayers && item.myPlayers.length > 0 ?
                                  <Text
                                    style={[
                                      styles.teamnm,
                                      styles.wnrtxt,
                                      styles.tmname,
                                      styles.plyrname,
                                      {color : '#A9A9A9',marginTop : 10}
                                    ]}>Your Team</Text>
                                  : ""}
                                  {item.myPlayers && item.myPlayers.length > 0 ? item.myPlayers.map((players, pindex)=>{
                                    return(
                                        <View key={pindex}
                                          style={{
                                            flex: 1,
                                            paddingHorizontal: 16,
                                            paddingVertical: 6,
                                            marginLeft : 26
                                          }}>
                                            {players.isCap == "1" || players.isvCap == "1" ? 
                                              <Text style={styles.cvctxt}>{players.isCap == "1" ? "C" : players.isvCap == "1" ? "Vc" : ""}</Text>
                                            : "" }
                                            <View style={[styles.plyrprflinfo]}>
                                                <View style={[styles.plyrprfl]}>
                                                  {players.faceImageId == "" ? <Image style={[styles.tmsdimg,{resizeMode:"contain"}]} source={require('../../../assets/images/dummy.png')}/> : 
                                                    <Image style={[styles.tmsdimg,{resizeMode:"contain"}]} source={{uri: `https://cdn.sportmonks.com/images/cricket/players/${players.faceImageId}`}} />
                                                  }
                                                </View>
                                                
                                                <View>
                                                    <Text
                                                        style={[
                                                            styles.teamnm,
                                                            styles.wnrtxt,
                                                            styles.tmname,
                                                            styles.plyrname,
                                                        ]}>
                                                        {players.name}
                                                    </Text>
                                                    
                                                    <Text style={[styles.ortxt, styles.plyrtm]}>Runs {players.score} {players.isCap == "1" ? "x 2" : players.isvCap == "1" ? "x 1.5" : ""}
                                                    </Text>
                                                </View>
                                                
                                            </View>
                                        </View>
                                    )
                                    
                                  }) : ""}
            
                                 </View>
                                 <View style={{maxWidth:'50%'}}>
                                 {item.openPlayers && item.openPlayers.length > 0 ?
                                 <Text  
                                    style={[
                                          styles.teamnm,
                                          styles.wnrtxt,
                                          styles.tmname,
                                          styles.plyrname,
                                          {color : '#A9A9A9',marginTop : 10,paddingLeft:30}
                                         
                                    ]}>Opponent Team</Text>
                                    :""}
                                    {item.openPlayers && item.openPlayers.length > 0 ? item.openPlayers.map((players, pindex)=>{
                                      return(
                                          <View key={pindex}
                                            style={{
                                              flex: 1,
                                              paddingHorizontal: 16,
                                              paddingVertical: 6,
                                              marginLeft : 26
                                            }}>
                                            {players.isCap == "1" || players.isvCap == "1" ? 
                                              <Text style={styles.cvctxt}>{players.isCap == "1" ? "C" : players.isvCap == "1" ? "Vc" : ""}</Text>
                                            : "" }

                                              <View style={[styles.plyrprflinfo]}>
                                                  <View style={[styles.plyrprfl]}>
                                                      {players.faceImageId == "" ? <Image style={[styles.tmsdimg,{resizeMode:"contain"}]} source={require('../../../assets/images/dummy.png')}/> :
                                                        <Image style={[styles.tmsdimg,{resizeMode:"contain"}]} source={{uri: `https://cdn.sportmonks.com/images/cricket/players/${players.faceImageId}`}} />
                                                      }
                                                  </View>
                                                  <View>
                                                      <Text
                                                          style={[
                                                              styles.teamnm,
                                                              styles.wnrtxt,
                                                              styles.tmname,
                                                              styles.plyrname,
                                                          ]}>
                                                          {players.name}
                                                      </Text>
                                                      <Text style={[styles.ortxt, styles.plyrtm]}>Runs {players.score} {players.isCap == "1" ? "x 2" : players.isvCap == "1" ? "x 1.5" : ""}</Text>
                                                  </View>
                                              </View>
                                          </View>
                                      )
                                      
                                    }) : ""}
                                  </View>
                        </View>
                        :
                        ""
                    }
                </View>
                )
          }) 
          
          :
          
          <View style={{marginTop:'50%',zIndex:222}}>
            <Image source={HistoryEmpty} style={{width : '100%',resizeMode:"contain",height:120,alignSelf:'center'}}/>
          </View>
          
          
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WithProgress(inject('UserStore')(observer(TotalResult)));
