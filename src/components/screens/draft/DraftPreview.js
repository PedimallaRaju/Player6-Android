import { FlatList, SafeAreaView, Text, TouchableOpacity, View, ScrollView, StatusBar, AppState, Pressable } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Tab, TabView } from '@rneui/themed';
import { styles } from './Draft.styles';
import WithProgress from '../LoadingOverlay/WithProgress';
import AsyncStorage from '@react-native-community/async-storage';
import Functions from '../Functions';
import UserStore from '../../stores/UserStore';
import { Image } from 'react-native';
import Services from '../../../Services/Services';
import { TickIcon, dummyImage } from '../../../assets';
import ReactMoE,{
  MoEProperties,
} from "react-native-moengage"; 


let userInfo, myPic, userPF;

const DraftPreview = ({navigation,showProgress,hideProgress}) => {
  const gameDetails = UserStore.getselectedGameData();
  const [index, setIndex] = useState(0);
  const [yourList, setYourList] = useState([]);
  const [opponentList, setopponentList] = useState([]);
  const [opponentName, setopponentName] = useState('');
  const [opponentPic, setopponentPic] = useState('');
  const [isOpponent, setIsOpponent] = useState(false);
  const [strips, setstrips] = useState(["1","2","3","4","5","6","7","8","9","10","11","12"]);
  const [tb1color, settb1color] = useState('#279bff');
  const [tb2color, settb2color] = useState('');
  const [currentTime, setCurrentTime] = useState(Functions.getInstance().getTimer(gameDetails?.startTime));


  if(UserStore){
    const profile = UserStore.getuserPF();
    if(profile){
      myPic = profile?.replace(/['"]+/g, '');
    } 
  }

  useEffect(() => {
    const unsubscribe = navigation?.addListener('focus', () => {
      setIndex(0);
      getData();

    });

    return () =>{ 
      unsubscribe();
    }
  }, []);




  const getData = async() =>{
    showProgress();
    userInfo = JSON.parse(await AsyncStorage.getItem("player6-userdata"));
    userPF = JSON.parse(await AsyncStorage.getItem("player6-profile"));
    Functions.getInstance().offlineSelectedDraftPlayers().then((result) =>{
      setYourList(result); // orginal code
    });
      if(gameDetails?.userTwo == userInfo.userId){
        setIsOpponent(true);
        Services.getInstance().getAlreadyDraftedPlayers(userInfo.userId,gameDetails?.userOne, gameDetails.gameId, userInfo.accesToken).then((result)=>{
          hideProgress();
          if(result.status == 200){
            setopponentList(result.playerList);
            setopponentName(result.name);
            setopponentPic(result.profile);
          }
          else{
            hideProgress();
          }
        })
      }
      else{
        Services.getInstance().getAlreadyDraftedPlayers(userInfo.userId,gameDetails?.userTwo, gameDetails.gameId, userInfo.accesToken).then((result)=>{
          hideProgress();
          if(result.status == 200){
            setopponentList(result.playerList);
            setopponentName(result.name);
            setopponentPic(result.profile);
          }
          else{
            hideProgress();
          }
        })
      }

      
    
  }

  const handleButton1Press = () => {
    setIndex(0);
    settb1color('#279bff');
    settb2color('');
  };

  const handleButton2Press = () => {
    showProgress();
    settb1color('');
    settb2color('#279bff')
    setIndex(1);
    if(gameDetails?.userTwo == userInfo.userId){
      setIsOpponent(true);
      Services.getInstance().getAlreadyDraftedPlayers(userInfo.userId,gameDetails?.userOne, gameDetails.gameId, userInfo.accesToken).then((result)=>{
        hideProgress();
        console.log(result);
        if(result.status == 200){
          setopponentList(result.playerList);
          setopponentName(result.name);
          console.log(result.profile)
          setopponentPic(result.profile);
        }
        else{
          hideProgress();
        }
      })
    }
    else{
      Services.getInstance().getAlreadyDraftedPlayers(userInfo.userId,gameDetails?.userTwo, gameDetails.gameId, userInfo.accesToken).then((result)=>{
        hideProgress();
        console.log(result);
        if(result.status == 200){
          setopponentList(result.playerList);
          setopponentName(result.name);
          console.log(result.profile)
          setopponentPic(result.profile);
        }
        else{
          hideProgress();
        }
      })
    }
  };









  const playersData = (item) =>{
    return(
      <View style={styles.plyrmain}>
          <View style={styles.plyrinfo}>
              
                <View style={[styles.plyrprflinfo,styles.srtby]}>
                      <View style={styles.plyrprfl}>
                      {item.item.image == "" ? <Image style={styles.tmsdimg} source={require('../../../assets/images/dummy.png')}/>
                          :
                          <Image style={styles.tmsdimg} source={{ uri: `https://cdn.sportmonks.com/images/cricket/players/${item.item.image}` }}/>
                      }
                      </View>
                      <View style={styles.plyrtxt}>
                          <Text style={[styles.teamnm,styles.wnrtxt,styles.tmname,styles.plyrname]}>{item.item.name}</Text>
                          <Text style={[styles.ortxt,styles.plyrtm]}>{item.item.country}</Text>
                      </View>
                </View>
              
              <View style={[styles.srtby,styles.rnoptn]}>
              <View style={[styles.topo,styles.hdoptns]}>
                <Text style={styles.ortxt}>{item.item.avg}</Text>
              </View>
            </View>
            <View style={[styles.srtby,styles.rnoptn]}>
              <View style={[styles.topo,styles.hdoptns]}>
                <Text style={styles.ortxt}>{item.item.hs}</Text>
              </View>
            </View>
            <>
                {item.item.draftId !== "" ? (
                  <Pressable
                    style={[styles.srtby, styles.rnoptn]}
                    onPress={() => onPicked(item.item, false)}>
                    <View
                      style={[
                        styles.topo,
                        styles.hdoptns,
                        styles.pkop,
                        styles.alpkd,
                      ]}>
                      <Text style={styles.ortxt}>Picked</Text>
                    </View>
                  </Pressable>
                ) : (
                  <Pressable
                    style={[
                      styles.topo,
                      styles.hdoptns,
                      styles.pkop,
                      isOpponent ? styles.orngpick : {},
                    ]}
                    onPress={() => onPicked(item.item, true)}>
                    <Image
                      style={[styles.tmsdimg, styles.picon]}
                      source={PlusIcon}
                    />
                    <Text style={styles.ortxt}>Pick</Text>
                  </Pressable>
                )}
              </>
              

          </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar backgroundColor="#111111" />
      <View style={styles.exvw}>

        
          
      {index == 0 ? 
            <View style={styles.teamtab}>
              <TouchableOpacity
                onPress={()=>{
                  Functions.getInstance().fireAdjustEvent("fj3sft");
                  Functions.getInstance().fireFirebaseEvent("YourTeamPreview");
                  let properties = new MoEProperties();
                  properties.addAttribute("Preview Own Team", true);
                  ReactMoE.trackEvent("Preview", properties);
                  handleButton1Press();
                }} 
                  style={[styles.team,  { backgroundColor: '#279bff'}]}>
                <View >
                    <Text style={styles.teamTitle}>Your Team</Text>
                </View>
              </TouchableOpacity>

                <TouchableOpacity
                    
                  style={[styles.team,{backgroundColor: ''}]}
                  onPress={()=>{
                    Functions.getInstance().fireAdjustEvent("e9wkxm");
                    Functions.getInstance().fireFirebaseEvent("OpponentTeamPreview");
                    let properties = new MoEProperties();
                    properties.addAttribute("Preview Opponent Team", true);
                    ReactMoE.trackEvent("Preview", properties);
                    handleButton2Press()
                    }} >
                  <View >
                      <Text style={styles.teamTitle}>Opponent Team</Text>
                  </View>
                </TouchableOpacity>
            </View>

        :

        "" }

        {index == 1 ? 

            <View style={styles.teamtab}>
                <TouchableOpacity
                  onPress={()=>{
                    Functions.getInstance().fireAdjustEvent("fj3sft");
                    Functions.getInstance().fireFirebaseEvent("YourTeamPreview");
                    let properties = new MoEProperties();
                    properties.addAttribute("Preview Own Team", true);
                    ReactMoE.trackEvent("Preview", properties);
                    handleButton1Press();
                  }} 
                    style={[styles.team,  { backgroundColor:''}]}>
                  <View >
                      <Text style={styles.teamTitle}>Your Team</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                    
                  style={[styles.team,{backgroundColor:'#279bff'}]}
                  onPress={()=>{
                    Functions.getInstance().fireAdjustEvent("e9wkxm");
                    Functions.getInstance().fireFirebaseEvent("OpponentTeamPreview");
                    let properties = new MoEProperties();
                    properties.addAttribute("Preview Opponent Team", userInfo.userId);
                    ReactMoE.trackEvent("Preview", properties);
                    handleButton2Press();
                    }} >
                  <View >
                      <Text style={styles.teamTitle}>Opponent Team</Text>
                  </View>
                </TouchableOpacity>
            </View>
      : ""}






        {index == 0 ? 
          <View style={[styles.prenmain]}>
            <View style={[styles.tmmain]}>
              <View style={[styles.tmpsmain]}>
                  <View style={styles.tmlft}>
                  <View style={styles.tmsimg}>
                              {userPF?.profileImg == "https://s3.ap-south-1.amazonaws.com/player6sports/pl6Uplods/" ? 
                                <Image style={styles.tmsdimg} source={require('../../../assets/images/dummy.png')}/>
                                :
                                <Image style={styles.tmsdimg} source={ userPF ? {uri: myPic} : require('../../../assets/images/dummy.png')}/>
                              }
                    </View>
                    <Text style={[styles.teamnm,styles.wnrtxt,styles.tmname]}>{userPF ? userPF?.name : ""}</Text>
                  </View>
                  <View style={[styles.ptmr,styles.sltm]}> 
                    <Text style={[styles.teamnm,styles.tmrtxt,styles.pktmr]}>{currentTime}</Text>
                </View>
              </View>

              <View style={styles.ptkmain}>

                <View style={styles.pntlist}>

                <View style={styles.ptkmain}>
                  <View style={styles.pntlist}>
                      {strips?.map((item,index) =>
                            item ? (
                              <View
                              key={index}
                                style={[
                                  styles.pntitem,
                                  isOpponent ? styles.orngpick : styles.ppicked,
                                ]}>
                                <Image style={styles.wtick} source={TickIcon} />
                              </View>
                            ) : (
                              ""                                      
                            ),
                      )}
                  </View>
                  </View>
                

                </View>

              </View>                  
            </View>
            <FlatList
              data={yourList}
              keyExtractor={(item,index) => index}
              ListHeaderComponent={<View style={{ paddingTop: 10 }} />}
              ListFooterComponent={<View style={{ paddingBottom: 300 }} />}
              renderItem={playersData}
              />
              <Text>test it venkyyy</Text>
          </View>
          : ""}
          

          {index == 1 ? 
                    <View style={[styles.prenmain]}>
                    <View style={[styles.tmmain]}>
                      <View style={[styles.tmpsmain]}>
                          <View style={styles.tmlft}>
                          <View style={styles.tmsimg}>
                                      {opponentPic == "https://s3.ap-south-1.amazonaws.com/player6sports/pl6Uplods/" ? 
                                        <Image style={styles.tmsdimg} source={require('../../../assets/images/dummy.png')}/>
                                        :
                                        <Image style={styles.tmsdimg} source={{ uri: opponentPic}}/>
                                      }
                            </View>
                            <Text style={[styles.teamnm,styles.wnrtxt,styles.tmname]}>{userPF ? opponentName : ""}</Text>
                          </View>
                          <View style={[styles.ptmr,styles.sltm]}> 
                            <Text style={[styles.teamnm,styles.tmrtxt,styles.pktmr]}>{currentTime}</Text>
                        </View>
                      </View>
        
                      <View style={styles.ptkmain}>
        
                        <View style={styles.pntlist}>
        
                        <View style={styles.ptkmain}>
                          <View style={styles.pntlist}>
                              {strips?.map((item,index) =>
                                    item ? (
                                      <View
                                      key={index}
                                        style={[
                                          styles.pntitem,
                                          isOpponent ? styles.orngpick : styles.ppicked,
                                        ]}>
                                        <Image style={styles.wtick} source={TickIcon} />
                                      </View>
                                    ) : (
                                      ""                                      
                                    ),
                              )}
                          </View>
                          </View>
                        
        
                        </View>
        
                      </View>                  
                    </View>
                    <FlatList
                      data={opponentList}
                      keyExtractor={(item,index) => index}
                      ListHeaderComponent={<View style={{ paddingTop: 10 }} />}
                      ListFooterComponent={<View style={{ paddingBottom: 300 }} />}
                      renderItem={playersData}
                      />
                  </View>
          : ""}
      </View>
    </SafeAreaView>
  );
};

export default WithProgress(DraftPreview);
