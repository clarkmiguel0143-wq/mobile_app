import { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserContext from '../../data/UserContext';
import { privacySettings as initialPrivacySettings, user as initialUser } from '../../data/user';
import initialNotifications from '../../data/notifications';
import HomeScreen from './Home';
import ProfileScreen from './Profile';
import EditProfileScreen from './EditProfile';
import PrivacySecurityScreen from './PrivacySecurity';
import NotificationsScreen from './Notifications';

const Stack = createNativeStackNavigator();

export default function AppHomeNavigator() {
  const [profile, setProfile] = useState(initialUser);
  const [privacySettings, setPrivacySettings] = useState(initialPrivacySettings);
  const [notifications, setNotifications] = useState(initialNotifications);

  return (
    <UserContext.Provider
      value={{
        profile,
        setProfile,
        privacySettings,
        setPrivacySettings,
        notifications,
        setNotifications,
      }}
    >
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
            sheetAllowedDetents: [0.55, 0.85],
            sheetInitialDetentIndex: 0,
            sheetGrabberVisible: true,
            sheetCornerRadius: 24,
            contentStyle: { backgroundColor: 'transparent' },
          }}
        />
      </Stack.Navigator>
    </UserContext.Provider>
  );
}