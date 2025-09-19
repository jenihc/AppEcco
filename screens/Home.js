// screens/HomeScreen.js
import React from 'react';
import { ImageBackground, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import HQ from '../assets/HQ.png';
import figura from '../assets/figura.png';

export default function Home({ navigation }) {
  return (
    <ImageBackground
      source={HQ}
      style={styles.background}
      resizeMode="cover" // cobre toda a tela
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>O Herói da Reciclagem</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Escolha')}
        >
          <Text style={styles.buttonText}>JOGAR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Instruções')}
        >
          <Text style={styles.buttonText}>INSTRUÇÕES</Text>
        </TouchableOpacity>
      </View>

      {/* Figura fixa no rodapé, abaixo do overlay */}
      <Image source={figura} style={styles.fig} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(255,255,255,0.5)', // leve contraste opcional
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 120,
    width: 320,
  },
  title: {
    fontSize: 25,
    fontWeight: '600',
    color: '#5f7f22',
    marginBottom: 80,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FCFBE8', // bege solicitado
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginVertical: 5,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#5f7f22', // texto verde
    fontSize: 18,
    fontWeight: '800',
  },
  fig: {
    position: 'absolute',
    bottom: 20, // deixa no rodapé
    width: 300,
    height: 200,
    resizeMode: 'contain',
    marginBottom:'20'
  },
});
