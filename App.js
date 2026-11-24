import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './resources/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    //<View style={styles.container}>
     // <Text>hello po baby </Text>
     // <StatusBar style="auto" />
    //</View>
    <GestureHandlerRootView style={{ flex: 1}}>
        <AppNavigator />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e2c5c5',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
