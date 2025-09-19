// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet } from 'react-native';

// Importação das telas
import Home from './screens/Home';
import Instrucoes from './screens/Instrucoes';
import Jogo from './screens/Jogo';
import Escolha from './screens/Escolha';


const Stack = createNativeStackNavigator();

// Tela exemplo HQ


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Escolha" component={Escolha} />
        <Stack.Screen name="Jogar" component={Jogo} />
        <Stack.Screen name="Instruções" component={Instrucoes} />
  
        {/* Corrigido aqui: era HQ → agora HQScreen */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F8E9',
  },
  text: {
    fontSize: 20,
    color: '#33691E',
    textAlign: 'center',
  },
});
