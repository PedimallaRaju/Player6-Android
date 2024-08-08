import UserStore from '../../stores/UserStore';
import { styles } from './crickLeagueStyles/CricketLeague.style';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, ImageBackground, Image, AppState, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import ImageSlider from './common/ImageSlider'
import { SafeAreaView } from 'react-native-safe-area-context'
import MatchesList from './common/MatchesList';
import Functions from '../Functions';
import AsyncStorage from '@react-native-community/async-storage';
import Services from '../../../Services/Services';
import WithProgress from '../LoadingOverlay/WithProgress';
import { BannerImageBG, CrossImage } from '../../../assets';
import MatchBanner from './MatchBanner';
import { inject, observer } from 'mobx-react';
import GameRulesPopup from '../customComponents/GameRulesPopup';
import ReactMoE,{
    MoEProperties,
  } from "react-native-moengage";
import { useRoute } from '@react-navigation/native';

let selectedUserMatch,selectedUserContest={}; 
const EntryFee = ({navigation, showProgress, hideProgress}) => {
    const [selectedContest, setSelectedContest] = useState('');
    const [upcomingMatches, setupcomingMatches] = useState([]);
    const [fee, setFee] = useState({});
    const [gameRules, setGameRules] = useState(false);
    const route = useRoute();
    const [maxReturn, setMaxReturn] = useState(route.params.maxReturn);
    const [maxRunDiff, setMaxRunDiff] = useState(route.params.maxRunDiff);    
    // console.log("selectedDat",selectedUserContest);
    





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
        AsyncStorage.removeItem("from");
        Functions.getInstance().offlineUpComingMatches().then(result => setupcomingMatches(result));
        Functions.getInstance().checkExpiration(userInfo.userId, userInfo.refToken, navigation);
        Functions.getInstance().checkInternetConnectivity().then((state)=>{
            if(state == true){
                Services.getInstance().getEntryFees(userInfo.userId, userInfo.accesToken, selectedUserContest.contestId,  selectedUserMatch.matchType).then((result)=>{
                    UserStore.setselectedMatchFee(result);
                    setFee(result);
                    hideProgress();
                })
            }
        })
    }
    


    const FindOpponent = () =>{
        let date = new Date();
        let properties = new MoEProperties();
        properties.addAttribute("Match", selectedUserMatch.title);
        properties.addAttribute("Contest", selectedUserContest.price);
        properties.addAttribute("Date", date.toLocaleDateString());
        properties.addAttribute("Time", date.toLocaleTimeString());
        ReactMoE.trackEvent("Play Now", properties);
        navigation.navigate("FindOpponent",{source : "EntryFee"});
    }


    const renderContestContent = (title, price) => {
        return (
            <>
                <Text style={[styles.chstxt, styles.erun]}>{title}</Text>
                <Text style={[styles.cnstxt, styles.eruntxt]}>{ price == undefined ? "" : `₹ ${price}`}</Text>
            </>
        )
    }


    return (
        <SafeAreaView style={styles.root}>
            <StatusBar backgroundColor="#111111" />
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.mainContainer}>
          
          <MatchBanner selectedUserMatch = {selectedUserMatch}/>

            <View style={styles.feecontainer}>
                <View style={styles.cntstmain}>
                    <Text style={[styles.chstxt, styles.slctd]}>You Selected</Text>
                    <View style={styles.entrylist}>
                        <View style={styles.entryitem}>
                            {renderContestContent('Each Run', selectedUserContest.price)}
                        </View>
                        <View style={[styles.entryitem, styles.afln]}>
                            {renderContestContent('Entry Fees', fee.price)}
                        </View>
                    </View>
                    <TouchableOpacity
                        disabled={selectedContest === undefined}
                        onPress={() => {
                            FindOpponent();
                        }}
                        >
                        <View style={styles.chscnst}>
                            <Text style={[styles.chstxt, styles.plynw]}>Play Now</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{setGameRules(true)}}>
                        <Text style={styles.termsCondition}>Game Rules</Text>
                    </TouchableOpacity>
                </View>
            </View>




            <View style={{backgroundColor: '#383838' ,marginTop:10,borderRadius:12,padding:10, marginBottom : 50}}> 
          <View style={{backgroundColor:'#525151',borderRadius:16,flexDirection:'row',justifyContent:'space-between',padding:5,paddingRight:14,paddingLeft:14}}>
            <Text style={[styles.chstxt,{color:"white", fontSize:11}]}>Maximum Return</Text>
            <Text style={[styles.chstxt,{color:"white", fontSize:11}]}>₹ {maxReturn}</Text>
          </View>
          <View style={{marginTop:5,backgroundColor:'#525151',borderRadius:16,flexDirection:'row',justifyContent:'space-between',padding:5,paddingRight:14,paddingLeft:14}}>
            <Text style={[styles.chstxt,{color:"white", fontSize:11}]}>Maximum Run Difference</Text>
            <Text style={[styles.chstxt,{color:"white", fontSize:11}]}>{maxRunDiff}</Text>
          </View>

          <View style={{display: 'flex',flexDirection:'row',justifyContent:"space-between", marginTop:10,backgroundColor:'#46361f',borderRadius:14,padding:5,paddingRight:14,paddingLeft:14}}>
            <View style={{borderRightColor : 'white', flexBasis: "50%",borderRightWidth: 0.8,borderStyle: "dashed"}}>
                <Text style={[{color:"white", fontSize:11,textAlign:'center',fontFamily: 'Poppins-SemiBold'}]}>Winnings</Text>
                <View style={{flexDirection : 'row', justifyContent : 'space-around', display: 'flex', alignItems : 'center', marginTop : 10, marginRight : 10}}>
                    <View style={{flexDirection : 'column', display: 'flex'}}>
                        <Text style={[{color:"white", fontSize:11,textAlign:'left',fontFamily: 'Poppins-SemiBold'}]}>Runs</Text>
                        <Text style={[{color:"white", fontSize:11,textAlign:'left',fontFamily: 'Poppins-SemiBold'}]}>Difference</Text>
                    </View>
                    <View >
                      <Image source={CrossImage} style={{width : 15, height : 15}}/>
                    </View>
                    <View style={{flexDirection : 'column', display: 'flex'}}>
                        <Text style={[{color:"white", fontSize:11,textAlign:'right',fontFamily: 'Poppins-SemiBold'}]}>Contest</Text>
                        <Text style={[{color:"white", fontSize:11,textAlign:'right',fontFamily: 'Poppins-SemiBold'}]}>Multiplier</Text>
                    </View>
                  </View>
            </View>
            
            <View style={{display: 'flex', marginTop : 10}}>
                <Text style={[{color:"white", fontSize:11,textAlign:'center',fontFamily: 'Poppins-SemiBold'}]}>50% chance of</Text>
                <Text style={[{color:"white", fontSize:11,textAlign:'center',fontFamily: 'Poppins-SemiBold'}]}>winning everytime</Text>
                <Text style={[{color:"white", fontSize:11,textAlign:'center',fontFamily: 'Poppins-SemiBold'}]}>you play</Text>
            </View>
          </View>
        </View>







                            
            <MatchesList
                    title="Upcoming Matches"
                    showMore={false}
                    data={[]}
                    extraData={[]}
                    onPressMatch={() => {}}
                />
          </View>


          {gameRules ? 
            <GameRulesPopup
                onClose={() => setGameRules(false)} 
            />
            : "" }
        </ScrollView>
      </SafeAreaView>
    );
};

export default WithProgress(inject('UserStore')(observer(EntryFee)));
