import { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import MonthYearFilter from '../components/MonthYearFilter';
import api from '../services/api';

function TodasDespesas() {
  const [despesas, setDespesas] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const isFocused = useIsFocused();

  const fetchDespesas = useCallback(async () => {
    try {
      const response = await api.get('/transactions');
      setDespesas(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Erro ao buscar despesas', error);
      setDespesas([]); // Garante que despesas seja um array mesmo em caso de erro
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchDespesas();
    }
  }, [isFocused, fetchDespesas]);

  const filteredDespesas = (Array.isArray(despesas) ? despesas : []).filter(t => {
    const tDate = new Date(t.date);
    return tDate.getMonth() === selectedDate.getMonth() && 
           tDate.getFullYear() === selectedDate.getFullYear();
  });

  return (
    <View style={styles.container}>
      <MonthYearFilter selectedDate={selectedDate} onDateChange={setSelectedDate} />
      
      <View style={styles.hintContainer}>
        <Text style={styles.hintText}>
          Dica: Pressione e segure um item para abrir opções de exclusão rápida.
        </Text>
      </View>

      <DespesaSaida 
        despesas={filteredDespesas} 
        periodo="Total do Mês" 
        onRefresh={fetchDespesas}
      />
    </View>
  );
}

export default TodasDespesas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  hintContainer: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 24,
    borderRadius: 8,
    marginTop: 8,
  },
  hintText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
