import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';

export default function Instrucoes({ navigation }) {
  const { height } = Dimensions.get('window');

  return (
    <ScrollView 
      contentContainerStyle={[styles.container, { minHeight: height }]} 
    >
      {/* H1 */}
      <Text style={styles.h1}>Instruções :</Text>
      {/* Subtítulo */}
      <Text style={[styles.subtitle, { marginBottom: 30 }]}>
        Aprenda a jogar com Ecco e salve o planeta!
      </Text>

      <View style={styles.card}>
        <Text style={styles.h2}>🎯 Objetivo</Text>
        <Text style={styles.cardText}>
          Ajude Ecco, o herói da reciclagem, a separar corretamente os materiais recicláveis.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.h2}>♻  Como Jogar :</Text> 
        <Text style={styles.cardTex}>Escolha o tipo de reciclagem</Text>
        
        <Text style={styles.cardText}>• <Text style={{ color: '#808080', fontWeight: 'bold' }}>Cinza</Text> → Não recicláveis</Text>
        <Text style={styles.cardText}>• <Text style={{ color: '#2196F3', fontWeight: 'bold' }}>Azul</Text> → Papel</Text>
        <Text style={styles.cardText}>• <Text style={{ color: '#F44336', fontWeight: 'bold' }}>Vermelho</Text> → Plástico</Text>
        <Text style={styles.cardText}>• <Text style={{ color: '#4CAF50', fontWeight: 'bold' }}>Verde</Text> → Vidro</Text>
        <Text style={styles.cardText}>• <Text style={{ color: '#FFEB3B', fontWeight: 'bold' }}>Amarelo</Text> → Metal</Text>
        <Text style={styles.cardText}>• <Text style={{ color: '#8D6E63', fontWeight: 'bold' }}>Marrom</Text> → Orgânicos</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>• Capture apenas os materiais da cor escolhida.</Text>
        <Text style={styles.cardText}>• Capturar itens errados faz você perder pontos!</Text>
        <Text style={styles.cardText}>• Colete o máximo de itens corretos antes do tempo acabar.</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>⬅ Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    flexGrow: 1, // Faz o container crescer para ocupar o espaço
  },
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 5,
    textAlign: 'center',
    marginTop: 80,
  },
  h2: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E7D32',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 13,
    color: '#388E3C',
    marginBottom: 10,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    width: '90%',
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  cardText: {
    fontSize: 13,
    color: '#33691E',
    marginBottom: 6,
    lineHeight: 18,
    marginStart: 15,
  },
  cardTex: {
    fontSize: 13,
    color: '#33691E',
    marginBottom: 20,
    lineHeight: 18,
  },
  button: {
    marginTop: 15,
    marginBottom: 30,
    backgroundColor: '#66BB6A',
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 10,
    elevation: 5,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '500',
  },
});
