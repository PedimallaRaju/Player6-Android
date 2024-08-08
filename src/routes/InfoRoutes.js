import { createStackNavigator } from '@react-navigation/stack';
import { AppBackHeader } from '../components/screens/drawerStack/AppBackHeader';
import Instructions from '../components/screens/info/Instructions';
import InfoDetails from '../components/screens/info/InfoDetails';



const TeamStack = createStackNavigator();

export function InfoRoutes() {
  return (
    <TeamStack.Navigator
      screenOptions={(props) => AppBackHeader(props)} initialRouteName='Instructions'>
      <TeamStack.Screen
        name="Instructions"
        options={{ headerShown: true }}
        component={Instructions} />

    <TeamStack.Screen
        name="InfoDetails"
        options={{ headerShown: true }}
        component={InfoDetails} />
      
    </TeamStack.Navigator>
  );
}
