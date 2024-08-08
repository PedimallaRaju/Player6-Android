import { createStackNavigator } from '@react-navigation/stack';
import { AppBackHeader } from '../components/screens/drawerStack/AppBackHeader';
import BothTeamOpponentSelection from '../components/screens/playerSelection/BothTeamOpponentSelection';
import CaptainViceCaptainSelection from '../components/screens/playerSelection/CaptainViceCaptainSelection';
import GoodLuck from '../components/screens/playerSelection/GoodLuck';
import RunningMatch from '../components/screens/liveMatchDetails/RunningMatch';


const TeamStack = createStackNavigator();

export function PlayerSelectionRoutes() {
  return (
    <TeamStack.Navigator
      screenOptions={(props) => AppBackHeader(props)} initialRouteName='BothTeamOpponentSelection'>
      <TeamStack.Screen
        name="BothTeamOpponentSelection"
        options={{ headerShown: true }}
        component={BothTeamOpponentSelection} />
    
      <TeamStack.Screen
        name="CaptainViceCaptainSelection"
        options={{ headerShown: true }}
        component={CaptainViceCaptainSelection} />

      <TeamStack.Screen
        name="GoodLuck"
        options={{ headerShown: true }}
        component={GoodLuck} />

      <TeamStack.Screen
        name="RunningMatch"
        options={{ headerShown: true }}
        component={RunningMatch} />
      
    </TeamStack.Navigator>
  );
}
