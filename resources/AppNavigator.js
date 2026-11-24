import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import LandingNavigator from './pages/landing/LandingNavigator';
import AppHomeNavigator from './pages/AppHome/AppHomeNavigator';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen
          name="Landing"
          component={LandingNavigator}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MainApp"
          component={AppHomeNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}