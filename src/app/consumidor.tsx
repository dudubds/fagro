import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Image, ScrollView } from 'react-native';

export default function ConsumidorRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleRegister = () => {
    // Lógica de cadastro para o consumidor
    console.log('Cadastro Consumidor:', { name, email, password, cpf, phone, address });
    // Aqui você pode adicionar a lógica para enviar os dados para o backend
    // e navegar para a próxima tela após o cadastro
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image source={require('../../assets/images/consumidores.png')} style={styles.imagePerson} />
        <Text style={styles.title}>Cadastre-se como Consumidor</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="CPF"
          value={cpf}
          onChangeText={setCpf}
          keyboardType="numeric"
          maxLength={11} // Ajuste conforme o formato do CPF
        />
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          maxLength={15} // Ex: (XX) XXXXX-XXXX
        />
        <TextInput
          style={styles.input}
          placeholder="Endereço Completo"
          value={address}
          onChangeText={setAddress}
          multiline
          numberOfLines={3}
        />
        
        <Pressable style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrar Consumidor</Text>
        </Pressable>

        <Link href="/" style={styles.link}>Voltar para a Tela Inicial</Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center',     // Centraliza horizontalmente
    backgroundColor: '#C1FF72',
    padding: 20,
  },
  imagePerson: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#005429',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '90%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#005429',
  },
  button: {
    width: '90%',
    padding: 15,
    backgroundColor: '#005429',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    fontSize: 16,
    color: '#005429',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});
