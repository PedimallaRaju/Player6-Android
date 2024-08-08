import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppBackHeader } from '../components/screens/drawerStack/AppBackHeader';
import TotalResult from '../components/screens/history/TotalResult';

const HistoryStack = createNativeStackNavigator();

export function HistoryRoutes(){
  return (
    <HistoryStack.Navigator screenOptions={(props) => AppBackHeader(props)}>
      <HistoryStack.Screen
        name="TotalResult"
        component={TotalResult} />
    </HistoryStack.Navigator>
  );
}
