import { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
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
      setDespesas(response.data);
    } catch (error) {
      console.error('Erro ao buscar despesas', error);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchDespesas();
    }
  }, [isFocused, fetchDespesas]);

  const filteredDespesas = despesas.filter(t => {
    const tDate = new Date(t.date);
    return tDate.getMonth() === selectedDate.getMonth() && 
           tDate.getFullYear() === selectedDate.getFullYear();
  });

  return (
    <View style={styles.container}>
      <MonthYearFilter selectedDate={selectedDate} onDateChange={setSelectedDate} />
      <DespesaSaida 
        despesas={filteredDespesas} 
        periodo="Total do Mês" 
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
});
