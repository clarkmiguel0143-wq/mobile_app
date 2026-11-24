import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

export default function RegistrationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>

      <View style={styles.actions}>
        <Pressable
          style={styles.button}
          onPress={() => Alert.alert('Registration', 'Account creation is not available yet.')}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Back to Login</Text>
        </Pressable>
      </View>
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
    paddingHorizontal: 24,
  },
  title: {
    marginBottom: 8,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  actions: {
    width: '100%',
    maxWidth: 360,
    gap: 8,
  },
  button: {
    width: '100%',
    height: 48,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '600',
  },
});
