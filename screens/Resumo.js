import { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useIsFocused } from '@react-navigation/native';
import api from '../services/api';
import MonthYearFilter from '../components/MonthYearFilter';

function Resumo() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [transactions, setTransactions] = useState([]);
  const isFocused = useIsFocused();

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await api.get('/transactions');
      setTransactions(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Erro ao buscar transações', error);
      setTransactions([]);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchTransactions();
    }
  }, [isFocused, fetchTransactions]);

  const safeTransactions = Array.isArray(transactions) ? transactions : [];

  const filteredTransactions = safeTransactions.filter(t => {
    const tDate = new Date(t.date);
    return tDate.getMonth() === selectedDate.getMonth() && 
           tDate.getFullYear() === selectedDate.getFullYear();
  });

  const categoryData = filteredTransactions.reduce((acc, t) => {
    const catName = t.category?.displayName || 'Outros';
    if (!acc[catName]) {
      acc[catName] = {
        name: catName,
        population: 0,
        color: t.category?.background || '#ccc',
        legendFontColor: '#7F7F7F',
        legendFontSize: 12
      };
    }
    acc[catName].population += t.value;
    return acc;
  }, {});
  const chartData = Object.values(categoryData);

  const totalExpenses = filteredTransactions
    .filter(t => !t.category.isIncome)
    .reduce((sum, t) => sum + t.value, 0);

  const totalIncome = filteredTransactions
    .filter(t => t.category.isIncome)
    .reduce((sum, t) => sum + t.value, 0);

  return (
    <ScrollView style={styles.container}>
      <MonthYearFilter selectedDate={selectedDate} onDateChange={setSelectedDate} />
      
      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Receitas</Text>
          <Text style={[styles.summaryValue, { color: 'green' }]}>R$ {totalIncome.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Despesas</Text>
          <Text style={[styles.summaryValue, { color: 'red' }]}>R$ {totalExpenses.toFixed(2)}</Text>
        </View>
      </View>

      <Text style={styles.chartTitle}>Despesas por Categoria</Text>
      {chartData.length > 0 ? (
        <PieChart
          data={chartData}
          width={Dimensions.get('window').width - 48}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          absolute
        />
      ) : (
        <Text style={styles.noData}>Nenhuma transação para este período.</Text>
      )}
    </ScrollView>
  );
}

export default Resumo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  noData: {
    textAlign: 'center',
    marginTop: 20,
    color: '#999',
  },
});
