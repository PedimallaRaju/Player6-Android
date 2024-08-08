import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {Like, Pitch,Player1, Player2, Player3, Player4, Player5, Player6} from '../../../assets';
import {Image} from 'react-native';
import {inject, observer} from 'mobx-react';
import {SafeAreaView} from 'react-native-safe-area-context';
import { styles } from './GoodLuck.styles';
import WithProgress from '../LoadingOverlay/WithProgress';
import AsyncStorage from '@react-native-community/async-storage';
import Services from '../../../Services/Services';
import UserStore from '../../stores/UserStore';
import EventSource from 'react-native-event-source';
import Functions from '../Functions';
import ReactMoE,{
  MoEProperties,
} from "react-native-moengage"; 


const renderContestContent = (
  imageName,
  playerName,
  text
) => {
  // let source =
  //   imageName == ''
  //     ? {
  //         uri: `https://cdn.sportmonks.com/images/cricket/players/${imageName}`,
  //       }
  //     : {
  //         uri: `https://cdn.sportmonks.com/images/cricket/players/${imageName}`,
  //       };
  return (
    <View style={styles.tmsitem}>
      <View style={[styles.tmsplyr,{marginBottom : 17}]}>
        {imageName == "" ?
          <Image style={[styles.tmsdimg, styles.plyrimg]} source={require('../../../assets/images/dummy.png')}/>
          : 
          <Image style={[styles.tmsdimg, styles.plyrimg]} source={{uri: `https://cdn.sportmonks.com/images/cricket/players/${imageName}`}} />
        }
        
        
      </View>
      {text && <Text style={styles.cvctxt}>{text}</Text>}
      <Text style={[styles.plyrnames]}>{playerName}</Text>
    </View>
  );
};



let userInfo, userPF,gameDetails;
const GoodLuck = ({navigation,showProgress,hideProgress}) => {
  const [playerList, setPlayerList] = useState([]);

  useEffect(() => {
    gameDetails = UserStore.selectedGameData;
    AsyncStorage.setItem("pl6-socket", 'null');
    getSelectedFinalPleyerList();
  }, []);



  const getSelectedFinalPleyerList = async()=>{
    showProgress();
    userInfo = JSON.parse(await AsyncStorage.getItem("player6-userdata"));
    userPF = JSON.parse(await AsyncStorage.getItem("player6-profile"));
    Services.getInstance().finalSixPlayers(userInfo.userId, gameDetails.gameId, userInfo.accesToken).then((result)=>{
      console.log(result);
      hideProgress();
      if(result.status == 200){
        setPlayerList(result.list);
      }
    })
  }




  return (
    <SafeAreaView edges={['bottom']} style={{flex: 1}}>
        <ScrollView>
        <ImageBackground source={Pitch} style={styles.backgroundImage}>
            <Text style={styles.textContent}> {userPF ? userPF?.name : ""} Team Selection</Text>
            <View style={styles.teamSelectionMainContainer}>
            <View
                style={[
                {
                    borderWidth: 1.5,
                    borderColor: '#fff',
                    borderRadius: 50,
                    paddingTop: 85,
                },
                ]}>
                <FlatList
                data={playerList}
                numColumns={2}
                renderItem={({item, index}) => {
                    return renderContestContent(
                    item?.imageId ?? '',
                    item?.name ?? '',
                    item?.isCap == "1" ? 'C' : item?.isvCap == "1" ? 'VC' : '',
                    );
                }}
                />
            <TouchableOpacity 
                  onPress={()=>{
                    Functions.getInstance().fireAdjustEvent("fg170o");
                    Functions.getInstance().fireFirebaseEvent("GoodLuckButton");
                    let properties = new MoEProperties();
                    properties.addAttribute("clicked", true);
                    ReactMoE.trackEvent("Good luck", properties);
                    navigation.navigate("RunningMatch");
                  }}
                >
              <View style={styles.gudlk}>
                <View>
                  <Text style={styles.buttonText}>Good luck</Text>
                 </View>
                 <View style={styles.like}>
                   <Image source={Like} style={{width:25,height:25}}/>
                </View>
                </View>
            </TouchableOpacity>
            </View>
            </View>
        

            <View style={styles.textcnt}>
                <Text style={[styles.textContent,style={color:'#fcff24'}]}> Stay Tuned</Text>
                <Text style={[styles.textContent]}> The match will begin shortly..</Text>
            </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WithProgress(inject('UserStore')(observer(GoodLuck)));
