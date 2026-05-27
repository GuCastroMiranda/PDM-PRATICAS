import { View, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import DespesaSumario from './DespesaSumario';
import DespesaLista from './DespesaLista';
import OptionsModal from '../ui/OptionsModal';
import api from '../../services/api';

function DespesaSaida({ despesas, periodo }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const navigation = useNavigation();

  function handleLongPress(item) {
    setSelectedItem(item);
  }

  function handleCloseModal() {
    setSelectedItem(null);
  }

  function handleEdit() {
    navigation.navigate('GerenciarDespesa', {
      transactionId: selectedItem.id,
      transactionData: selectedItem
    });
    handleCloseModal();
  }

  async function handleDelete() {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir esta transação?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: async () => {
            try {
              await api.delete(`/transactions/${selectedItem.id}`);
              handleCloseModal();
              // Trigger a refresh if possible, or assume it will be refreshed by screen focus
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir a transação.');
            }
          }
        }
      ]
    );
  }

  return (
    <View style={styles.container}>
      <DespesaSumario despesas={despesas} periodo={periodo} />
      <DespesaLista despesas={despesas} onLongPress={handleLongPress} />
      
      <OptionsModal 
        visible={!!selectedItem}
        onClose={handleCloseModal}
        onEdit={handleEdit}
        onDelete={handleDelete}
        itemName={selectedItem?.description}
      />
    </View>
  );
}

export default DespesaSaida;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: '#fff',
  },
});