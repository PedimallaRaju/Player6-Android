import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import { PlayerRoute } from '../../../routes/PlayerRoute';
import KycScreen from '../kyc/KycScreen';
import EditProfile from '../editProfile/EditProfile';
import { AppBackHeader } from './AppBackHeader';
import { ProfileRoutes } from '../../../routes/ProfileRoutes';
import { KycRoutes } from '../../../routes/KycRoutes';
import TermsAndCondition from '../policy/TermsAndCondition';
import { TermsRoutes } from '../../../routes/TermsRoutes';
import { PrivacyRoutes } from '../../../routes/PrivacyRoutes';
import { GameRuleRoutes } from '../../../routes/GameRuleRoutes';
import { RefundRoutes } from '../../../routes/RefundRoutes';





const Drawer = createDrawerNavigator();
const screenOptions={
  drawerLabelStyle: {
    color: '#fff',
  },
  swipeEnabled: false,
  drawerPosition: 'left',
  drawerActiveBackgroundColor: '#383838',
  drawerContentStyle: { backgroundColor: '#383838' },
  headerShown: false,
}


export default function DrawerStack() {
  return (
    <Drawer.Navigator
      initialRouteName="PlayerRoute"
      drawerContent={(props) => <CustomDrawer />}
      screenOptions={screenOptions}>
      <Drawer.Screen name="PlayerRoute" component={PlayerRoute} />
      <Drawer.Screen
        name="KYC"
        component={KycRoutes}
        options={{ headerShown: false }} />
      <Drawer.Screen
        name="EditProfile"
        component={ProfileRoutes}
        options={{ headerShown: false }} />
    <Drawer.Screen
        name="TermsAndCondition"
        component={TermsRoutes}
        options={{ headerShown: false }} />
    <Drawer.Screen
        name="Privacy"
        component={PrivacyRoutes}
        options={{ headerShown: false }} />
    <Drawer.Screen
        name="GameRulesData"
        component={GameRuleRoutes}
        options={{ headerShown: false }} />
    <Drawer.Screen
        name="RefundData"
        component={RefundRoutes}
        options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}
