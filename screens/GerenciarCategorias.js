import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert, Switch } from 'react-native';
import api from '../services/api';

function GerenciarCategorias({ navigation }) {
  const [name, setName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [icon, setIcon] = useState('star'); // Default icon
  const [background, setBackground] = useState('#000000'); // Default color
  const [isIncome, setIsIncome] = useState(false);

  async function handleSave() {
    if (!name || !displayName) {
      Alert.alert('Aviso', 'Preencha o nome técnico e o nome de exibição.');
      return;
    }

    try {
      await api.post('/categories', {
        name: name.toLowerCase(),
        displayName,
        icon,
        background,
        isIncome
      });
      Alert.alert('Sucesso', 'Categoria criada com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar a categoria.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome Técnico (Ex: 'compras')</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Nome de Exibição (Ex: 'Compras')</Text>
      <TextInput style={styles.input} value={displayName} onChangeText={setDisplayName} />

      <Text style={styles.label}>Cor de Fundo (Hex)</Text>
      <TextInput style={styles.input} value={background} onChangeText={setBackground} />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>É Receita?</Text>
        <Switch value={isIncome} onValueChange={setIsIncome} />
      </View>

      <Button title="Criar Categoria" onPress={handleSave} />
    </View>
  );
}

export default GerenciarCategorias;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
});
