import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function MonthYearFilter({ selectedDate, onDateChange }) {
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  function changeMonth(delta) {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + delta);
    onDateChange(newDate);
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={() => changeMonth(-1)}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </Pressable>
      <Text style={styles.dateText}>
        {months[selectedDate.getMonth()]} {selectedDate.getFullYear()}
      </Text>
      <Pressable onPress={() => changeMonth(1)}>
        <Ionicons name="chevron-forward" size={24} color="black" />
      </Pressable>
    </View>
  );
}

export default MonthYearFilter;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginVertical: 10,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
});
