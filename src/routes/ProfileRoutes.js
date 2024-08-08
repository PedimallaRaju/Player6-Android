import { createStackNavigator } from '@react-navigation/stack';
import { AppBackHeader } from '../components/screens/drawerStack/AppBackHeader';
import EditProfile from '../components/screens/editProfile/EditProfile';
import EnterNewEmail from '../components/screens/editProfile/EnterNewEmail';
import EnterOTP from '../components/screens/editProfile/EnterOTP';

const TeamStack = createStackNavigator();

export function ProfileRoutes() {
  return (
    <TeamStack.Navigator
      screenOptions={(props) => AppBackHeader(props)} initialRouteName='UpdateProfile'>
      <TeamStack.Screen
        name="UpdateProfile"
        options={{ headerShown: true }}
        component={EditProfile} />

    <TeamStack.Screen
        name="EnterNewEmail"
        options={{ headerShown: false }}
        component={EnterNewEmail} />

    <TeamStack.Screen
        name="EnterOTP"
        options={{ headerShown: false }}
        component={EnterOTP} />
      
    </TeamStack.Navigator>
  );
}
