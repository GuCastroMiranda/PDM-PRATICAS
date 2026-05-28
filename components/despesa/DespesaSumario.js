import { View, Text, StyleSheet } from 'react-native';

function DespesaSumario({ despesas, periodo }) {
  // Cálculo do Saldo: Receitas - Despesas
  const saldo = despesas.reduce((sum, item) => {
    if (item.category.isIncome) {
      return sum + item.value; // Soma se for receita
    } else {
      return sum - item.value; // Subtrai se for despesa
    }
  }, 0);

  // Formatação para moeda (R$) lidando com valores negativos
  const formatarMoeda = (valor) => {
    const sinal = valor < 0 ? '- ' : '';
    const valorAbsoluto = Math.abs(valor).toFixed(2);
    return `${sinal}R$ ${valorAbsoluto.replace('.', ',')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodo === 'Total do Mês' ? 'Saldo do Mês' : periodo}</Text>
      <Text style={styles.sum}>{formatarMoeda(saldo)}</Text>
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