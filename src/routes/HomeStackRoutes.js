import { createNativeStackNavigator } from "@react-navigation/native-stack";
import  {CommonHeader}  from "../components/screens/drawerStack/AppHeader";
import EntryFee from "../components/screens/cricketLeague/EntryFee";
import FindOpponent from "../components/screens/cricketLeague/FindOpponent";
import GameRoom from "../components/screens/cricketLeague/GameRoom";
import PickTeamForToss from "../components/screens/cricketLeague/PickTeamForToss";
import OpponentChooseToss from "../components/screens/cricketLeague/OpponentChooseToss";
import TossWon from "../components/screens/cricketLeague/TossWon";
import TossLoss from "../components/screens/cricketLeague/TossLoss";
import { DraftRoute } from "./DraftRoute";
import { ProfileRoutes } from "./ProfileRoutes";
import { useNavigation } from "@react-navigation/native";
import CricketLeague from "../components/screens/cricketLeague/CricketLeague";
import ChooseContest from "../components/screens/cricketLeague/ChooseContest";
import Functions from "../components/screens/Functions";
import { useEffect, useState } from "react";
import UserStore from "../components/stores/UserStore";
import OPCT from "../components/screens/cricketLeague/OPCT";
import PTFT from "../components/screens/cricketLeague/PTFT";
import InteractionPage from "../components/screens/cricketLeague/InteractionPage";
import OpnInteraction from "../components/screens/cricketLeague/OpnInteraction";
import BothTeamOpponentSelection from "../components/screens/playerSelection/BothTeamOpponentSelection";
import CaptainViceCaptainSelection from "../components/screens/playerSelection/CaptainViceCaptainSelection";
import { PlayerSelectionRoutes } from "./PlayerSelectionRoutes";
import PlayersInteraction from "../components/screens/cricketLeague/PlayersInteraction";
import TossInteraction from "../components/screens/cricketLeague/TossInteraction";
import RunningMatch from "../components/screens/liveMatchDetails/RunningMatch";
import GoodLuck from "../components/screens/playerSelection/GoodLuck";
import InternetChecker from "../components/screens/playerSelection/InternetChecker";



const HomeStack = createNativeStackNavigator();
export const HomeStackStack = () => {
 
    return (
      <HomeStack.Navigator
        initialRouteName="CricketLeague"
        screenOptions={props => CommonHeader(props)}
        >
        <HomeStack.Screen name="CricketLeague" component={CricketLeague}/>
        <HomeStack.Screen name="ChooseContest" component={ChooseContest} />
        <HomeStack.Screen name="EntryFee" component={EntryFee} />
        <HomeStack.Screen name="FindOpponent" component={FindOpponent} />
        <HomeStack.Screen name="GameRoom" component={GameRoom} />
        <HomeStack.Screen name="PickTeamForToss" component={PickTeamForToss} />
        <HomeStack.Screen name="OpponentChooseToss" component={OpponentChooseToss} />
        <HomeStack.Screen name="TossWon" component={TossWon} />
        <HomeStack.Screen name="TossLoss" component={TossLoss} />
        <HomeStack.Screen name="OPCT" component={OPCT} />
        <HomeStack.Screen name="PTFT" component={PTFT} />
        <HomeStack.Screen name="InteractionPage" component={InteractionPage} />
        <HomeStack.Screen name="OpnInteraction" component={OpnInteraction} />
        <HomeStack.Screen name="PlayersInteraction" component={PlayersInteraction} />
        <HomeStack.Screen name="TossInteraction" component={TossInteraction} />
        <HomeStack.Screen
          name="DraftRoute"
          component={DraftRoute}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Profile"
          component={ProfileRoutes}
          options={{ headerShown: false }}
        />

        {/* <HomeStack.Screen
          name="PlayerSelection"
          component={PlayerSelectionRoutes}
          options={{ headerShown: false }} 
        /> */}


      <HomeStack.Screen
        name="BothTeamOpponentSelection"
        component={BothTeamOpponentSelection} />
    
      <HomeStack.Screen
        name="CaptainViceCaptainSelection"
        component={CaptainViceCaptainSelection} />

      <HomeStack.Screen
        name="GoodLuck"
        component={GoodLuck} />

      <HomeStack.Screen
        name="RunningMatch"
        component={RunningMatch} />


      <HomeStack.Screen
        name="InternetChecker"
        component={InternetChecker} />












      </HomeStack.Navigator>
    );
  };