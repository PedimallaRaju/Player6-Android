
import { AppBackHeader } from '../components/screens/drawerStack/AppBackHeader';
import AddMoneyWallet from '../components/screens/wallet/AddMoneyWallet';
import RedeemWallet from '../components/screens/wallet/RedeemWallet';
import WalletScreen from '../components/screens/wallet/WalletScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// const WalletStack = createAllNavStackNavigator();
const WalletStack = createNativeStackNavigator();

export function WalletRoutes() {
  return (
    <WalletStack.Navigator screenOptions={(props) => AppBackHeader(props)}>
      <WalletStack.Screen
        name="Wallet"
        component={WalletScreen} />
      {/* <WalletStack.Screen
        name="RedeemMoney"
        component={RedeemMoneyScreen} /> */}
      <WalletStack.Screen
        name="AddMoney"
        component={AddMoneyWallet} />

      <WalletStack.Screen
        name="RedeemMoney"
        component={RedeemWallet} />

    </WalletStack.Navigator>
  );
}
