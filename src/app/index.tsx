import { View, Text, Image, Button, Alert, StyleSheet, Pressable } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C1FF72',
  },
  logo: {
    width: 156,
    height: 156,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 20,
  },
  button: {
    width: '80%',
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 50,
    color: '#005429',
    backgroundColor: '#005429',
  },
  buttonText: {
    color:'#FFF',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default function Index() {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo-normal.png')} style={styles.logo} />
      <Text style={styles.title} >Bem-Vindo(a)</Text>

      <Pressable style={styles.button} onPress={() => Alert.alert('apertou')}>
        <Text style={styles.buttonText}>ENTRAR</Text>
      </Pressable>


      <Pressable style={styles.button} onPress={() => Alert.alert('apertou')}>
        <Text style={styles.buttonText}>CADASTRE-SE</Text>
      </Pressable>

    </View>
  )
}