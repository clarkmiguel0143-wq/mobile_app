import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import LandingNavigator from './pages/landing/LandingNavigator';
import AppHomeNavigator from './pages/AppHome/AppHomeNavigator';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Landing"
          screenOptions={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        >
          <Stack.Screen name="Landing" component={LandingNavigator} />
          <Stack.Screen name="MainApp" component={AppHomeNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}