import React, { useState, useCallback, memo, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../services/api';

const PREDEFINED_COLORS = [
  '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
  '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50',
  '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800',
  '#ff5722', '#795548', '#9e9e9e', '#607d8b', '#000000'
];

const ColorCircle = memo(({ color, isSelected, onSelect }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.colorCircle, { backgroundColor: color }]}
      onPress={() => onSelect(color)}
    >
      {isSelected && (
        <Ionicons name="checkmark" size={20} color="white" />
      )}
    </TouchableOpacity>
  );
});

function GerenciarCategorias({ navigation }) {
  const [name, setName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [icon, setIcon] = useState('star');
  const [background, setBackground] = useState(PREDEFINED_COLORS[0]);
  const [isIncome, setIsIncome] = useState(false);
  const [existingCategories, setExistingCategories] = useState([]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await api.get('/categories');
      setExistingCategories(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleSelectColor = useCallback((color) => {
    setBackground(color);
  }, []);

  async function handleSave() {
    if (!name.trim() || !displayName.trim() || !background) {
      Alert.alert('Atenção', 'Preencha todos os campos corretamente (Nome, Exibição e Cor).');
      return;
    }

    try {
      await api.post('/categories', {
        name: name.toLowerCase().trim(),
        displayName: displayName.trim(),
        icon,
        background,
        isIncome
      });
      
      Alert.alert('Sucesso', 'Categoria criada com sucesso!');
      setName('');
      setDisplayName('');
      fetchCategories();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar a categoria.');
    }
  }

  async function handleDeleteCategory(id, catName) {
    Alert.alert(
      'Confirmar Exclusão',
      `Deseja realmente excluir a categoria "${catName}"? Isso pode afetar transações vinculadas.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: async () => {
            try {
              await api.delete(`/categories/${id}`);
              fetchCategories();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir a categoria.');
            }
          }
        }
      ]
    );
  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Nova Categoria</Text>
        
        <Text style={styles.label}>Nome Técnico (Ex: 'compras')</Text>
        <TextInput 
          style={styles.input} 
          value={name} 
          onChangeText={setName} 
          autoCorrect={false}
          placeholder="Digite o nome técnico..."
        />

        <Text style={styles.label}>Nome de Exibição (Ex: 'Compras')</Text>
        <TextInput 
          style={styles.input} 
          value={displayName} 
          onChangeText={setDisplayName} 
          placeholder="Digite o nome que aparecerá na tela..."
        />

        <Text style={styles.label}>Selecione uma Cor</Text>
        <View style={styles.colorPalette}>
          {PREDEFINED_COLORS.map((color) => (
            <ColorCircle
              key={color}
              color={color}
              isSelected={background === color}
              onSelect={handleSelectColor}
            />
          ))}
        </View>

        <View style={styles.switchContainer}>
          <Text style={styles.label}>É Receita?</Text>
          <Switch value={isIncome} onValueChange={setIsIncome} />
        </View>

        <TouchableOpacity 
          style={styles.saveButton} 
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>CRIAR CATEGORIA</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <Text style={styles.title}>Categorias Existentes</Text>
        <View style={styles.categoriesList}>
          {existingCategories.map((cat) => (
            <View key={cat.id} style={styles.categoryListItem}>
              <View style={styles.categoryInfo}>
                <View style={[styles.miniCircle, { backgroundColor: cat.background }]} />
                <Text style={styles.categoryName}>{cat.displayName}</Text>
              </View>
              <TouchableOpacity onPress={() => handleDeleteCategory(cat.id, cat.displayName)}>
                <Ionicons name="trash-outline" size={22} color="#ff5252" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

export default GerenciarCategorias;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
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
    color: '#000',
  },
  colorPalette: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  colorCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  saveButton: {
    backgroundColor: '#2196f3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 32,
  },
  categoriesList: {
    marginBottom: 20,
  },
  categoryListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  miniCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 12,
  },
  categoryName: {
    fontSize: 16,
    color: '#444',
  },
});
