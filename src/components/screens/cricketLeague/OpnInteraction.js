import UserStore from '../../stores/UserStore';
import { styles } from './crickLeagueStyles/CricketLeague.style';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, ImageBackground, Image, AppState } from 'react-native'
import React, { useEffect, useState } from 'react'
import ImageSlider from './common/ImageSlider'
import { SafeAreaView } from 'react-native-safe-area-context'
import MatchesList from './common/MatchesList';
import Functions from '../Functions';
import AsyncStorage from '@react-native-community/async-storage';
import Services from '../../../Services/Services';
import WithProgress from '../LoadingOverlay/WithProgress';
import { BannerImageBG } from '../../../assets';
import MatchBanner from './MatchBanner';
import { inject, observer } from 'mobx-react';


let selectedUserMatch = {}, selectedUserContest={};
const OpnInteraction = ({navigation, showProgress, hideProgress}) => {

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          selectedUserMatch = UserStore.selectedMatch;
          selectedUserContest = UserStore.selectedContest;
          getData();
        });
        // const handleAppStateChange = (nextAppState) => {
        //     if (nextAppState === 'active') {
        //       getData();
        //     }
        //   };
        //   AppState.addEventListener('change', handleAppStateChange);
        return () => {
            unsubscribe();
            // AppState.removeEventListener('change', handleAppStateChange);
        }

      }, ([navigation]));
    
    
    
    const getData= async() =>{
        showProgress();
        userInfo = JSON.parse(await AsyncStorage.getItem("player6-userdata"));
        Functions.getInstance().checkInternetConnectivity().then((state)=>{
            if(state == true){
                hideProgress();
                navigation.navigate("FindOpponent",{source : "EntryFee"});
            }
            else{
              hideProgress();
            }
        })
    }
    


    return (
        <SafeAreaView style={styles.root}>
            <StatusBar backgroundColor="#111111" />
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.mainContainer}>
          
          <MatchBanner selectedUserMatch = {selectedUserMatch}/>

          </View>
        </ScrollView>
      </SafeAreaView>
    );
};

export default WithProgress(inject('UserStore')(observer(OpnInteraction)));
