import { createAllNavStackNavigator } from './AppRoutes';
import BettingAddMoney from '../components/screens/myTeamScreens/BettingAddMoney';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppBackHeader } from '../components/screens/drawerStack/AppBackHeader';
import { PlayerSelectionRoutes } from './PlayerSelectionRoutes';


const MyTeamStack = createNativeStackNavigator();
export function MyTeamSelectionRoutes(){
  return (
    <MyTeamStack.Navigator
      initialRouteName="BettingAddMoney"
      screenOptions={(props) => AppBackHeader(props)}>
      <MyTeamStack.Screen
        name="BettingAddMoney"
        component={BettingAddMoney} />

        {/* <MyTeamStack.Screen
          name="PlayerSelection"
          component={PlayerSelectionRoutes}
          options={{ headerShown: false }} 
        />   */}




      {/* <MyTeamStack.Screen
        name="BothTeamSelection"
        component={BothTeamSelection} />
        <MyTeamStack.Screen
        name="BothTeamOpponentSelection"
        component={BothTeamOpponentSelection} />
      <MyTeamStack.Screen
        name="SelectedTeam"
        component={SelectedTeam} />
        <MyTeamStack.Screen
        name="OpponentSelectedTeam"
        component={OpponentSelectedTeam} />
      <MyTeamStack.Screen
        name="GoodLuckTeam"
        component={GoodLuckTeamSlection} />
      <MyTeamStack.Screen
        name="RunningMatch"
        component={RunningMatch} />
      <MyTeamStack.Screen
        name="TotalResult"
        component={TotalResult} /> */}
    </MyTeamStack.Navigator>
  );
}