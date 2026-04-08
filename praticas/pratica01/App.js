import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


import IconButton from './components/IconButton';

import GerenciarDespesa from './screens/GerenciarDespesa';
import DespesaRecentes from './screens/DespesaRecentes';
import TodasDespesas from './screens/TodasDespesas';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {

  function BottonTabScreen() {
    return (
      <Tab.Navigator
        screenOptions={({ navigation }) => ({
          headerRight: () => (
            <IconButton 
              icon="add" 
              size={24} 
              color="black" 
              onPress={() => {
                navigation.navigate('GerenciarDespesa');
              }} 
            />
          ),
        })}
      >
        <Tab.Screen 
          name="DespesaRecentes" 
          component={DespesaRecentes} 
          options={{
            tabBarIcon: ({color, size}) => (
              <Ionicons name="hourglass" size={size} color={color} />
            ),
            tabBarLabel: 'Recentes',
            title: 'Despesas Recentes',
            tabBarLabelStyle: { fontSize: 12 }
          }}
        />
        <Tab.Screen 
          name="TodasDespesas" 
          component={TodasDespesas} 
          options={{
            tabBarIcon: ({color, size}) => (
              <Ionicons name="wallet-outline" size={size} color={color} />
            ),
            tabBarLabel: 'Todas',
            title: 'Todas as Despesas',
            tabBarLabelStyle: { fontSize: 12 }
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Despesas" 
          component={BottonTabScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="GerenciarDespesa" 
          component={GerenciarDespesa} 
          options={{ title: 'Gerenciar Despesa' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});