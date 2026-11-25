import { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomNavProvider } from '../../components/BottomNav';
import UserContext from '../../data/UserContext';
import { user as initialUser } from '../../data/user';
import HomeScreen from './Home';
import ProfileScreen from './Profile';
import EditProfileScreen from './EditProfile';
import PrivacySecurityScreen from './PrivacySecurity';
import NotificationsScreen from './Notifications';

const Stack = createNativeStackNavigator();

export default function AppHomeNavigator() {
  const [profile, setProfile] = useState(initialUser);

  return (
    <UserContext.Provider value={{ profile, setProfile }}>
      <BottomNavProvider>
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
          <Stack.Screen
            name="Notifications"
            component={NotificationsScreen}
            options={{
              presentation: 'formSheet',
              animation: 'slide_from_bottom',
              sheetAllowedDetents: [0.25],
              sheetInitialDetentIndex: 0,
              sheetGrabberVisible: true,
              sheetCornerRadius: 24,
              contentStyle: { backgroundColor: 'transparent' },
            }}
          />
        </Stack.Navigator>
      </BottomNavProvider>
    </UserContext.Provider>
  );
}