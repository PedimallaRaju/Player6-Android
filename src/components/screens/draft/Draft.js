import { styles } from "./Draft.styles";
import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  Image,
  Pressable,
  SafeAreaView,
  FlatList,
  StatusBar,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PlusIcon, SortIcon, TickIcon } from "../../../assets";
import Functions from "../Functions";
import AsyncStorage from "@react-native-community/async-storage";
import WithProgress from "../LoadingOverlay/WithProgress";
import UserStore from "../../stores/UserStore";
import Services from "../../../Services/Services";
import PlayerDetailsPopup from "./PlayerDetailsPopup";
import { inject, observer } from "mobx-react";
import ReactMoE, { MoEProperties } from "react-native-moengage";

let userInfo,
  userPF,
  myPic,
  avgCount = 0;

const Draft = ({ showProgress, hideProgress }) => {
  const [unpickStatus, setUnpickStatus] = useState(false);
  const [players, setPlayers] = useState([]);
  const gameDetails = UserStore.getselectedGameData();
  let [selectedPlayer, updatePlayer] = useState([]); //Here chngs req to update flist
  const totalSelection = selectedPlayer?.filter((item) => item)?.length;
  const navigation = useNavigation();
  const [isOpponent, setIsOpponent] = useState(false);
  const [draftPlayers, setDraftPlayers] = useState([]);
  const [copydraftPlayers, setcopyDraftPlayers] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [playerStatistics, setPlayerStatistics] = useState({});
  const [playerStatistics1, setPlayerStatistics1] = useState([]);
  const [strips, setstrips] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ]);
  const [currentTime, setCurrentTime] = useState(
    Functions.getInstance().getTimer(gameDetails?.startTime)
  );
  const timerRef = useRef(null);

  if (UserStore) {
    const profile = UserStore.getuserPF();
    if (profile) {
      myPic = profile?.replace(/['"]+/g, "");
    }
  }

  // useEffect(() => {
  //   // Set up an interval to update the timer every second
  //   timerRef.current = setInterval(() => {
  //     setCurrentTime(Functions.getInstance().getTimer(gameDetails?.startTime));
  //   }, 1000);

  //   return () => {
  //     // Clear the interval when the component is unmounted
  //     clearInterval(timerRef.current);
  //   };
  // }, [selectedPlayer]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getData();
    });
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        // Functions.getInstance().Toast("error", "You")
      }
    );

    return () => {
      unsubscribe();
      backHandler.remove();
    };
  }, []);



  //Original api Func()
  const getData = async () => {
    showProgress();
    userInfo = JSON.parse(await AsyncStorage.getItem("player6-userdata"));
    userPF = JSON.parse(await AsyncStorage.getItem("player6-profile"));
    console.log(userInfo.accesToken);
    Functions.getInstance().checkExpiration(
      userInfo.userId,
      userInfo.refToken,
      navigation
    );
    Functions.getInstance()
      .checkInternetConnectivity()
      .then((state) => {
        if (gameDetails?.userTwo == userInfo.userId) {
          setIsOpponent(true);
        }
        if (state == true) {
          const obj = {
            userId: userInfo.userId,
            gameId: gameDetails.gameId,
          };
          Services.getInstance()
            .getDraftPlayers(
              obj,
              userInfo.userId,
              gameDetails.gameId,
              userInfo.accesToken
            )
            .then((result) => {
              setDraftPlayers([]);
              console.log(result);
              if (result.status == 200) {
                AsyncStorage.setItem(
                  "Draft-Players",
                  JSON.stringify(result.playerList)
                );
                Functions.getInstance()
                  .offlineDraftPlayers()
                  .then((result) => {
                    setDraftPlayers(result);
                    setcopyDraftPlayers(result);
                    defaultPlayersData(result);
                    hideProgress();
                  });
              } else {
                Functions.getInstance().Toast("error", "Try again later");
                hideProgress();
              }
            });
        } else {
          Functions.getInstance()
            .offlineDraftPlayers()
            .then((result) => {
              setDraftPlayers(result);
              defaultPlayersData(result);
              hideProgress();
            });
        }
      });
  };

 

  const defaultPlayersData = (array) => {
    let x = [];
    array.forEach((element) => {
      if (element.draftId !== "") {
        x.push(element);
        updatePlayer(x);
      } else {
        //Nothing
      }
      if (x.length < 12) {
        setIsButtonDisabled(true);
      } else {
        setIsButtonDisabled(false);
      }
    });
  };

  const onPicked = (id, isPicked) => {
    const playerExists = players.some((player) => player.id === id.playerId);
    // If the player doesn't exist, append it to the array
    if (!playerExists) {
      setPlayers([...players, { playerId: id.playerId }]);
    }
    if (isPicked === true) {
        if (selectedPlayer.length >= 12) {
          Functions.getInstance().Toast("error","You have reached maximum selection of players");
        } 
        else {
          draftPlayers.map((item) => {
            if (item.playerId === id.playerId) {
              item.isPicked = isPicked;
              item.draftId = "1";
              let x = [item, ...selectedPlayer];
              updatePlayer(x);
              if (x.length < 12) {
                setIsButtonDisabled(true);
              } else {
                setIsButtonDisabled(false);
              }
            }
          });
        }
    } 
    else {
      draftPlayers.map((item) => {
        if (item.playerId === id.playerId) {
          item.isPicked = isPicked;
          item.draftId = "";
          let newData = selectedPlayer.filter(
            (person) => person.playerId != id.playerId
          );
          updatePlayer(newData);
          if (newData.length < 12) {
            setIsButtonDisabled(true);
          } else {
            setIsButtonDisabled(false);
          }
        }
      });
    }
  };

  const selectedPlayerData = (item) => {
    Functions.getInstance()
      .checkInternetConnectivity()
      .then((state) => {
        if (state == true) {
          showProgress();
          Services.getInstance()
            .getPlayerStatistics(
              userInfo.userId,
              item.matchId,
              item.playerId,
              userInfo.accesToken
            )
            .then((result) => {
              if (result.status == 200) {
                setPlayerStatistics(result.msg);
                setPlayerStatistics1(result.msg.stats);
                setModalVisible(!isModalVisible);
              }
              hideProgress();
            });
        } else {
          //
        }
      });
  };


    //new code Bugs fixed
    const handleUnpickAllPlayers = () => {
      updatePlayer([]); // Clear selected players
      // Update draftPlayers array to mark all players as unpicked
      const updatedDraftPlayers = draftPlayers.map((player) => ({
        ...player,
        isPicked: false,
        draftId: '',
      }));
      setDraftPlayers(updatedDraftPlayers);
    };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const savingTheBasicDraft = () => {
    showProgress();
    let x = [];
    selectedPlayer.forEach((element) => {
      if (element) {
        x.push(Number(element.playerId));
      }
    });

    const obj = {
      gameId: gameDetails.gameId,
      playerList: x.reverse(),
    };
    console.log(obj);
    console.log("PlayerList POST Api payload: ", obj);
    Services.getInstance()
      .savingTheBasicDraft(
        obj,
        userInfo.userId,
        gameDetails.gameId,
        userInfo.accesToken
      )
      .then((result) => {
        console.log(result);
        if (result.status == 200) {
          hideProgress();
            navigation.navigate("DragAndDrop");
        } else {
          hideProgress();
          Functions.getInstance().Toast(
            "error",
            "We are unable to update the draft now. Try again later"
          );
        }
      });
  };

  const sortAverage = (data, avg) => {
    if (avg == "avg") {
      const newArray = sortData(data);
      setDraftPlayers((prevData) =>
        prevData.map((item) => ({
          ...item,
        }))
      );
    } else {
      const newArray = sortData2(data);
      setDraftPlayers((prevData) =>
        prevData.map((item) => ({
          ...item,
        }))
      );
    }
  };

  const sortData = (data) => {
    if (avgCount % 2 == 0) {
      let x = data.sort(function (a, b) {
        avgCount = avgCount + 1;
        return b.avg - a.avg;
      });
      return x;
    } else {
      avgCount = avgCount + 1;
      let sortedDates = data.reverse();
      return sortedDates;
    }
  };

  const sortData2 = (data) => {
    if (avgCount % 2 == 0) {
      let x = data.sort(function (a, b) {
        avgCount = avgCount + 1;
        return b.hs - a.hs;
      });
      return x;
    } else {
      avgCount = avgCount + 1;
      let sortedDates = data.reverse();
      return sortedDates;
    }
  };

  const playersData = (item) => {
    return (
      <Pressable>
        <View style={styles.plyrmain} key={item.item.image}>
          <View style={styles.plyrinfo}>
            <Pressable
              style={[styles.plyrprflinfo, styles.srtby]}
              onPress={() => selectedPlayerData(item.item)}
            >
              <View style={[styles.plyrprflinfo, styles.srtby]}>
                <View style={styles.plyrprfl}>
                  {item.item.image == "" ? (
                    <Image
                      style={styles.tmsdimg}
                      source={require("../../../assets/images/dummy.png")}
                    />
                  ) : (
                    <Image
                      style={styles.tmsdimg}
                      source={{
                        uri: `https://cdn.sportmonks.com/images/cricket/players/${item.item.image}`,
                      }}
                    />
                  )}
                  {/* <Image style={styles.tmsdimg} source={{ uri: `https://www.cricbuzz.com/a/img/v1/40x40/i1/c${item.item.image}/player_face.jpg` }}/> */}
                </View>
                <View style={styles.plyrtxt}>
                  <Text
                    style={[
                      styles.teamnm,
                      styles.wnrtxt,
                      styles.tmname,
                      styles.plyrname,
                    ]}
                  >
                    {item.item.name}
                  </Text>
                  <Text style={[styles.ortxt, styles.plyrtm]}>
                    {item.item.country}
                  </Text>
                </View>
              </View>
            </Pressable>

            <View style={[styles.srtby, styles.rnoptn]}>
              <View style={[styles.topo, styles.hdoptns]}>
                <Text style={styles.ortxt}>{item.item.avg}</Text>
              </View>
            </View>
            <View style={[styles.srtby, styles.rnoptn]}>
              <View style={[styles.topo, styles.hdoptns]}>
                <Text style={styles.ortxt}>{item.item.hs}</Text>
              </View>
            </View>
            <>
              {item.item.draftId !== "" ? (
                <Pressable
                  style={[styles.srtby, styles.rnoptn]}
                  onPress={() => {
                    Functions.getInstance().fireAdjustEvent("6qupwl");
                    Functions.getInstance().fireFirebaseEvent(
                      "DraftPickedButton"
                    );
                    let properties = new MoEProperties();
                    properties.addAttribute("clicked", true);
                    ReactMoE.trackEvent("Picked", properties);
                    onPicked(item.item, false);
                  }}
                >
                  <View
                    style={[
                      styles.topo,
                      styles.hdoptns,
                      styles.pkop,
                      styles.alpkd,
                    ]}
                  >
                    <Text style={styles.ortxt}>Picked</Text>
                  </View>
                </Pressable>
              ) : (
                <Pressable
                  style={[
                    { marginLeft: 12 },
                    styles.topo,
                    styles.hdoptns,
                    styles.pkop,
                    isOpponent ? styles.orngpick : {},
                  ]}
                  onPress={() => {
                    Functions.getInstance().fireAdjustEvent("eepdwq");
                    Functions.getInstance().fireFirebaseEvent(
                      "DraftPickButton"
                    );
                    let properties = new MoEProperties();
                    properties.addAttribute("clicked", true);
                    ReactMoE.trackEvent("Pick", properties);
                    onPicked(item.item, true);
                  }}
                >
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
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar backgroundColor="#111111" />
      {/* <ScrollView style={styles.exvw}> */}

      <View style={[styles.tmslcnmain]}>
        <View style={styles.tmmain}>
          <View style={styles.tmpsmain}>
            <View style={styles.tmlft}>
              <View style={styles.tmsimg}>
                {userPF?.profileImg ==
                "https://s3.ap-south-1.amazonaws.com/player6sports/pl6Uplods/" ? (
                  <Image
                    style={styles.tmsdimg}
                    source={require("../../../assets/images/dummy.png")}
                  />
                ) : (
                  <Image
                    style={styles.tmsdimg}
                    source={
                      userPF
                        ? { uri: myPic }
                        : require("../../../assets/images/dummy.png")
                    }
                  />
                )}
              </View>
              <Text style={[styles.teamnm, styles.wnrtxt, styles.tmname]}>
                {userPF ? userPF?.name : ""}
              </Text>
            </View>
            {/* <View style={[styles.ptmr, styles.sltm]}>
              <Text style={[styles.teamnm, styles.tmrtxt, styles.pktmr]}>
                {currentTime}
              </Text>
            </View> */}
            <View style={[styles.srtby, styles.rnoptn]}></View>
          </View>

          <View style={styles.ptkmain}>
            <View style={[styles.pntlist, { flexBasis: "100%" }]}>
              <View style={styles.ptkmain}>
                <View style={styles.pntlist}>
                  {selectedPlayer?.map((item, index) =>
                    item ? (
                      <View
                        key={index}
                        style={[
                          styles.pntitem,
                          isOpponent ? styles.orngpick : styles.ppicked,
                        ]}
                      >
                        <Image style={styles.wtick} source={TickIcon} />
                      </View>
                    ) : (
                      ""
                    )
                  )}

                  {selectedPlayer && selectedPlayer.length < 12
                    ? strips
                        .slice(-(12 - selectedPlayer.length))
                        .map((data) => {
                          return <View style={styles.pntitem} key={data} />;
                        })
                    : ""}
                </View>
                <TouchableOpacity
                  onPress={() => {
                    handleUnpickAllPlayers();
                    setUnpickStatus(true);
                  }}
                >
                  <View
                    style={[
                      styles.topo,
                      styles.hdoptns,
                      {
                        display: "flex",
                        flexDirection: "row",
                        backgroundColor: "#279bff",
                      },
                    ]}
                  >
                    <Text style={styles.ortxt}>Unpick All</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.tmarmain, styles.plyrhd]}>
          <View style={[styles.tmarlist, styles.plyrshd]}>
            <View style={styles.srtby}>
              <View style={[styles.topo, styles.hdoptns]}>
                <Text style={styles.ortxt}>Players</Text>
              </View>
            </View>
            <View style={[styles.srtby, styles.rnoptn]}>
              <TouchableOpacity
                onPress={() => {
                  Functions.getInstance().fireAdjustEvent("dz0wmb");
                  Functions.getInstance().fireFirebaseEvent(
                    "DraftAvgSortingButton"
                  );
                  let properties = new MoEProperties();
                  properties.addAttribute("Avg", true);
                  ReactMoE.trackEvent("Sort", properties);
                  sortAverage(draftPlayers, "avg");
                }}
              >
                <View
                  style={[
                    styles.topo,
                    styles.hdoptns,
                    { display: "flex", flexDirection: "row" },
                  ]}
                >
                  <Text style={styles.ortxt}>Avg</Text>
                  <Image source={SortIcon} style={{ marginLeft: 5 }} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={[styles.srtby, styles.rnoptn]}>
              <TouchableOpacity
                onPress={() => {
                  Functions.getInstance().fireAdjustEvent("2yj60r");
                  Functions.getInstance().fireFirebaseEvent(
                    "DraftHSSortingButton"
                  );
                  let properties = new MoEProperties();
                  properties.addAttribute("HS", true);
                  ReactMoE.trackEvent("Sort", properties);
                  sortAverage(draftPlayers, "hs");
                }}
              >
                <View
                  style={[
                    styles.topo,
                    styles.hdoptns,
                    { display: "flex", flexDirection: "row" },
                  ]}
                >
                  <Text style={styles.ortxt}>HS</Text>
                  <Image source={SortIcon} style={{ marginLeft: 5 }} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={[styles.srtby, styles.rnoptn]}>
              <View style={[styles.topo, styles.hdoptns]}>
                <Text style={styles.ortxt}>Pick</Text>
              </View>
            </View>
          </View>
        </View>

        <FlatList
          data={draftPlayers}
          keyExtractor={(item, index) => index}
          renderItem={playersData}
          ListHeaderComponent={<View style={{ paddingTop: 10 }} />}
          ListFooterComponent={<View style={{ paddingBottom: 130 }} />}
        />
      </View>

      {/* </ScrollView> */}

      <View style={styles.nxtfix}>
        <Pressable
          disabled={isButtonDisabled}
          onPress={() => {
            // console.log("Venkys list selected playersList scr :", players);
            Functions.getInstance().fireAdjustEvent("a8o2oa");
            Functions.getInstance().fireFirebaseEvent("DraftNextButton");
            let properties = new MoEProperties();
            properties.addAttribute("clicked", true);
            ReactMoE.trackEvent("Next", properties);
            if (selectedPlayer.length < 12) {
              Functions.getInstance().Toast(
                "error",
                "You need to pick 12 players"
              );
            } else {
              savingTheBasicDraft();
            }
          }}
        >
          {isOpponent ? (
            <View
              style={[
                styles.nxtfixbtn,
                { backgroundColor: isButtonDisabled ? "gray" : "#279bff" },
              ]}
            >
              <Text style={styles.nxtbtn}>Next</Text>
            </View>
          ) : (
            <View
              style={[
                styles.nxtfixbtn,
                { backgroundColor: isButtonDisabled ? "gray" : "#279bff" },
              ]}
            >
              <Text style={styles.nxtbtn}>Next</Text>
            </View>
          )}
        </Pressable>
      </View>

      {isModalVisible ? (
        <PlayerDetailsPopup
          isVisible={isModalVisible}
          data={playerStatistics}
          data1={playerStatistics1}
          closeModal={toggleModal}
        />
      ) : (
        ""
      )}
    </SafeAreaView>
  );
};

export default WithProgress(inject("UserStore")(observer(Draft)));
