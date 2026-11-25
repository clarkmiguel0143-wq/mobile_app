import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import HomeScreen from './Home';
import ProfileScreen from './Profile';

const Stack = createStackNavigator();

export default function AppHomeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name="Dashboard" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}