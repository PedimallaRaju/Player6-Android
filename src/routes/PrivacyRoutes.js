import { createStackNavigator } from '@react-navigation/stack';
import { AppBackHeader } from '../components/screens/drawerStack/AppBackHeader';
import Privacy from '../components/screens/policy/Privacy';

const TeamStack = createStackNavigator();

export function PrivacyRoutes() {
  return (
    <TeamStack.Navigator
      screenOptions={(props) => AppBackHeader(props)} initialRouteName='PrivacyFile'>
      <TeamStack.Screen
        name="PrivacyFile"
        options={{ headerShown: true }}
        component={Privacy} />
    </TeamStack.Navigator>
  );
}
