import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CommonHeader } from "../components/screens/drawerStack/AppHeader";
import BottomNavigation from "../components/screens/drawerStack/BottomNavigation";







const PlayerStack = createNativeStackNavigator();

export function PlayerRoute(){
  return (
    <PlayerStack.Navigator screenOptions={props => CommonHeader(props)}>
      <PlayerStack.Screen
        name="BottomNavigation"
        component={BottomNavigation}
        options={{ headerShown: false }} />
    </PlayerStack.Navigator>
  );
}