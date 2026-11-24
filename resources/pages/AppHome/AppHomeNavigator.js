import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Home';

const Stack = createStackNavigator();

export default function AppHomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
}