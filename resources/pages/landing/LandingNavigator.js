import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from './Login';

const Stack = createStackNavigator();

export default function LandingNavigator() {
  return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator> 
  );
}