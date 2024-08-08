import { createStackNavigator } from '@react-navigation/stack';
import { AppBackHeader } from '../components/screens/drawerStack/AppBackHeader';
import KycScreen from '../components/screens/kyc/KycScreen';
import VerifyAdharOTP from '../components/screens/kyc/VerifyAdharOTP';
import BankAccount from '../components/screens/kyc/BankAccount';


const TeamStack = createStackNavigator();

export function KycRoutes() {
  return (
    <TeamStack.Navigator
      screenOptions={(props) => AppBackHeader(props)} initialRouteName='KycPage'>
      <TeamStack.Screen
        name="KycPage"
        options={{ headerShown: false }}
        component={KycScreen} />

    <TeamStack.Screen
        name="VerifyAdharOTP"
        options={{ headerShown: false }}
        component={VerifyAdharOTP} />


    <TeamStack.Screen
        name="BankAccount"
        options={{ headerShown: false }}
        component={BankAccount} />
      
    </TeamStack.Navigator>
  );
}
