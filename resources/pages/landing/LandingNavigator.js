import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import WelcomeScreen from './Welcome';
import LoginScreen from './Login';
import RegistrationScreen from './Registration';

const Stack = createStackNavigator();

export default function LandingNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
    </Stack.Navigator>
  );
}