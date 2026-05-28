import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function getDataFormatada(dataStr) {
  const data = new Date(dataStr);
  return (data.getDate() + 1) + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
}

function DespesaItem({ item, onLongPress }) {
  const navigation = useNavigation();

  function itemPressHandler() {
    navigation.navigate('GerenciarDespesa', {
      transactionId: item.id,
      transactionData: item,
    });
  }

  return (
    <Pressable 
      onPress={itemPressHandler}
      onLongPress={() => onLongPress && onLongPress(item)}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={[styles.itemContainer, { borderLeftColor: item.category.background, borderLeftWidth: 5 }]}>
        <View style={styles.itemText}>
          <Text style={styles.date}>{getDataFormatada(item.date)}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.category}>{item.category.displayName}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={[styles.amount, { color: item.category.isIncome ? 'green' : 'red' }]}>
            R$ {item.value.toFixed(2)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

export default DespesaItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  itemContainer: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  itemText: {
    flex: 1,
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#888',
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    fontWeight: 'bold',
  },
});