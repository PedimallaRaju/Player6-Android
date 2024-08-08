import {ActivityIndicator, AppState, Image,Modal,ScrollView,TouchableOpacity,View} from 'react-native';
import { Text } from 'react-native';
import { BorderLine2, England, India, Player1, Player2, Player3, Player4, Player5, Player6, Player7, PlusIcon, PlusIcon2, TickIcon } from '../../../assets';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { GREEN, ORANGE, secondary } from '../../../style';
import { styles } from './BothTeamSelection.styles';
import WithProgress from '../LoadingOverlay/WithProgress';
import { inject, observer } from 'mobx-react';
import LoadingPopup from './LoadingPopup';
import UserStore from '../../stores/UserStore';
import AsyncStorage from '@react-native-community/async-storage';
import Functions from '../Functions';
import Services from '../../../Services/Services';
import EventSource from 'react-native-event-source';
import { measureConnectionSpeed } from 'react-native-network-bandwith-speed';
import ReactMoE,{
    MoEProperties,
  } from "react-native-moengage"; 



let gameDetails, userInfo, myPic, userPF, currentSystemTime, teamACount=0, teamBCount=0, selected = false, plseleccted = false,socketTriggered, twentyFiveSeconds, thirtySeconds,globalTimeInterval,sec25int, playerIdsData=[], sec25TimeChange, preDefinedPlayers = [], nextTime, nextEndTime,serveCurTime, myStatus, startTimeClear,tossWinnerLastPic = {},lateDelayClear,netSpeedInterval, gb, reRequestSeconds=0;
const BothTeamOpponentSelection = ({ navigation, showProgress, hideProgress }) => {
    if(UserStore){
        const profile = UserStore.getuserPF();
        if(profile){
          myPic = profile?.replace(/['"]+/g, '');
        } 
      }
    const [currentTime, setCurrentTime] = useState('00:27');
    const [teamA, setTeamA] = useState([]);
    const [teamB, setTeamB] = useState([]);
    const [teamABench, setTeamABench] = useState([]);
    const [teamBBench, setTeamBBench] = useState([]);
    const [myDefaultPlayers, setMyDefaultPlayers] = useState([]);
    const [opponentName, setopponentName] = useState('');
    const [opponentPic, setopponentPic] = useState('');
    const [loading, setLoading] = useState(false);
    const [opEvent, setopEvent] = useState(false);
    const [isOpponent, setIsOpponent] = useState(false);
    const [reloadSeconds, setReloadSeconds] = useState(0);
    let selectionTime = "";
    let newSocket;









    const updateTime = () => {
        console.log("//////////////// globalTimeInterval ///////////////////////")
        setCurrentTime((prevTime) => {
            getCurrentTime();
            const [minutes, seconds] = prevTime.split(':').map(Number);
            let newMinutes = minutes;
            let newSeconds = seconds - 1;

            if (newSeconds < 0) {
                newMinutes -= 1;
                newSeconds = 59;
            }

            if (newMinutes < 0) {
                newMinutes = 0;
                newSeconds = 0;
            }
            sec25TimeChange = `${String(newMinutes).padStart(2, '0')}:${String(newSeconds).padStart(2, '0')}`;
            setReloadSeconds(newSeconds);
            reRequestSeconds = newSeconds;
            return `${String(newMinutes).padStart(2, '0')}:${String(newSeconds).padStart(2, '0')}`;
        });
    };



    const getCurrentTime = () =>{
        var currentDate = new Date();
        // Get the components of the date and time
        var year = currentDate.getUTCFullYear();
        var month = ('0' + (currentDate.getUTCMonth() + 1)).slice(-2); 
        var day = ('0' + currentDate.getUTCDate()).slice(-2);
        var hours = ('0' + currentDate.getUTCHours()).slice(-2);
        var minutes = ('0' + currentDate.getUTCMinutes()).slice(-2);
        var seconds = ('0' + currentDate.getUTCSeconds()).slice(-2);
        currentSystemTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
        return currentSystemTime;
    }




    useEffect(() => {

        const handleAppStateChange = AppState.addEventListener('change', (nextAppState) => {
            if (nextAppState === 'active') {
                // active code
              }
              else{
                navigation.navigate("MyGames")
              }
            return true;
          })
       
        return () => {
        handleAppStateChange.remove()
        };
      }, []);



    


    useEffect(() => {
        const unsubscribe = navigation?.addListener('focus', () => {
            setTeamA([]);
            setTeamB([]);
            setTeamABench([]);
            setTeamBBench([]);
            playerIdsData = [];
            gameDetails = UserStore.selectedGameData;
            AsyncStorage.setItem("p6data", "false");
            AsyncStorage.setItem("pl6-socket", "false");
            getNetworkBandwidth();
            callSocket();
            getData();
            
        })
        return () => {
            if(lateDelayClear){
                clearTimeout(lateDelayClear);
            }
            if(startTimeClear){
                clearTimeout(startTimeClear);
            }
            if (socketTriggered) {
                clearInterval(socketTriggered);
            }
            if(sec25int){
                clearInterval(sec25int);
            }
            if(globalTimeInterval){
                clearInterval(globalTimeInterval);
            }
            hideProgress();
            setLoading(false);
            newSocket.removeAllListeners();
            newSocket.close();
            unsubscribe();

        }
    }, []);









    const getNetworkBandwidth = async() =>{
        netSpeedInterval = setInterval(()=>{
          internetSpeed();
        },1000)
      }
    
    
      const internetSpeed = async()=>{
        try {
          networkSpeed = await measureConnectionSpeed();
        //   console.log(networkSpeed); // Network bandwidth speed
          if(networkSpeed){
            const cRoute = navigation.getState()?.routes;
            if(cRoute[cRoute.length - 1].name == 'BothTeamOpponentSelection'){
                if((networkSpeed.metric == 'MBps') || (networkSpeed.metric == 'mbps') || (networkSpeed.metric == 'MBPS')){
                    const myIntSpeed = parseInt(networkSpeed.speed);
                    gb = myIntSpeed + "mb";
                    if((myIntSpeed * 1000) <= 1000 ){
                        redirectUserToNoInternet();
                    }
                    if(((myIntSpeed * 1000) < 8000) && ((myIntSpeed * 1000) > 3000)){
                        // Functions.getInstance().Toast("error", "Your network is weak.Less than " + gb);
                    }
                }
                if((networkSpeed.metric == 'KBps') || (networkSpeed.metric == 'kbps') || (networkSpeed.metric == 'KBPS')){
                    const myIntSpeed = networkSpeed.speed;
                    gb = myIntSpeed + "kb";
                    if(myIntSpeed <= 1000 ){
                        redirectUserToNoInternet();
                    }
                    if((myIntSpeed < 8000) && (myIntSpeed > 3000)){
                        // Functions.getInstance().Toast("error", "Your network is weak.Less than " + gb);
                    }
                }
            }
            else{
                if(netSpeedInterval){
                    clearInterval(netSpeedInterval);
                }
                setLoading(false);
                console.log("Netchecker is closed");


            }
          }
        } catch (err) {
          console.log(err);  
        }
      }



      const redirectUserToNoInternet = () =>{
        if(netSpeedInterval){
            clearInterval(netSpeedInterval);
        }
        if(lateDelayClear){
            clearTimeout(lateDelayClear);
        }
        if(startTimeClear){
            clearTimeout(startTimeClear);
        }
        if (socketTriggered) {
            clearInterval(socketTriggered);
        }
        if(sec25int){
            clearInterval(sec25int);
        }
        if(globalTimeInterval){
            clearInterval(globalTimeInterval);
        }
        navigation.navigate("InternetChecker");
      }



    const getData = async() =>{
        showProgress();
        userInfo = JSON.parse(await AsyncStorage.getItem("player6-userdata"));
        userPF = JSON.parse(await AsyncStorage.getItem("player6-profile"));
        callPlayer11Data().then(
            function(){
                let cTime = getCurrentTime();
                if(selectionTime > cTime){
                    console.log(currentTime);
                    console.log("ctime is less than starttime"); 
                    let clearIntTime = setInterval(function(){
                        cTime = getCurrentTime();
                        if(cTime > selectionTime){
                            clearInterval(clearIntTime);
                            globalTimeInterval = setInterval(updateTime, 1000);
                            process1();
                        }
                    },1000)
        
                }
                else{
                    showProgress();
                    console.log("selectionTime : ", selectionTime);
                    console.log("ctime > starttime"); 
                    console.log("cTime : ",cTime);
                    console.log("myStatus: ",myStatus);
                    console.log("nextTime: ",nextTime);
                    console.log("nextEndTime: ",nextEndTime);
                    console.log(currentTime);
                    if(myStatus == "Open"){
                        if((cTime > nextTime) && (cTime < nextEndTime)){
                            let seconds = Functions.getInstance().findTimeDifference(cTime, nextEndTime);
                            console.log("seconds : ", seconds);
                            if(seconds <= 15){
                                console.log("myStatus == Open, IF ok (cTime > nextTime) && (cTime < nextEndTime)");
                                showProgress();
                                startTimeClear = setTimeout(function() {
                                    autoSubmit25Sec();
                                }, (seconds - 4) * 1000);
                                socketTriggered = setInterval(offlineSocketVerify, (31000 + (seconds * 1000)));

                            }
                            else{
                                console.log("myStatus == Open, Else");
                                lateDelayClear = setTimeout(function() {   
                                    hideProgress();
                                    setLoading(false);
                                }, 5000);           
                                setCurrentTime("00:"+seconds);
                                console.log("Timess");
                                if(globalTimeInterval){
                                    console.log("clearing the global time interval at 244");
                                    clearInterval(globalTimeInterval);
                                }                                
                                globalTimeInterval = setInterval(updateTime, 1000);
                                console.log("globalTimeInterval : ",currentTime);
                                console.log("execution Timess");
                                sec25int = setInterval(autoSubmit25Sec, (seconds *1000) );
                                console.log("New start Timess");
                            }
                        }
                        else{
                            console.log(`Time is out of range is OK only for Opponent ${userInfo.userId}`);
                            let seconds = Functions.getInstance().findTimeDifference(cTime, nextTime);
                            console.log(seconds);
                            startTimeClear = setTimeout(function(){
                               
                                callPlayer11Data().then(
                                    function(){
                                        hideProgress();
                                        setLoading(false);
                                        sec25int = setInterval(autoSubmit25Sec, 27000);
                                        setCurrentTime("00:26");
                                        globalTimeInterval = setInterval(updateTime, 1000);   
                                    }
                                ).catch(
                                    function(){
                                        console.log("Line ConFinalSelection")
                                    }
                                );

                            }, ((seconds+5) * 1000))
                        }
                    }
                    else{
                        const routes = navigation.getState()?.routes;
                        if(routes[routes.length - 1].name == 'BothTeamOpponentSelection'){
                            console.log("Redirecting user to Score Board page from 169 Line");
                            hideProgress();
                            setLoading(false);
                            if(startTimeClear){
                                clearTimeout(startTimeClear);
                            }
                            if (socketTriggered) {
                                clearInterval(socketTriggered);
                            }
                            if(sec25int){
                                clearInterval(sec25int);
                            }
                            if(globalTimeInterval){
                                clearInterval(globalTimeInterval);
                            }
                            navigation.navigate('RunningMatch');
                        }
                    }
                       

                }
            }    
        ).catch(
            function(){
                console.log("Period value is false");
                hideProgress();
            }
        );
    }




    const callSocket = async() =>{
        userInfo = JSON.parse(await AsyncStorage.getItem("player6-userdata"));
             newSocket = new EventSource(`https://www.xhtmlreviews.com/api-player6/1.0/auth/User/${userInfo.userId}/watchEvents`);
            // newSocket = new EventSource(`https://apidemo.player6sports.com/1.0/auth/User/${userInfo.userId}/watchEvents`);
            // newSocket = new EventSource(`https://apiqa.player6sports.com/1.0/auth/User/${userInfo.userId}/watchEvents`);
            // newSocket = new EventSource(`https://api.player6sports.com/1.0/auth/User/${userInfo.userId}/watchEvents`);



            // newSocket.addEventListener("ping", (event) => {console.log("ping socket")});




            newSocket.addEventListener("conFnalSel", (event) => {
                const routes = navigation.getState()?.routes;
                console.log(routes);
                console.log(JSON.parse(event.data));
                if(routes[routes.length - 1].name == 'BothTeamOpponentSelection'){
                    console.log(`////////////////////////////////////// Final Players Socket Data ${userInfo.userId} ////////////////////////////////////////`);
                    let ds = JSON.parse(event.data);
                    let selData = ds.playerSel;
                    selData = selData.playerId;
                    console.log("Line 195 :::::::::::: ",selData);
                    console.log("playerIdsData : ",playerIdsData);
                    let index = playerIdsData.indexOf(selData);

                    if(ds.matchId == gameDetails.matchId && gameDetails.gameId == ds.contestId && index == -1){
                        plseleccted = false;
                        playerIdsData.push(selData);
                        conFinalSelection(event);
                    }
                }
            });
            
            return () => {
                newSocket.removeAllListeners();
                newSocket.close();
              };

    }


    const conFinalSelection = async(event) =>{
        // setopEvent(true);
        const plSocket = await AsyncStorage.getItem('pl6-socket');
        if(plSocket == "false"){
                if(startTimeClear){
                    clearTimeout(startTimeClear);
                }
                if (socketTriggered) {
                    clearInterval(socketTriggered);
                }
                if(sec25int){
                    clearInterval(sec25int);
                }
                if(globalTimeInterval){
                    clearInterval(globalTimeInterval);
                }
                
                const p6Data =  JSON.parse(event.data);
                if(p6Data.userId == userInfo.userId){
                    console.log(`<<<<<<<<<<<<<<<< Else is executed from user: ${userInfo.userId} My Own Socket Doing Nothing >>>>>>>>>>>>>>>>>>`);
                    setLoading(true);
                    hideProgress();
                    if(teamACount == 6){
                        setLoading(false);
                        showProgress();
                        if(startTimeClear){
                            clearTimeout(startTimeClear);
                        }
                        if (socketTriggered) {
                            clearInterval(socketTriggered);
                        }
                        if(sec25int){
                            clearInterval(sec25int);
                        }
                        if(globalTimeInterval){
                            clearInterval(globalTimeInterval);
                        }                
                    }
                    else{
                        socketTriggered = setInterval(offlineSocketVerify, 31000);
                    }
                }
                else{
                    console.log(`<<<<<<<<<<<<<<<< Else is executed from user: ${userInfo.userId} >>>>>>>>>>>>>>>>>>`);
                    callPlayer11Data().then(
                        function(){
                            console.log(`--------------------> Opponent Socket is triggereddddddd from user : ${userInfo.userId} -------------------->`);
                            if(startTimeClear){
                                clearTimeout(startTimeClear);
                            }
                            if (socketTriggered) {
                                clearInterval(socketTriggered);
                            }
                            if(sec25int){
                                clearInterval(sec25int);
                            }
                            if(globalTimeInterval){
                                clearInterval(globalTimeInterval);
                            } 
                            hideProgress();
                            setLoading(false);
                            sec25int = setInterval(autoSubmit25Sec, 27000);
                            setCurrentTime("00:26");
                            globalTimeInterval = setInterval(updateTime, 1000);
                            
                        }
                    ).catch(
                        function(){
                            console.log("Line ConFinalSelection")
                        }
                    );
                }
        }
        else{
            hideProgress();
            setLoading(false);
            console.log("pl6-socket local storage value is null so socket will not be considered");
        }
    }









    const callPlayer11Data = () =>{
        const myPromise = new Promise((resolve, reject)=>{
            const sysTime = getCurrentTime();
            Services.getInstance().getPlayersData(userInfo.userId, gameDetails.gameId, userInfo.accesToken, sysTime).then((result)=>{
                console.log(`------------------------->    Players List from user ${userInfo.userId} <-------------------------------------`);
                console.log(result);
                preDefinedPlayers = [];
                if(result.status == 200){
                    selectionTime = result.selStartTm;
                    nextTime = result.nxtTime;
                    nextEndTime = result.nxtTimeEnd;
                    serveCurTime = result.serveCurTime;
                    myStatus = result.nxtOpt;
                    setTeamA(result.teamA11);
                    setTeamB(result.teamB11);
                    setTeamABench(result.teamABan);
                    setTeamBBench(result.teamBBan);
                    setopponentName(result.opnName);
                    setopponentPic(result.opnImg);
                    setMyDefaultPlayers(result.myPlayers);
                    tossWinnerLastPic = result.oponLPlayer.playerId;
                    if((result.myPlayers).length > 0){
                        preDefinedPlayers = ((result.myPlayers)[0]);
                    }
                    filterTheSelectedData(result.teamA11,result.teamB11,result.teamABan,result.teamBBan);
                    resolve ("true");
                }
                else if(result.status == 202){
                    hideProgress();
                    setLoading(false);
                    if(lateDelayClear){
                        clearTimeout(lateDelayClear);
                    }
                    if(startTimeClear){
                        clearTimeout(startTimeClear);
                    }
                    if (socketTriggered) {
                        clearInterval(socketTriggered);
                    }
                    if(sec25int){
                        clearInterval(sec25int);
                    }
                    if(globalTimeInterval){
                        clearInterval(globalTimeInterval);
                    }
                    navigation.navigate("InternetChecker");
                }
                else if(result.status == 209){
                    if(currentTime == "00:00"){
                        if(startTimeClear){
                            clearTimeout(startTimeClear);
                        }
                        if (socketTriggered) {
                            clearInterval(socketTriggered);
                        }
                        if(sec25int){
                            clearInterval(sec25int);
                        }
                        if(globalTimeInterval){
                            clearInterval(globalTimeInterval);
                        } 
                        getData();
                    }
                    else{
                        console.log("Re-request time is out for getting data");
                    }
                    
                }
                else if(result.status == 401){
                    hideProgress();
                    setLoading(false);
                    if(lateDelayClear){
                        clearTimeout(lateDelayClear);
                    }
                    if(startTimeClear){
                        clearTimeout(startTimeClear);
                    }
                    if (socketTriggered) {
                        clearInterval(socketTriggered);
                    }
                    if(sec25int){
                        clearInterval(sec25int);
                    }
                    if(globalTimeInterval){
                        clearInterval(globalTimeInterval);
                    }
                    navigation.navigate("InternetChecker");
                }
                else{
                    reject("false");
                }
            })
        });
        return myPromise;
              
    }



    const process1 = () =>{
        // console.log(gameDetails);
        if(gameDetails?.tossWinner == userInfo.userId){
            sec25int = setInterval(autoSubmit25Sec, 25000);
            hideProgress();
            setLoading(false);
        }
        if(gameDetails?.tossWinner != userInfo.userId){
            setLoading(true);
            if(globalTimeInterval){
                clearInterval(globalTimeInterval);
            }
            startTimeClear = setTimeout(function(){
                teamBCount = teamBCount + 1;
                BindPlayerUI();
                hideProgress();
                setLoading(false);                
                setCurrentTime("00:27");
                globalTimeInterval = setInterval(updateTime, 1000);
                sec25int = setInterval(autoSubmit25Sec, 27000);
            }, 30000);
        }
        if(gameDetails?.userTwo == userInfo.userId){
            setIsOpponent(true);
        }
    }



    const BindPlayerUI = () =>{
        setTeamA(prevTeamA => {
            const updatedTeamA = prevTeamA.map(element => {
              if ((element.playerId == tossWinnerLastPic) && (element.selBy != userInfo.userId)) {
                return { ...element, isSel : "1" };
              }
              return element;
            });
            return updatedTeamA;
          });

          setTeamB(prevTeamB => {
            const updatedTeamB = prevTeamB.map(element => {
              if ((element.playerId == tossWinnerLastPic) && (element.selBy != userInfo.userId)) {
                return { ...element, isSel : "1" };
              }
              return element;
            });
            return updatedTeamB;
          });

          setTeamABench(prevTeamAB => {
            const updatedTeamAB = prevTeamAB.map(element => {
              if ((element.playerId == tossWinnerLastPic) && (element.selBy != userInfo.userId)) {
                return { ...element, isSel : "1" };
              }
              return element;
            });
            return updatedTeamAB;
          });

          setTeamBBench(prevTeamBB => {
            const updatedTeamBB = prevTeamBB.map(element => {
              if ((element.playerId == tossWinnerLastPic) && (element.selBy != userInfo.userId)) {
                return { ...element, isSel : "1" };
              }
              return element;
            });
            return updatedTeamBB;
          });

    }






    const filterTheSelectedData = (teamA, teamB, teamAB, teamBB) =>{
        teamACount = 0;
        teamBCount = 0;
        teamA.length > 0 && teamA.forEach(element => {
            if(element.isSel == "1" && element.selBy == userInfo.userId){
                teamACount = teamACount + 1;
            }
            if(element.isSel == "1" && element.selBy != userInfo.userId){
                teamBCount = teamBCount + 1;
            }
        });
        teamB.length > 0 && teamB.forEach(element => {
            if(element.isSel == "1" && element.selBy == userInfo.userId){
                teamACount = teamACount + 1;
            }
            if(element.isSel == "1" && element.selBy != userInfo.userId){
                teamBCount = teamBCount + 1;
            }
        });
        teamAB?.length > 0 && teamAB?.forEach(element => {
            if(element.isSel == "1" && element.selBy == userInfo.userId){
                teamACount = teamACount + 1;
            }
            if(element.isSel == "1" && element.selBy != userInfo.userId){
                teamBCount = teamBCount + 1;
            }
        });
        teamBB?.length > 0 && teamBB?.forEach(element => {
            if(element.isSel == "1" && element.selBy == userInfo.userId){
                teamACount = teamACount + 1;
            }
            if(element.isSel == "1" && element.selBy != userInfo.userId){
                teamBCount = teamBCount + 1;
            }
        });
        console.log(`Team A count from user ${userInfo.userId}------>`, teamACount)
        console.log(`Team B count from user ${userInfo.userId} ------>`, teamACount)
        if (teamACount == 6) {
            if(lateDelayClear){
                clearTimeout(lateDelayClear);
            }
            if(startTimeClear){
                clearTimeout(startTimeClear);
            }
            if (socketTriggered) {
                clearInterval(socketTriggered);
            }
            if(sec25int){
                clearInterval(sec25int);
            }
            if(globalTimeInterval){
                clearInterval(globalTimeInterval);
            }
            hideProgress();
            setLoading(false);  
            const routes = navigation.getState()?.routes;
            if(routes[routes.length - 1].name == 'BothTeamOpponentSelection'){
                console.log("Moving");
                hideProgress();
                setLoading(false);     
                navigation.navigate('CaptainViceCaptainSelection');
            }
        }
    }


    const checkTotalPicks = () =>{
        if (teamACount == 6) {
            if(lateDelayClear){
                clearTimeout(lateDelayClear);
            }
            if(startTimeClear){
                clearTimeout(startTimeClear);
            }
            if (socketTriggered) {
                clearInterval(socketTriggered);
            }
            if(sec25int){
                clearInterval(sec25int);
            }
            if(globalTimeInterval){
                clearInterval(globalTimeInterval);
            }
            if(playClick){
                clearTimeout(playClick)
            }
            hideProgress();
            setLoading(false);            
            navigation.navigate('CaptainViceCaptainSelection');
        }
    }




    const decreaseTime = () => {
        if(reRequestSeconds > 0){
            reRequestSeconds = reRequestSeconds-1;
        }
    }





    const handlePlayerClick = (playerIndex, team, item) =>{
        if(!plseleccted){
            plseleccted = true;
            showProgress();
            if(item.isSel == "1"){
                hideProgress();
                Functions.getInstance().Toast("error", "This player can't be selected..");
                plseleccted = false;
            }
            else{
                const sysTime2 = getCurrentTime();
                if(lateDelayClear){
                    clearTimeout(lateDelayClear);
                }
                if(startTimeClear){
                    clearTimeout(startTimeClear);
                }
                if (socketTriggered) {
                    clearInterval(socketTriggered);
                }
                if(sec25int){
                    clearInterval(sec25int);
                }
                if(globalTimeInterval){
                    clearInterval(globalTimeInterval);
                }            
                setCurrentTime("00:00");
                const obj ={
                    gameId: gameDetails.gameId,
                    playerId: item.playerId,
                    utcCTime : sysTime2
                }
                console.log(obj);
                Services.getInstance().saveFinalPlayers(obj, userInfo.userId, gameDetails.gameId, userInfo.accesToken).then((result)=>{
                    console.log(result);
                    plseleccted = false;
                    if(result.status == 200){
                        callPlayer11Data().then(
                            function(){
                                hideProgress();
                                setLoading(true);
                                selected = false;
                            }
                        ).catch(
                            function(){
                                console.log("Line handleclick function")
                            }
                        );
                    }
                    else if(result.status == 203){
                        console.log(`------------------> duplicate Player submission from user : ${userInfo.userId} <-------------------`);
                        callPlayer11Data().then(
                            function(){
                                hideProgress();
                                setLoading(true);
                                selected = false;
                                socketTriggered = setInterval(offlineSocketVerify, 31000);
                            }
                        ).catch(
                            function(){
                                console.log("duplicate Player Line handleclick function");
                            }
                        );                    
                    }
                    else if(result.status == 202){
                        hideProgress();
                        setLoading(false);
                        if(lateDelayClear){
                            clearTimeout(lateDelayClear);
                        }
                        if(startTimeClear){
                            clearTimeout(startTimeClear);
                        }
                        if (socketTriggered) {
                            clearInterval(socketTriggered);
                        }
                        if(sec25int){
                            clearInterval(sec25int);
                        }
                        if(globalTimeInterval){
                            clearInterval(globalTimeInterval);
                        }
                        navigation.navigate("InternetChecker");
                    }
                    else if(result.status == 209){
                        if(reRequestSeconds > 3){
                            console.log("reloadSeconds : ", reRequestSeconds)
                            setInterval(decreaseTime,1000);
                            handlePlayerClick("","",item);
                        }
                        else{
                            console.log("Re-request time is up for Player selection...");
                        }
                    }
                    else if(result.status == 401){
                        hideProgress();
                        setLoading(false);
                        if(lateDelayClear){
                            clearTimeout(lateDelayClear);
                        }
                        if(startTimeClear){
                            clearTimeout(startTimeClear);
                        }
                        if (socketTriggered) {
                            clearInterval(socketTriggered);
                        }
                        if(sec25int){
                            clearInterval(sec25int);
                        }
                        if(globalTimeInterval){
                            clearInterval(globalTimeInterval);
                        }
                        navigation.navigate("InternetChecker");
                    }
                    else{
                        console.log("------------------> Error in saving the final Player <-------------------")
                        plseleccted = false;
                        Functions.getInstance().Toast("error","Unable to connect to the server at this moment,try again later");
                    }
    
                })


            }
        }


    }






    const autoSubmit25Sec = () =>{
        // console.log("---------------> 25 sec Timer autoSubmit25Sec -------------------------------->")
        console.log(sec25TimeChange);
        console.log(`//////////////// sec25int from user : ${userInfo.userId} ///////////////////////`)
        // let time1 = sec25TimeChange;
        // let time2 = '00:05';
        // let isTimeTrue = compareTimeStrings(time1, time2);
        // if(isTimeTrue == true){
            if(lateDelayClear){
                clearTimeout(lateDelayClear);
            }
            if(startTimeClear){
                clearTimeout(startTimeClear);
            }
            if (socketTriggered) {
                clearInterval(socketTriggered);
            }
            if(sec25int){
                clearInterval(sec25int);
            }
            if(globalTimeInterval){
                clearInterval(globalTimeInterval);
            }
            // console.log("myDefaultPlayers ::::::", preDefinedPlayers);
            let newData = preDefinedPlayers;
            // console.log(typeof(newData));
            // console.log("newData : ", newData);
            handlePlayerClick("","",newData);
        // }
    }

    function timeToMinutes(timeString) {
        if(timeString != undefined){
            const [hours, minutes] = timeString.split(':').map(Number);
            return hours * 60 + minutes;
        }
    }

    function compareTimeStrings(time1, time2) {
        // console.log("Im in timerrrr")        
        const minutes1 = timeToMinutes(time1);
        const minutes2 = timeToMinutes(time2);
        // console.log(minutes1);
        // console.log(minutes2);
        if (minutes1 < minutes2) {
        return true;
        } else if (minutes1 > minutes2) {
        return false;
        } else {
        return true;
        }
      }






      const offlineSocketVerify = () =>{
        // console.log("--------------->  Timer offlineSocketVerify -------------------------------->")
        console.log(`//////////////// 31000 Intervel from user : ${userInfo.userId} ///////////////////////`)
        callPlayer11Data().then(
            function(){
                console.log(`//////////////// List API called and data received : ${userInfo.userId} ///////////////////////`)
                if(startTimeClear){
                    clearTimeout(startTimeClear);
                }
                if (socketTriggered) {
                    clearInterval(socketTriggered);
                }
                if(sec25int){
                    clearInterval(sec25int);
                }
                if(globalTimeInterval){
                    clearInterval(globalTimeInterval);
                } 
                hideProgress();
                setLoading(false);               
                sec25int = setInterval(autoSubmit25Sec, 27000); 
                setCurrentTime("00:26");
                globalTimeInterval = setInterval(updateTime, 1000);
                               
            }
        ).catch(
            function(){
                console.log("Line handleclick function")
            }
        );
    }





    const renderCountryBoxHeader = () => {
        return (
            <View style={styles.countryBoxTopHeader}>
                <View style={styles.teamLeft}>
                    <View style={styles.teamsImage}>
                        {userPF?.profileImg == "https://s3.amazonaws.com/dealstageuploads/pl6Uplods/" ? 
                                <Image style={styles.teamsImageStyle} source={require('../../../assets/images/dummy.png')}/>
                                :
                                <Image style={styles.teamsImageStyle} source={ userPF ? {uri: myPic} : require('../../../assets/images/dummy.png')}/>
                        }
                    </View>
                    <View style={styles.teamName}>
                        <Text style={styles.teamLeftNameText}>{userPF ? userPF?.name : ""}</Text>
                    </View>
                </View>
                <View style={styles.timerBox}>
                    <Text style={styles.timerText}>{currentTime}</Text>
                </View>
                <View style={styles.teamRight}>
                    <View style={styles.teamRightImage}>
                        {opponentPic &&  opponentPic == "https://s3.amazonaws.com/dealstageuploads/pl6Uplods/" ? 
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


    const renderPickPlayerCheckBox = () => {
        return (
            <View style={styles.ptkmain}>
                <View style={[styles.pntlist, styles.ticklist, styles.btmlist]}>
                    {[1, 2, 3, 4, 5, 6].map((player, index) => (
                        index + 1 <= teamACount ?(
                        <View
                            key={index}
                            style={[styles.pntitem, index + 1 <= teamACount && isOpponent ? styles.opicked : styles.ppicked]}>
                            {index + 1 <= teamACount ? (
                                <Image style={styles.wtick} source={TickIcon} />
                            ) : ""} 
                        </View>
                        )
                        :
                        <View
                            key={index}
                            style={[styles.pntitem, index + 1 <= teamACount]}>
                            {index + 1 <= teamACount ? (
                                <Image style={styles.wtick} source={TickIcon} />
                            ) : ""} 
                        </View>

                    ))}
                </View>

                <View style={[styles.pntlist, styles.ticklist, styles.btmlist, styles.slist]}>
                    {[1, 2, 3, 4, 5, 6].map((player, index) => (
                        
                        index + 1 <= teamBCount ? (  
                        <View
                            key={index}
                            style={[styles.pntitem, index + 1 <= teamBCount && isOpponent ? styles.ppicked :  styles.opicked]}
                        >
                         {index + 1 <= teamBCount ? (
                                <Image style={styles.wtick} source={TickIcon} />
                         ) : ""} 
                        </View>
                        )
                        :
                        <View
                            key={index}
                            style={[styles.pntitem, index + 1 <= teamBCount ]}
                        >
                         {index + 1 <= teamBCount ? (
                                <Image style={styles.wtick} source={TickIcon} />
                         ) : ""} 
                        </View>
                    ))}
                </View>
            </View>
        );
    };


    const renderTeamAItem = ({ item, index }) => (
            <View style={[styles.tmplyrlft, 
                (item.isSel == "1"  && isOpponent && item.selBy == userInfo?.userId) ? styles.borderTopOrangeWidth 
                : 
                (item.isSel == "1"  && isOpponent == false && item.selBy == userInfo?.userId) ? styles.borderTopBlueWidth 
                :
                (item.isSel == "1"  && isOpponent && item.selBy != userInfo?.userId) ? styles.borderTopBlueWidth 
                :
                (item.isSel == "1"  && isOpponent == false && item.selBy != userInfo?.userId) ? styles.borderTopOrangeWidth
                :
                "grey" 
            ]}>
                <View style={styles.plyrlft}>
                    <View style={[styles.plyrprfl, styles.plyrlftprfl]}>
                    {item.imageId == "" ? <Image style={styles.teamsImageStyle} source={require('../../../assets/images/dummy.png')}/>
                        :
                        <Image style={styles.teamsImageStyle} source={{ uri: `https://cdn.sportmonks.com/images/cricket/players/${item.imageId}` }} />
                    }
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <Text style={[styles.ortxt, styles.plyrtm, styles.plyrsd]}>{item.teamName}</Text>
                    </View>
                </View>
                <View style={[styles.dotp, styles.dotp2]}>
                    <Image style={styles.dotimg} source={BorderLine2} />
                </View>
                <View>
                    <Text style={[styles.teamnm, styles.wnrtxt, styles.tmname, styles.plyrname]}>{item.name}</Text>
                    <Text style={[styles.teamnm, styles.plyrruns]}>Avg : {item.avg}</Text>
                    <Text style={[styles.ortxt, styles.plyrruns]}>HS : {item.hs}</Text>
                </View>
               
                <TouchableOpacity
                    style={[styles.adplyr, 
                        {backgroundColor: 
                            (item.isSel == "1"  && isOpponent && item.selBy == userInfo?.userId) ? "orange" 
                            : 
                            (item.isSel == "1"  && isOpponent == false && item.selBy == userInfo?.userId) ? "#246afe" 
                            :
                            (item.isSel == "1"  && isOpponent && item.selBy != userInfo?.userId) ? "#246afe" 
                            :
                            (item.isSel == "1"  && isOpponent == false && item.selBy != userInfo?.userId) ? "orange" 
                            :
                           
                            "grey" }]}
                    disabled={item.isSel == "1"}
                    onPress={() => {
                        Functions.getInstance().fireAdjustEvent("pogpop");
                        Functions.getInstance().fireFirebaseEvent("Players11SelectionPlusButton");
                        let properties = new MoEProperties();
                        properties.addAttribute("clicked", true);
                        ReactMoE.trackEvent("LIVE Player Selection", properties);
                        handlePlayerClick(index, 1, item);
                        selected = true;
                    }}
                >
                    {item.isSel == "1" ? (
                        <Image style={{width:8,height:8}} source={TickIcon}/>
                    ) : (
                        <Image style={styles.adplusimg} source={PlusIcon} />
                    )}
                </TouchableOpacity>

            </View>
    );

    const renderTeamBItem = ({ item, index }) => (
        <View style={[styles.tmplyrlft,
                (item.isSel == "1"  && isOpponent && item.selBy == userInfo?.userId) ? styles.borderTopOrangeWidth 
                : 
                (item.isSel == "1"  && isOpponent == false && item.selBy == userInfo?.userId) ? styles.borderTopBlueWidth 
                :
                (item.isSel == "1"  && isOpponent && item.selBy != userInfo?.userId) ? styles.borderTopBlueWidth 
                :
                (item.isSel == "1"  && isOpponent == false && item.selBy != userInfo?.userId) ? styles.borderTopOrangeWidth
                :
                "grey" 
            ]}>
            <View style={styles.plyrlft}>
                <View style={[styles.plyrprfl, styles.plyrlftprfl]}>
                {item.imageId == "" ? <Image style={styles.teamsImageStyle} source={require('../../../assets/images/dummy.png')}/>
                    :
                    <Image style={styles.teamsImageStyle} source={{ uri: `https://cdn.sportmonks.com/images/cricket/players/${item.imageId}` }} />
                }
                </View>
                <View style={{ marginTop: 5 }}>
                    <Text style={[styles.ortxt, styles.plyrtm, styles.plyrsd]}>{item.teamName}</Text>
                </View></View>
            <View style={[styles.dotp, styles.dotp2]}>
                <Image style={styles.dotimg} source={BorderLine2} />
            </View>
            <View>
                <Text style={[styles.teamnm, styles.wnrtxt, styles.tmname, styles.plyrname]}>{item.name}</Text>
                <Text style={[styles.teamnm, styles.plyrruns]}>Avg : {item.avg}</Text>
                <Text style={[styles.ortxt, styles.plyrruns]}>HS : {item.hs}</Text>
            </View>

            {/* {(item.isSel == "1" || (currentSystemTime > (item.endTime))) && item.endTime != "" ? */}
                    <TouchableOpacity style={[styles.adplyr,
                                {backgroundColor: 
                                    (item.isSel == "1"  && isOpponent && item.selBy == userInfo?.userId) ? "orange" 
                                    : 
                                    (item.isSel == "1"  && isOpponent == false && item.selBy == userInfo?.userId) ? "#246afe" 
                                    :
                                    (item.isSel == "1"  && isOpponent && item.selBy != userInfo?.userId) ? "#246afe" 
                                    :
                                    (item.isSel == "1"  && isOpponent == false && item.selBy != userInfo?.userId) ? "orange" 
                                    :
                                    "grey" }]}                        
                        onPress={() => {
                            Functions.getInstance().fireAdjustEvent("pogpop");
                            Functions.getInstance().fireFirebaseEvent("Players11SelectionPlusButton");
                            let properties = new MoEProperties();
                            properties.addAttribute("clicked", true);
                            ReactMoE.trackEvent("LIVE Player Selection", properties);
                            handlePlayerClick(index, 2, item);
                            selected = true;
                        }}
                        disabled={item.isSel == "1"}
                    >
                        {item.isSel == "1" ? (
                            <Image style={{width:8,height:8}} source={TickIcon} />
                        ) : (
                            <Image style={styles.adplusimg} source={PlusIcon} />
                        )}
                    </TouchableOpacity>

        </View>
    );

    return (
        <View style={{ flex: 1, marginTop : 60, backgroundColor: '#111'}}>
            {/* <ScrollView style={styles.scrollView}> */}
                <View style={[styles.headerContainer]}>
                    <View style={styles.countryBox}>
                        {renderCountryBoxHeader()}
                        {renderPickPlayerCheckBox()}
                    </View>
                    <ScrollView style={styles.scrollView}>
                    <Text style={[styles.headingText, styles.ennum,{textAlign : 'center'}]}>Select Your P6 Squads</Text>
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




                    <Text style={[styles.headingText, styles.ennum,{textAlign : 'center'}]}>Bench</Text>
                    <View style={styles.playerContainer}>
                        <View style={styles.playerContentBox}>
                            <FlatList
                                data={teamABench}
                                renderItem={renderTeamAItem}
                                keyExtractor={(item, index) => index.toString()}
                                ListFooterComponent={<View style={{ paddingBottom: 50 }} />}
                            />
                        </View>
                        <View style={styles.playerContentBox}>
                            <FlatList
                                data={teamBBench}
                                renderItem={renderTeamBItem}
                                keyExtractor={(item, index) => index.toString()}
                                ListFooterComponent={<View style={{ paddingBottom: 50 }} />}
                            />
                        </View>
                    </View>
                    </ScrollView>
                </View>
                
            {/* </ScrollView> */}
            {loading ? 
                <LoadingPopup 
                isVisible={loading} 
                closePopup = {()=>setLoading(false)} 
                navigation={navigation} 
                teamA={teamA} 
                teamB={teamB} 
                teamABench={teamABench} 
                teamBBench={teamBBench} 
                isOpponent={isOpponent}
                userInfo={userInfo}/>
                : "" }




        </View>
    );
};


export default WithProgress(inject('UserStore')(observer(BothTeamOpponentSelection)));
