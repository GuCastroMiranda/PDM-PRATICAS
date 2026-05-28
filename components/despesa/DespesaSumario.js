import { View, Text, StyleSheet } from 'react-native';

function DespesaSumario({ despesas, periodo }) {
  const totalExpenses = despesas
    .filter(d => !d.category.isIncome)
    .reduce((sum, d) => sum + d.value, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodo}</Text>
      <Text style={styles.sum}>R$ {totalExpenses.toFixed(2)}</Text>
    </View>
  );
}

export default DespesaSumario;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#3e047c',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  period: {
    fontSize: 14,
    color: '#fff',
  },
  sum: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});