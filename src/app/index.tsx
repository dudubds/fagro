import { View, Text, Image, StyleSheet, Pressable, Modal, Alert } from 'react-native';
import React, { useState } from 'react';
import { Link } from 'expo-router';

export default function Index() {
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo-normal.png')} style={styles.logo} />
      <Text style={styles.title}>Bem-Vindo(a)</Text>

      <Pressable style={styles.button} onPress={() => setLoginModalVisible(true)}>
        <Text style={styles.buttonText}>ENTRAR</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => setRegisterModalVisible(true)}>
        <Text style={styles.buttonText}>CADASTRE-SE</Text>
      </Pressable>

      <Modal
        visible={loginModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setLoginModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Formulário de Login</Text>
            <Pressable style={styles.modalButton} onPress={() => setLoginModalVisible(false)}>
              <Text style={styles.buttonText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        visible={registerModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setRegisterModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            
            {/* <View style={styles.modalContent}> */}
                <Link href={'/consumidor'}>
                  <View style={styles.modalSubContent}>
                    <Image source={require('../../assets/images/consumidores.png')} style={styles.imagesPerson} />
                    <Text style={styles.subContentText}>Consumidor</Text>
                  </View>
                </Link>


                <Link href={'/agricultor'} >
                  <View style={styles.modalSubContent}>
                    <Image source={require('../../assets/images/agricultores.png')} style={styles.imagesPerson} />
                    <Text style={styles.subContentText} >Agricultor</Text>
                  </View>
                </Link>

            <Pressable style={styles.modalButton} onPress={() => setRegisterModalVisible(false)}>
              <Text style={styles.buttonText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

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
  imagesPerson: {
    width: 100,
    height: 100,
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
    backgroundColor: '#005429',
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFF',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
    display: 'flex',
    gap: 20,
  },
  modalSubContent: {
    width: 150,
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#C1FF72',
    alignItems: 'center',
  },
  subContentText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#005429',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#005429',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
});