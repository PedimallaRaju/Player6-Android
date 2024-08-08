import { styles } from './crickLeagueStyles/CricketLeague.style';
import { View, Text, ScrollView, TouchableOpacity, ImageBackground, Image, AppState, StatusBar, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BannerStrip, Gameon, Helmets1 } from '../../../assets';
import ImageSlider from './common/ImageSlider';
import UserStore from '../../stores/UserStore';
import AsyncStorage from '@react-native-community/async-storage';
import Services from '../../../Services/Services';
import Functions from '../Functions';
import WithProgress from '../LoadingOverlay/WithProgress';
import MatchBanner from './MatchBanner';
import { inject, observer } from 'mobx-react';


let userInfo, selectedUserMatch={}, gameDetails={};
const PlayersInteraction = ({navigation,showProgress,hideProgress,route}) => {
    let destination = route.params.destination;
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            selectedUserMatch = UserStore.selectedMatch;
            gameDetails = UserStore.opponentSocketData;
            getData();
        });
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.navigate('CricketLeague');
            return true;
          })
        
        return () => {
            unsubscribe();
            backHandler.remove();
        };
      }, ([navigation, selectedUserMatch,destination,gameDetails]));



    const getData = async () =>{
        selectedUserMatch = UserStore.selectedMatch;
        userInfo = JSON.parse(await AsyncStorage.getItem("player6-userdata"));
        redirectUserToToss();
        // setTimeout(function(){
        //     AsyncStorage.setItem("toss", "false");
        // },35000)
    }


    const redirectUserToToss = async() =>{
        userInfo = JSON.parse(await AsyncStorage.getItem("player6-userdata"));
        Functions.getInstance().checkInternetConnectivity().then((state)=>{
            if(state == true){
                showProgress();
                const obj = {
                    gameId: gameDetails.gameId
                }
                Services.getInstance().selectedGameDetails(obj, userInfo.userId, gameDetails.gameId, userInfo.accesToken).then((result)=>{
                    if(result.status == 200){
                        console.log("Interaction ::::: ",result)
                        UserStore.setselectedTeamDetails(result.data);
                        UserStore.setselectedGameData(result.data);
                        console.log("destination", destination);
                        setTimeout(()=>{
                            hideProgress();
                            if(destination == "FindOpponent"){
                                AsyncStorage.setItem("pl6-socket", "null");
                                navigation.navigate(`${destination}`, {source : "EntryFee"});
                            }
                            else if(destination == "PickTeamForToss"){
                                AsyncStorage.setItem("pl6-socket", "null");
                                navigation.navigate(`${destination}`);
                            }
                            else if(destination == "OpponentChooseToss"){
                                AsyncStorage.setItem("pl6-socket", "null");
                                navigation.navigate(`${destination}`);
                            }
                            else if(destination == "TossLoss"){
                                AsyncStorage.setItem("pl6-socket", "null");
                                navigation.navigate(`${destination}`);
                            }
                            else if(destination == "TossWon"){
                                AsyncStorage.setItem("pl6-socket", "null");
                                navigation.navigate(`${destination}`);
                            }
                            else if(destination == "BothTeamOpponentSelection"){
                                let d1 = UserStore.selectedGameData;
                                if(result.data.tossWinner == "0" || result.data.tossWinner == ""){
                                    navigation.navigate("CricketLeague");
                                }
                                else if(d1.tossWinner == "0" || d1.tossWinner == ""){
                                    navigation.navigate("CricketLeague");
                                }
                                else{
                                    AsyncStorage.setItem("pl6-socket", "false");
                                    // navigation.navigate("PlayerSelection",{screen : `${destination}`});
                                    navigation.navigate(`${destination}`);
                                }
                                
                            }
                            else if(destination == "RunningMatch"){
                                AsyncStorage.setItem("pl6-socket", "null");
                                // navigation.navigate("PlayerSelection",{screen : `${destination}`});
                                navigation.navigate(`${destination}`);
                            }
                            // navigation.navigate("PlayerSelection",{screen : 'BothTeamOpponentSelection'});
                        },1000)

                    }
                    else{
                        hideProgress();
                        Functions.getInstance().Toast("error", "Please try again later")
                    }
                })
            }
        })

    }






  return (
    <SafeAreaView style={styles.root}>
        <StatusBar backgroundColor="#111111" />
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.mainContainer}>
            <MatchBanner selectedUserMatch = {selectedUserMatch}/>
            <View style={[styles.gamecontainer, styles.open]}>
            <ImageBackground source={Gameon} style={styles.backgroundImage} imageStyle={styles.image}>
                {/* <View style={[styles.contentContainer, styles.gameOnContainer]}>
                    <View style={styles.bannerStripContainer}>
                        <Image style={styles.bannerImage} source={BannerStrip} />
                        <Text style={[styles.text, styles.selected, styles.bannerText]}>You Are In A Game Room!</Text>
                    </View>
                    <View style={styles.helmetContainer}>
                        <Image style={styles.helmetImage} source={Helmets1} />
                    </View>
                    <TouchableOpacity onPress={()=>{
                        redirectUserToToss();
                        
                        }}>
                        <View style={[styles.chooseGameContainer, styles.warm, styles.openGame]}>
                            <Text style={[styles.text, styles.playNow, styles.warmText]}>Open Game</Text>
                        </View>
                    </TouchableOpacity>
                </View> */}
            </ImageBackground>
        </View>

        </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default WithProgress(inject('UserStore')(observer(PlayersInteraction)))
