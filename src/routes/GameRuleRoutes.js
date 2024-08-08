import { createStackNavigator } from '@react-navigation/stack';
import { AppBackHeader } from '../components/screens/drawerStack/AppBackHeader';
import TermsAndCondition from '../components/screens/policy/TermsAndCondition';
import Privacy from '../components/screens/policy/Privacy';
import GameRules from '../components/screens/policy/GameRules';

const TeamStack = createStackNavigator();

export function GameRuleRoutes() {
  return (
    <TeamStack.Navigator
      screenOptions={(props) => AppBackHeader(props)} initialRouteName='GameRuleFile'>
      <TeamStack.Screen
        name="GameRuleFile"
        options={{ headerShown: true }}
        component={GameRules} />
    </TeamStack.Navigator>
  );
}
