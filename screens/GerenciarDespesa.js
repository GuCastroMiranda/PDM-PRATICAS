import { View, Text, TextInput, StyleSheet, Pressable, Button, Alert, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import api from '../services/api';
import IconButton from '../components/IconButton';

function GerenciarDespesa({ route, navigation }) {
  const transactionId = route.params?.transactionId;
  const transactionData = route.params?.transactionData;
  const isEditing = !!transactionId;
  const isFocused = useIsFocused();

  const [data, setData] = useState(isEditing ? new Date(transactionData.date) : new Date());
  const [valor, setValor] = useState(isEditing ? transactionData.value.toString() : '');
  const [descricao, setDescricao] = useState(isEditing ? transactionData.description : '');
  const [categoryId, setCategoryId] = useState(isEditing ? transactionData.categoryId : null);
  const [categories, setCategories] = useState([]);
  const [showPicker, setShowPicker] = useState(false);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await api.get('/categories');
      setCategories(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      setCategories([]);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchCategories();
    }
  }, [isFocused, fetchCategories]);

  const onChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setData(selectedDate);
    }
  };

  const handleChangeValor = (text) => {
    const cleanText = text.replace(',', '.');
    const match = cleanText.match(/^\d*\.?\d{0,2}$/);
    if (match) setValor(cleanText);
  };

  async function handleConfirm() {
    if (!descricao || !valor || !categoryId) {
      Alert.alert('Aviso', 'Preencha todos os campos e selecione uma categoria.');
      return;
    }

    const payload = {
      description: descricao,
      value: parseFloat(valor),
      date: data.toISOString().split('T')[0],
      categoryId: categoryId,
    };

    try {
      if (isEditing) {
        await api.put(`/transactions/${transactionId}`, payload);
      } else {
        await api.post('/transactions', payload);
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar os dados.');
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          maxLength={50}
          value={descricao}
          onChangeText={setDescricao}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Valor</Text>
        <TextInput
          style={styles.input}
          keyboardType="decimal-pad"
          maxLength={10}
          value={valor}
          onChangeText={handleChangeValor}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Data</Text>
        <Pressable onPress={() => setShowPicker(true)} style={styles.input}>
          <Text>{data.toLocaleDateString('pt-BR')}</Text>
        </Pressable>
        {showPicker && (
          <DateTimePicker value={data} mode="date" display="default" onChange={onChange} />
        )}
      </View>

      <View style={styles.inputContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.label}>Categoria</Text>
          <Pressable onPress={() => navigation.navigate('GerenciarCategorias')}>
            <Text style={{ color: '#007AFF', fontSize: 12 }}>+ Nova Categoria</Text>
          </Pressable>
        </View>
        <View style={styles.categoriesContainer}>
          {(Array.isArray(categories) ? categories : []).map((cat) => (
            <Pressable
              key={cat.id}
              style={[
                styles.categoryItem,
                { backgroundColor: categoryId === cat.id ? cat.background : '#eee' }
              ]}
              onPress={() => setCategoryId(cat.id)}
            >
              <Text style={{ color: categoryId === cat.id ? '#fff' : '#000' }}>
                {cat.displayName}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <Button title={isEditing ? 'Atualizar' : 'Adicionar'} onPress={handleConfirm} />
        <Button title="Cancelar" color="red" onPress={() => navigation.goBack()} />
      </View>
    </ScrollView>
  );
}

export default GerenciarDespesa;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  inputContainer: {
    marginBottom: 20,
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
    fontSize: 16,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingBottom: 40,
  },
});
