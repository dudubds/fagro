import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function Register() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Página Inicial</Text>
      <Link href="/" style={styles.link}>Ir para Index</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  link: {
    fontSize: 18,
    color: 'blue',
  },
});
