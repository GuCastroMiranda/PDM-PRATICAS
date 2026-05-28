import { FlatList } from 'react-native';
import DespesaItem from './DespesaItem';

function DespesaLista({ despesas, onLongPress }) {
  return (
    <FlatList
      data={despesas}
      renderItem={(itemData) => (
        <DespesaItem item={itemData.item} onLongPress={onLongPress} />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

export default DespesaLista;