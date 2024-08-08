import { createStackNavigator } from '@react-navigation/stack';
import { AppBackHeader } from '../components/screens/drawerStack/AppBackHeader';
import Refund from '../components/screens/policy/Refund';

const TeamStack = createStackNavigator();

export function RefundRoutes() {
  return (
    <TeamStack.Navigator
      screenOptions={(props) => AppBackHeader(props)} initialRouteName='RefundFile'>
      <TeamStack.Screen
        name="RefundFile"
        options={{ headerShown: true }}
        component={Refund} />
    </TeamStack.Navigator>
  );
}
