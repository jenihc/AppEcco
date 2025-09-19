import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Modal, ScrollView } from 'react-native';

export default function EscolhaReciclagem({ navigation }) {
  const { height } = Dimensions.get('window');

  const [modalVisible, setModalVisible] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

  const opcoes = [
    { label: 'Não\nReciclável', color: '#555555', itens: ['Embalagens sujas', 'Papel carbono', 'Cerâmica'] },
    { label: 'Orgânico', color: '#8D6E63', itens: ['Restos de comida', 'Casca de fruta', 'Folhas'] },
    { label: 'Vidro', color: '#4CAF50', itens: ['Garrafas', 'Potes de vidro', 'Jarras'] },
    { label: 'Papel', color: '#2196F3', itens: ['Folhas de papel', 'Revistas', 'Caixas de papelão'] },
    { label: 'Metal', color: '#FFEB3B', itens: ['Latas', 'Tampas', 'Ferragens'], textColor: '#000' },
    { label: 'Plástico', color: '#F44336', itens: ['Garrafas PET', 'Embalagens plásticas', 'Sacos plásticos'] },
  ];

  const handleEscolha = (opcao) => {
    setCategoriaSelecionada(opcao);
    setModalVisible(true);
  };

  const handleJogar = () => {
    setModalVisible(false);
    navigation.navigate('Jogar', { tipo: categoriaSelecionada.label.replace('\n', ' ') });
  };

  return (
    <View style={[styles.container, { minHeight: height }]}>
      <Text style={styles.h1}>Escolha o Tipo de Reciclagem</Text>

      <View style={styles.transparentContainer}>
        <View style={styles.grid}>
          {opcoes.map((opcao, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.button, { backgroundColor: opcao.color }]}
              onPress={() => handleEscolha(opcao)}
            >
              <Text
                style={[
                  styles.buttonText,
                  opcao.label.includes('Metal') ? { color: '#000' } : {},
                  opcao.textColor ? { color: opcao.textColor } : {},
                ]}
              >
                {opcao.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.voltarButton} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>⬅ Voltar</Text>
      </TouchableOpacity>

      {categoriaSelecionada && (
        <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{categoriaSelecionada.label.replace('\n', ' ')}</Text>
              <ScrollView style={{ maxHeight: 150, marginVertical: 50 }}>
                {categoriaSelecionada.itens.map((item, idx) => (
                  <Text key={idx} style={styles.modalText}>
                    • {item}
                  </Text>
                ))}
              </ScrollView>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: '#EF5350' }]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Sair</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: '#66BB6A' }]}
                  onPress={handleJogar}
                >
                  <Text style={styles.modalButtonText}>Jogar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#FCFBE8', // verde mais transparente
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5f7f22',
    marginBottom: 40,
    textAlign: 'center',
  },
  
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    width: 110,
    height: 120,
    borderRadius: 12,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  voltarButton: {
    width: 120,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#79a42b', // botão voltar verde folha
    elevation: 3,
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '70%',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 14,
    color: '#33691E',
    marginVertical: 3,
    marginHorizontal: 10,

    textAlign: 'flex-start',

  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
