import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './resources/AppNavigator';
import styles from './App.styles';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <AppNavigator />
    </GestureHandlerRootView>
  );
}
