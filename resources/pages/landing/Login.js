
import { StyleSheet, Text, View, Button } from 'react-native';

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>Please login to continue.</Text>

      <Button
        title="Login"
        onPress={() => navigation.getParent()?.reset({
          index: 0,
          routes: [{ name: 'MainApp' }],
        })}
      />
      <Button
        title="Register"
        onPress={() => navigation.navigate('Registration')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c39e9e',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff',
  },
});
