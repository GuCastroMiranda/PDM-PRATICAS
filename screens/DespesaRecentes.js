import { useState, useEffect, useCallback } from 'react';
import { useIsFocused } from '@react-navigation/native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import api from '../services/api';

function DespesaRecentes() {
  const [despesas, setDespesas] = useState([]);
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

  function filtrarUltimos7Dias(despesas) {
    const hoje = new Date();
    const seteDiasAtras = new Date();
    seteDiasAtras.setDate(hoje.getDate() - 7);

    return despesas.filter((despesa) => {
      const dDate = new Date(despesa.date);
      return dDate >= seteDiasAtras && dDate <= hoje;
    });
  }

  const despesasRecentes = filtrarUltimos7Dias(despesas);

  return (
    <DespesaSaida 
      despesas={despesasRecentes} 
      periodo="Últimos 7 dias" 
    />
  );
}

export default DespesaRecentes;
