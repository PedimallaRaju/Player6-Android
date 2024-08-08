import React, { useEffect, useState, useRef } from 'react';
import { Text, View, Image, Pressable, SafeAreaView, FlatList, StatusBar, AppState } from 'react-native';
import DraggableFlatList, {ScaleDecorator} from 'react-native-draggable-flatlist';
import {styles} from './Draft.styles';
import UserStore from '../../stores/UserStore';
import AsyncStorage from '@react-native-community/async-storage';
import Functions from '../Functions';
import WithProgress from '../LoadingOverlay/WithProgress';
import {PreviewIcon, SaveIcon, TickIcon, dummyImage} from '../../../assets'
import Services from '../../../Services/Services';
import { secondary } from '../../../style';
import DraftSuccessPopup from './DraftSuccessPopup';
import ReactMoE,{
  MoEProperties,
} from "react-native-moengage"; 



let userInfo, myPic, userPF;
const DragNDrop = ({navigation, showProgress, hideProgress}) => {
  const gameDetails = UserStore.getselectedGameData();
  const [draftPlayers, setDraftPlayers] = useState([]);
  const [selectedPlayer, updatePlayer] = useState([]);
  const [isOpponent, setIsOpponent] = useState(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [isPreviewDisabled, setisPreviewDisabled] = useState(true);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(Functions.getInstance().getTimer(gameDetails?.startTime));
  const timerRef = useRef(null);
  const [strips, setstrips] = useState(["1","2","3","4","5","6","7","8","9","10","11","12"]);
  const [cDragId, setCDragId] = useState('');
  const [dragShadowColor, setDragShadowColor] = useState(secondary);



  if(UserStore){
    const profile = UserStore.getuserPF();
    if(profile){
      myPic = profile?.replace(/['"]+/g, '');
    } 
  }



  useEffect(() => {
    // timerRef.current = setInterval(() => {
    //   setCurrentTime(Functions.getInstance().getTimer(gameDetails?.startTime));
    // }, 1000);

    // return () => {
    //   clearInterval(timerRef.current);
    // };
  }, [cDragId]);


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });
    // const handleAppStateChange = (nextAppState) => {
    //   if (nextAppState === 'active') {
    //     getData();
    //   }
    // };
    // AppState.addEventListener('change', handleAppStateChange);
    return () =>{ 
      unsubscribe();
      // AppState.removeEventListener('change', handleAppStateChange);
    }
  }, ([]));


  const getData = async() =>{
    showProgress();
    userInfo = JSON.parse(await AsyncStorage.getItem("player6-userdata"));
    userPF = JSON.parse(await AsyncStorage.getItem("player6-profile"));
    // Functions.getInstance().checkExpiration(userInfo.userId, userInfo.refToken, navigation);
      if(gameDetails?.userTwo == userInfo.userId){
        setIsOpponent(true);
        setDragShadowColor('#e79013');
      }
        Services.getInstance().getAlreadyDraftedPlayers(userInfo.userId,userInfo.userId, gameDetails.gameId, userInfo.accesToken).then((result)=>{
          hideProgress();
          console.log("Drag and Drop Page Get API: ", result);
          if(result.status == 200){
            console.log(result);
            AsyncStorage.setItem("Selected-Draft-Players", JSON.stringify(result.playerList));
            Functions.getInstance().offlineSelectedDraftPlayers().then((result) =>{
              setDraftPlayers(result);
              defaultPlayersData(result); 
              // hideProgress();     
            });
            if(result.isDrafted == true){
              setisPreviewDisabled(false);
            }
            else{
              setisPreviewDisabled(true);
            }
            Functions.getInstance().Toast("success", "Arrange players in priority with drag-and-drop, then save")
          }
          else{
            Functions.getInstance().Toast("error", "Please try again later")
          }

        }) 
  }



  const defaultPlayersData = (array) =>{
    let x = [];
      array.forEach(element => {
        if(element.draftId !== ""){
          x.push(element);
          updatePlayer(x);
        }
      });
  }



  const dragCompleted = (sData) =>{
    setDraftPlayers(sData);
    updatePlayer(sData);
    setIsSaveDisabled(false);
    AsyncStorage.setItem("Selected-Draft-Players", JSON.stringify(sData));
    setCDragId('');
  }

  const showDraftPreview = () =>{
    Functions.getInstance().fireAdjustEvent("yhtn39");
    Functions.getInstance().fireFirebaseEvent("DraftPreviewButton");
    let properties = new MoEProperties();
    properties.addAttribute("Preview Own Team", true);
    ReactMoE.trackEvent("Preview", properties);
    navigation.navigate("DraftPreview");
    // navigation.navigate("Dpreview");
  }



  const closeSuccessPopup = () =>{
    Functions.getInstance().fireAdjustEvent("j2wayg");
    Functions.getInstance().fireFirebaseEvent("DraftSuccessOkButton");
    setIsSaveDisabled(true);
    setisPreviewDisabled(false);
    setIsSuccessVisible(false);
  }



  const savingTheDraft = () =>{
    showProgress();
    Functions.getInstance().fireAdjustEvent("5x9265");
    Functions.getInstance().fireFirebaseEvent("DraftSave");
    let properties = new MoEProperties();
    properties.addAttribute("clicked", userInfo.userId);
    ReactMoE.trackEvent("Save", properties);
    let orderedData = [];
    const newDraft = draftPlayers;
    newDraft.forEach((element, index) => {
      const req = {
        orderId: index+1,
        playerId: element.playerId,
        draftId: element.draftId
      }
      orderedData.push(req);
    });
    console.log(orderedData);

        const obj = {
          gameId: gameDetails.gameId,
          playerList : orderedData
        }
        console.log("Drag N Drop payload",obj)
        Services.getInstance().saveDraft(obj, userInfo.userId, gameDetails.gameId, userInfo.accesToken).then((result)=>{
          hideProgress();
          console.log(result);
          if(result.status == 200){
            setIsSuccessVisible(true);
          }else{
            Functions.getInstance().Toast("error", "Authentication error, Please try again later");
          }
        })
      }
  













  // onTouchStart={drag}


  const renderItem = ({ item, index, drag, isActive }) => {
    const handleLongPress = () => {
      setCDragId(item.playerId);
      drag();
    };

    return (
        <Pressable onLongPress={handleLongPress} >
        <View style={[styles.plyrmain,{borderColor : cDragId == item.playerId ? dragShadowColor : '', borderWidth : cDragId == item.playerId ? 2 : 0}]}>
            <View style={styles.plyrinfo}>
                
                  <View style={[styles.plyrprflinfo,styles.srtby]}>
                        <View style={styles.plyrprfl}>
                        {item.image == "" ? <Image style={styles.tmsdimg} source={require('../../../assets/images/dummy.png')}/>
                          :
                            <Image style={styles.tmsdimg} source={{ uri: `https://cdn.sportmonks.com/images/cricket/players/${item.image}` }}/>
                        }
                        </View>
                        <View style={styles.plyrtxt}>
                            <Text style={[styles.teamnm,styles.wnrtxt,styles.tmname,styles.plyrname]}>{item.name}</Text>
                            <Text style={[styles.ortxt,styles.plyrtm]}>{item.country}</Text>
                        </View>
                  </View>
                
                <View style={[styles.srtby,styles.rnoptn]}>
                <View style={[styles.topo,styles.hdoptns]}>
                  <Text style={styles.ortxt}>{item.avg}</Text>
                </View>
              </View>
              <View style={[styles.srtby,styles.rnoptn]}>
                <View style={[styles.topo,styles.hdoptns]}>
                  <Text style={styles.ortxt}>{item.hs}</Text>
                </View>
              </View>
              <>
                    <Pressable
                      style={[styles.srtby, styles.rnoptn]}>
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
                  
                </>

            </View>
        </View>
        </Pressable>
    );
  };
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar backgroundColor="#111111" />
      {/* <ScrollView style={[styles.exvw, {flex: 1}]} keyboardShouldPersistTaps="always" scrollEnabled = {true}> */}

        <View style={[styles.tmslcnmain]}>
            <View style={styles.tmmain}>
                  <View style={styles.tmpsmain}>
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

                      <View style={[styles.tmlft,styles.tmrht]}>
                              
                        <Pressable
                          disabled={isPreviewDisabled}
                          style={styles.prvmain}
                          onPress={() => {showDraftPreview()}}>
                          <View
                            style={[
                              styles.psimg,
                              isPreviewDisabled
                                ? {}
                                : {
                                  backgroundColor: secondary,
                                  borderColor: secondary,
                                },
                            ]}>
                            <Image style={styles.tmsdimg} source={PreviewIcon} />
                          </View>
                          <Text
                            style={[
                              styles.teamnm,
                              styles.wnrtxt,
                              styles.tmname,
                              styles.prvtxt,
                            ]}>
                            Preview
                          </Text>
                        </Pressable>


                        <Pressable
                          disabled={isSaveDisabled}
                          style={[styles.prvmain, styles.sc]}
                          onPress={() => savingTheDraft()}>
                          <View
                            style={[
                              styles.psimg,
                              isSaveDisabled
                                ? {backgroundColor: ''}
                                : {
                                  backgroundColor: secondary,
                                  borderColor: secondary,
                                },
                            ]}>
                            <Image style={styles.tmsdimg} source={SaveIcon} />
                          </View>
                          <Text
                            style={[
                              styles.teamnm,
                              styles.wnrtxt,
                              styles.tmname,
                              styles.prvtxt,
                              {textAlign:'center'}
                            ]}>
                            Save
                          </Text>
                        </Pressable>
                        
                              
                      </View>


                  </View>

                  <View style={styles.ptkmain}>

                    <View style={[styles.pntlist,{flexBasis : '68%'}]}>

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

                    <View style={[styles.ptmr,styles.sltm]}> 
                        <Text style={[styles.teamnm,styles.tmrtxt,styles.pktmr]}>{currentTime}</Text>
                    </View>
                  </View>
                  
            </View>
            

            <View style={[styles.tmarmain,styles.plyrhd]}>
                <View style={[styles.tmarlist,styles.plyrshd]}>
                  <View style={styles.srtby}>
                    <View style={[styles.topo,styles.hdoptns]}>
                      <Text style={styles.ortxt}>Players</Text>
                    </View>
                  </View>
                  <View style={[styles.srtby,styles.rnoptn]}>
                    <View style={[styles.topo,styles.hdoptns]}>
                      <Text style={styles.ortxt}>Avg</Text>
                    </View>
                  </View>
                  <View style={[styles.srtby,styles.rnoptn]}>
                    <View style={[styles.topo,styles.hdoptns]}>
                      <Text style={styles.ortxt}>HS</Text>
                    </View>
                  </View>
                  <View style={[styles.srtby,styles.rnoptn]}>
                    <View style={[styles.topo,styles.hdoptns]}>
                      <Text style={styles.ortxt}>Pick</Text>
                    </View>
                  </View>
                </View>
            </View>


        {draftPlayers && draftPlayers.length > 0 ? 
          <DraggableFlatList
                nestedScrollEnabled={true}
                scrollPercent={5}
                data={draftPlayers}
                renderItem={renderItem}
                ListFooterComponent={<View style={{ paddingBottom: 300 }} />}
                keyExtractor={(item,index) => index}
                onDragEnd={({ data }) => {
                  Functions.getInstance().fireAdjustEvent("1yruhc");
                  Functions.getInstance().fireFirebaseEvent("DraftDragNDropCard");
                  let properties = new MoEProperties();
                  properties.addAttribute("Sequencing Draft", true);
                  ReactMoE.trackEvent("Sequencing Draft", properties);
                  dragCompleted(data);
                }}
              />
         : ""}
        </View>
      {/* </ScrollView> */}


    {isSuccessVisible ? 
              <DraftSuccessPopup
                isVisible={isSuccessVisible} closePopup = {closeSuccessPopup}
              /> 
              :
              ""
            }


    </SafeAreaView>

  );
};

export default WithProgress(DragNDrop);