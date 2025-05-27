import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Image, ScrollView } from 'react-native';

export default function AgricultorRegister() {
  const [farmName, setFarmName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [farmAddress, setFarmAddress] = useState('');
  const [productsOffered, setProductsOffered] = useState('');

  const handleRegister = () => {
    // Lógica de cadastro para o agricultor
    console.log('Cadastro Agricultor:', { farmName, email, password, cnpj, farmAddress, productsOffered });
    // Aqui você pode adicionar a lógica para enviar os dados para o backend
    // e navegar para a próxima tela após o cadastro
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image source={require('../../assets/images/agricultores.png')} style={styles.imagePerson} />
        <Text style={styles.title}>Cadastre-se como Agricultor</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Nome da Fazenda/Propriedade"
          value={farmName}
          onChangeText={setFarmName}
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
          placeholder="CNPJ (opcional)"
          value={cnpj}
          onChangeText={setCnpj}
          keyboardType="numeric"
          maxLength={14} // Ajuste conforme o formato do CNPJ
        />
        <TextInput
          style={styles.input}
          placeholder="Endereço da Fazenda"
          value={farmAddress}
          onChangeText={setFarmAddress}
          multiline
          numberOfLines={3}
        />
        <TextInput
          style={styles.input}
          placeholder="Produtos Oferecidos (ex: frutas, legumes, grãos)"
          value={productsOffered}
          onChangeText={setProductsOffered}
          multiline
          numberOfLines={2}
        />
        
        <Pressable style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrar Agricultor</Text>
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
