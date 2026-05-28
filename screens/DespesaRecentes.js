import { useState, useEffect, useCallback, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import api from '../services/api';
import { AuthContext } from '../store/auth-context';

function DespesaRecentes() {
  const [despesas, setDespesas] = useState([]);
  const isFocused = useIsFocused();
  const authCtx = useContext(AuthContext);

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

  function filtrarUltimos7Dias(listaDespesas) {
    if (!Array.isArray(listaDespesas)) return [];

    const hoje = new Date();
    const seteDiasAtras = new Date();
    seteDiasAtras.setDate(hoje.getDate() - 7);

    return listaDespesas.filter((despesa) => {
      const dDate = new Date(despesa.date);
      return dDate >= seteDiasAtras && dDate <= hoje;
    });
  }

  const despesasRecentes = filtrarUltimos7Dias(despesas);

  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Olá, {authCtx.user?.name || 'Visitante'}! 👋</Text>
        <Text style={styles.subWelcomeText}>Bem-vindo de volta ao seu controle financeiro.</Text>
      </View>

      <View style={styles.hintContainer}>
        <Text style={styles.hintText}>
          Dica: Pressione e segure um item para abrir opções de exclusão rápida.
        </Text>
      </View>

      <DespesaSaida 
        despesas={despesasRecentes} 
        periodo="Últimos 7 dias" 
        onRefresh={fetchDespesas}
      />
    </View>
  );
}

export default DespesaRecentes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  welcomeContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 8,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3e047c',
  },
  subWelcomeText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  hintContainer: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 24,
    borderRadius: 8,
    marginTop: 12,
  },
  hintText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

