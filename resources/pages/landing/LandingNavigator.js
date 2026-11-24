import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Login';
import RegistrationScreen from './Registration';

const Stack = createStackNavigator();

export default function LandingNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
    </Stack.Navigator>
  );
}