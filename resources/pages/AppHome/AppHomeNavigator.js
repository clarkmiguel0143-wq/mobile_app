import { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserContext from '../../data/UserContext';
import { user as initialUser } from '../../data/user';
import HomeScreen from './Home';
import ProfileScreen from './Profile';
import EditProfileScreen from './EditProfile';
import PrivacySecurityScreen from './PrivacySecurity';

const Stack = createNativeStackNavigator();

export default function AppHomeNavigator() {
  const [profile, setProfile] = useState(initialUser);

  return (
    <UserContext.Provider value={{ profile, setProfile }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Dashboard" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="PrivacySecurity" component={PrivacySecurityScreen} />
      </Stack.Navigator>
    </UserContext.Provider>
  );
}