import { createStackNavigator } from '@react-navigation/stack';
import { AppBackHeader } from '../components/screens/drawerStack/AppBackHeader';
import Draft from '../components/screens/draft/Draft';
import DragNDrop from '../components/screens/draft/DragNDrop';
import DraftPreview from '../components/screens/draft/DraftPreview';

const TeamStack = createStackNavigator();

export function DraftRoute() {
  return (
    <TeamStack.Navigator
      screenOptions={(props) => AppBackHeader(props)}>
      <TeamStack.Screen
        name="TeamSelection"
        component={Draft} />

      <TeamStack.Screen
        name="DragAndDrop"
        component={DragNDrop} /> 

      <TeamStack.Screen
      name="DraftPreview"
      component={DraftPreview} />        
      
    </TeamStack.Navigator>
  );
}
