import { Link, router } from 'expo-router'; // Importar router
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Image, ScrollView, Alert } from 'react-native';
import { supabase } from '../lib/supabase'; // Importar o cliente Supabase

export default function AgricultorRegister() {
  const [farmName, setFarmName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [farmAddress, setFarmAddress] = useState('');
  const [productsOffered, setProductsOffered] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!farmName || !email || !password || !farmAddress || !productsOffered) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    setLoading(true);
    try {
      // 1. Cadastrar o usuário no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (authError) {
        throw authError;
      }

      if (!authData.user) {
        throw new Error('Usuário não foi criado no Supabase Auth.');
      }

      // 2. Inserir os dados adicionais na tabela 'profiles'
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id, // Link com o usuário autenticado
          user_type: 'agricultor',
          name: farmName,
          email: email, // Adicionando email à tabela profiles
          cpf_cnpj: cnpj,
          address: farmAddress,
          products_offered: productsOffered,
        });

      if (profileError) {
        // Opcional: Tentar deletar o usuário do Auth se a inserção no perfil falhar
        // await supabase.auth.api.deleteUser(authData.user.id); // Cuidado com esta operação
        throw profileError;
      }

      Alert.alert('Sucesso!', 'Agricultor cadastrado com sucesso. Verifique seu e-mail para confirmação.');
      // Navegar para uma tela de sucesso ou login
      router.replace('/'); // Ou para uma tela de "verifique seu email"

    } catch (error: any) {
      console.error('Erro no cadastro:', error);
      Alert.alert('Erro no Cadastro', error.message || 'Não foi possível completar o cadastro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image source={require('../../assets/images/agricultores.png')} style={styles.imagePerson} />
        <Text style={styles.title}>Cadastre-se como Agricultor</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome da Fazenda/Propriedade *"
          value={farmName}
          onChangeText={setFarmName}
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail *"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha *"
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
          maxLength={14}
        />
        <TextInput
          style={styles.input}
          placeholder="Endereço da Fazenda *"
          value={farmAddress}
          onChangeText={setFarmAddress}
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder="Produtos Oferecidos (ex: frutas, legumes) *"
          value={productsOffered}
          onChangeText={setProductsOffered}
          multiline
        />

        <Pressable style={styles.button} onPress={handleRegister} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Registrando...' : 'Registrar Agricultor'}</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C1FF72',
    paddingVertical: 40, // Adicionado padding vertical
    paddingHorizontal: 20,
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