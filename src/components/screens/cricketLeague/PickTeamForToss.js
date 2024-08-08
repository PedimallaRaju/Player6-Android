import React, { useEffect, useState } from "react";
import {
  Alert,
  AppState,
  Image,
  Pressable,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BlinkView from "react-native-smooth-blink-view";
import { styles } from "./crickLeagueStyles/CricketLeague.style";
import Functions from "../Functions";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import ImageSlider from "./common/ImageSlider";
import UserStore from "../../stores/UserStore";
import Services from "../../../Services/Services";
import AsyncStorage from "@react-native-community/async-storage";
import EventSource from "react-native-event-source";
import MatchBanner from "./MatchBanner";
import { inject, observer } from "mobx-react";
import WithProgress from "../LoadingOverlay/WithProgress";
import ReactMoE, { MoEProperties } from "react-native-moengage";

let userInfo,
  gameDetails = {},
  teamDetails = {},
  selectedUserMatch = {},
  selectedUserContest = {},
  draftBtnStatus,
  interval,
  timeout,
  myTeam = {};

const PickTeamForToss = ({ navigation, showProgress, hideProgress }) => {
  const [ContestContent, setContestContent] = useState(false); // New state by Venky
  const [tmSel, setTmSel] = useState(false);
  const [currentTime, setCurrentTime] = useState();
  const [teamSelected, setteamSelected] = useState(false);// DraftButton
  const [opEvent, setopEvent] = useState(false);
  let [tossDelayed, setTossDelayed] = useState(false);
  let newSocket;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      gameDetails = UserStore.selectedGameData;
      teamDetails = UserStore.selectedTeamDetails;
      draftBtnStatus=UserStore.DraftButton;
      setContestContent(UserStore.DraftButton);
      selectedUserMatch = UserStore.selectedMatch;
      selectedUserContest = UserStore.selectedContest;
      callSocket();
      getData();
      setCurrentTime(Functions.getInstance().getTimer(gameDetails?.startTime));
      setTmSel(true);
    });
    return () => {
      unsubscribe();
    };
  }, [navigation, gameDetails]);

  useEffect(() => {
    let myTime = getCurrentTime();
    gameDetails = UserStore.selectedGameData;
    teamDetails = UserStore.selectedTeamDetails;
    selectedUserMatch = UserStore.selectedMatch;
    selectedUserContest = UserStore.selectedContest;
    timeout = setTimeout(function () {
      clearTimeout(timeout);
      if (myTime > gameDetails.tosTime) {
        setTossDelayed(true);
      }

      interval = setInterval(() => {
        setCurrentTime(
          Functions.getInstance().getTimer(gameDetails?.startTime)
        );
        let myTime = getCurrentTime();

        if (myTime > gameDetails.tosTime) {
          setTossDelayed(true);
        }

        const delay = Functions.getInstance().contestClosedTimeDifference(
          myTime,
          gameDetails?.startTime
        );
        if (delay <= 10 * 60) {
          if (timeout) {
            clearTimeout(timeout);
          }
          if (interval) {
            clearInterval(interval);
          }
          navigation.navigate("CricketLeague");
        }
      }, 1000);
    }, 1000);

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
      if (interval) {
        clearInterval(interval);
      }
      newSocket.removeAllListeners();
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (currentTime == "00:00") {
      if (timeout) {
        clearTimeout(timeout);
      }
      if (interval) {
        clearInterval(interval);
      }
    }
  }, []);

  const getCurrentTime = () => {
    var currentDate = new Date();
    // Get the components of the date and time
    var year = currentDate.getUTCFullYear();
    var month = ("0" + (currentDate.getUTCMonth() + 1)).slice(-2);
    var day = ("0" + currentDate.getUTCDate()).slice(-2);
    var hours = ("0" + currentDate.getUTCHours()).slice(-2);
    var minutes = ("0" + currentDate.getUTCMinutes()).slice(-2);
    var seconds = ("0" + currentDate.getUTCSeconds()).slice(-2);
    var currentSystemTime =
      year +
      "-" +
      month +
      "-" +
      day +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds;
    return currentSystemTime;
  };

  const callSocket = async () => {
    userInfo = JSON.parse(await AsyncStorage.getItem("player6-userdata"));
     newSocket = new EventSource(`https://www.xhtmlreviews.com/api-player6/1.0/auth/User/${userInfo.userId}/watchEvents`);
    // newSocket = new EventSource(`https://apidemo.player6sports.com/1.0/auth/User/${userInfo.userId}/watchEvents`);
    // newSocket = new EventSource(`https://apiqa.player6sports.com/1.0/auth/User/${userInfo.userId}/watchEvents`);
    // newSocket = new EventSource(`https://api.player6sports.com/1.0/auth/User/${userInfo.userId}/watchEvents`);

    newSocket.addEventListener("ping", (event) => {
      console.log("Final List Socket ::::: ");
    });

    if (opEvent == false) {
      newSocket.addEventListener("tossDec", (event) => {
        let ds = JSON.parse(event.data);
        if (ds.matchId == gameDetails.matchId) {
          tossDeclarationEvent(event);
        }
      });
    }

    newSocket.addEventListener("contestClosed", (event) => {
      let ds = JSON.parse(event.data);
      if (ds.matchId == gameDetails.matchId) {
        navigation.navigate("CricketLeague");
      }
    });

    return () => {
      newSocket.removeAllListeners();
      newSocket.close();
    };
  };

  const tossDeclarationEvent = async (event) => {
    setopEvent(true);
    const stat = await AsyncStorage.getItem("toss");
    const toss = JSON.parse(event.data);
    if (gameDetails.matchId == toss.matchId && stat == "false") {
      let user1Team, user2Team;
      AsyncStorage.setItem("toss", "true");
      if (gameDetails?.userOne == userInfo.userId) {
        user1Team = gameDetails.userOneTeam;
      } else if (gameDetails?.userTwo == userInfo.userId) {
        user2Team = gameDetails.userTwoTeam;
      }

      if (user2Team == "0" && gameDetails?.userTwo == userInfo.userId) {
        user2Team = toss.winTeamId;
        navigation.navigate("TossWon");
      }

      if (user2Team == toss.winTeamId) {
        navigation.navigate("TossWon");
      } else if (user1Team == toss.winTeamId) {
        navigation.navigate("TossWon");
      } else {
        navigation.navigate("TossLoss");
      }
    }
  };

  const getData = async () => {
    userInfo = JSON.parse(await AsyncStorage.getItem("player6-userdata"));
    AsyncStorage.setItem("toss", "false");
    AsyncStorage.setItem("players", "false");
    if (teamDetails?.userOneTeam !== "0") {
      if (teamDetails?.userOneTeam == teamDetails?.contOne) {
        const obj = {
          contOne: teamDetails?.userOneTeam,
          contOneSnam: teamDetails?.contOneSnam,
          contOneImg: teamDetails?.contOneImg,
          isSelected: true,
        };
        UserStore.setselectedTeamDetails(obj);
        teamDetails = obj;
        setteamSelected(true);
        setContestContent(true);
      } else {
        const obj = {
          contOne: teamDetails?.userTwoTeam,
          contOneSnam: teamDetails?.contTwoSnam,
          contOneImg: teamDetails?.contTwoImg,
          isSelected: true,
        };
        UserStore.setselectedTeamDetails(obj);
        teamDetails = obj;
        setteamSelected(true);
        setContestContent(true);
      }
    } else {
      setteamSelected(false);
    }
    Functions.getInstance().checkExpiration(
      userInfo.userId,
      userInfo.refToken,
      navigation
    );
    Functions.getInstance().checkInternetConnectivity();
  };

  const onPressTeam = (id, name, image) => {
    Functions.getInstance().fireAdjustEvent("yxov4d");
    let properties = new MoEProperties();
    properties.addAttribute("Name", name);
    ReactMoE.trackEvent("Glimmering logo of Team", properties);
    showProgress();
    const obj = {
      contOne: id,
      contOneSnam: name,
      contOneImg: image,
      isSelected: true,
    };
    UserStore.setselectedTeamDetails(obj);
    teamDetails = obj;
    console.log(UserStore.getselectedTeamDetails());
    const payload = {
      userId: userInfo.userId,
      gameId: gameDetails.gameId,
      team: id,
    };
    console.log(payload);

    Services.getInstance()
      .selectTeam(
        payload,
        userInfo.userId,
        gameDetails.gameId,
        userInfo.accesToken
      )
      .then((result) => {
        setteamSelected(true);
        if (gameDetails.contOne == id) {
          gameDetails.userOneTeam = id;
          gameDetails.userTwoTeam = gameDetails.contTwo;
        } else {
          gameDetails.userOneTeam = id;
          gameDetails.userTwoTeam = gameDetails.contOne;
        }
        hideProgress();
      });
  };

  const renderContestContent = (image, name, id, disabled) => {
    return (
      <Pressable
        disabled={disabled}
        onPress={() => {
          if (!ContestContent) {
            setContestContent(true);
            UserStore.setDraftButton(true);
          }
          onPressTeam(id, name, image);
        }}
        style={styles.team}
      >
        <BlinkView
          delayVisible={300}
          delayInvisible={0}
          duration={500}
          blinking={true}
        >
          <View
            style={[styles.teamView, styles.pickTeamView, styles.blnk]}
          ></View>
        </BlinkView>

        <View style={[styles.teamView, styles.pickTeamView]}>
          <Image
            style={styles.teamImage}
            source={{
              // uri: `https://www.cricbuzz.com/a/img/v1/40x40/i1/c${image}/player_face.jpg`,
              uri: `https://cdn.sportmonks.com/images/cricket/teams/${image}`,
            }}
          />
        </View>
        <Text style={[styles.teamName, styles.teamText, styles.tctblnlk]}>
          {name}
        </Text>
        {disabled && (
          <View style={styles.matchTime}>
            <View style={[styles.pickTimer, styles.onpg]}>
              <Text style={[styles.teamName, styles.teamTimerText]}>
                {currentTime}
              </Text>
            </View>
          </View>
        )}
      </Pressable>
    );
  };

  return !tmSel ? null : (
    <SafeAreaView style={styles.root}>
      <StatusBar backgroundColor="#111111" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.mainContainer}>
          <MatchBanner selectedUserMatch={selectedUserMatch} />

          <View style={[styles.teamcontest, styles.opmn, { marginBottom: 30 }]}>
            <View style={[styles.contestMain, styles.pickTeam]}>
              <Text
                style={[styles.mainText, styles.selectedText, styles.pickText]}
              >
                {teamSelected
                  ? "Your Team For The Toss Is"
                  : "Pick Your Team To Win The Toss"}
                {/* ( Game Id : {gameDetails.gameId} {" , "}
              Match Id : {gameDetails.matchId} )  */}
              </Text>

              {teamSelected ?
               (
                <View style={[styles.matchCard, styles.pickMatch]}>
                  <Pressable style={styles.team}>
                    <View style={[styles.teamView, styles.pickTeamView]}>
                      <Image
                        style={styles.teamImage}
                        source={{
                          // uri: `https://www.cricbuzz.com/a/img/v1/40x40/i1/c${teamDetails.contOneImg}/player_face.jpg`,
                          uri: `https://cdn.sportmonks.com/images/cricket/teams/${teamDetails.contOneImg}`,
                        }}
                      />
                    </View>

                    <Text
                      style={[
                        styles.teamName,
                        styles.teamText,
                        styles.tctblnlk,
                      ]}
                    >
                      {teamDetails.contOneSnam}
                    </Text>

                    <View style={styles.matchTime}>
                      <View style={[styles.pickTimer, styles.onpg]}>
                        <Text style={[styles.teamName, styles.teamTimerText]}>
                          {currentTime}
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                </View>
              ) : (
                <View style={[styles.matchCard, styles.pickMatch]}>
                  {renderContestContent(
                    gameDetails?.contOneImg,
                    gameDetails?.contOneSnam,
                    gameDetails?.contOne,
                    false
                  )}
                  <View style={styles.matchTime}>
                    <View style={styles.pickTimer}>
                      <Text style={[styles.teamName, styles.teamTimerText]}>
                        {currentTime}
                      </Text>
                    </View>
                  </View>
                  {renderContestContent(
                    gameDetails?.contTwoImg,
                    gameDetails?.contTwoSnam,
                    gameDetails?.contTwo,
                    false
                  )}
                </View>
              )}

              <Text style={[styles.teamName, styles.winnerText]}>
                Winner of toss gets 1st pick in player selection
              </Text>
              {currentTime == "00:00" && (
                <Text style={[styles.teamName, styles.winnerText]}>
                  toss will be announced shortly.
                </Text>
              )}

              <Pressable
                onPress={() => {
                  Functions.getInstance().fireAdjustEvent("sg7g0q");
                  Functions.getInstance().fireFirebaseEvent(
                    "UpdateDraftButton"
                  );
                  let properties = new MoEProperties();
                  properties.addAttribute("userId", userInfo.userId);
                  properties.addAttribute("click_updatedraft", true);
                  ReactMoE.trackEvent("click_updatedraft", properties);
                  navigation.navigate("DraftRoute");
                }}
                disabled={!ContestContent} // Enable the button only when ContestContent is true
              >
                <View
                  style={[
                    styles.chooseContest,
                    styles.waitingRoom,
                    styles.openGame,
                    { opacity: ContestContent ? 1 : 0.5 } // Change opacity when disabled
                  ]}
                >
                  <Text
                    style={[
                      styles.mainText,
                      styles.playNow,
                      styles.waitingRoomText,
                      { color: ContestContent ? '#FFFFFF' : '#CCCCCC' } // Change text color when disabled
                    ]}
                  >
                    Update Draft
                  </Text>
                </View>
              </Pressable>
              {tossDelayed ? (
                <Text
                  style={[
                    styles.teamnm,
                    styles.wnrtxt,
                    { color: "#90EE90", fontSize: 12, marginTop: 10 },
                  ]}
                >
                  {`Please wait. The toss will be announced shortly`}
                </Text>
              ) : (
                ""
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WithProgress(inject("UserStore")(observer(PickTeamForToss)));
