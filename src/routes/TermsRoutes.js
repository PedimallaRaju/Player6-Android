import { createStackNavigator } from '@react-navigation/stack';
import { AppBackHeader } from '../components/screens/drawerStack/AppBackHeader';
import TermsAndCondition from '../components/screens/policy/TermsAndCondition';
import Privacy from '../components/screens/policy/Privacy';

const TeamStack = createStackNavigator();

export function TermsRoutes() {
  return (
    <TeamStack.Navigator
      screenOptions={(props) => AppBackHeader(props)} initialRouteName='TermsFile'>
      <TeamStack.Screen
        name="TermsFile"
        options={{ headerShown: true }}
        component={TermsAndCondition} />
    </TeamStack.Navigator>
  );
}
