import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import IconButton from './components/IconButton';
import GerenciarDespesa from './screens/GerenciarDespesa';
import DespesaRecentes from './screens/DespesaRecentes';
import TodasDespesas from './screens/TodasDespesas';
import Resumo from './screens/Resumo';
import Login from './screens/Login';
import GerenciarCategorias from './screens/GerenciarCategorias';
import AuthContextProvider, { AuthContext } from './store/auth-context';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottonTabScreen() {
  const authCtx = useContext(AuthContext);

  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ marginRight: 10 }}>Olá, {authCtx.user?.name}</Text>
            <IconButton 
              icon="add" 
              size={24} 
              color="black" 
              onPress={() => {
                navigation.navigate('GerenciarDespesa');
              }} 
            />
            <IconButton 
              icon="log-out-outline" 
              size={24} 
              color="black" 
              onPress={authCtx.logout} 
            />
          </View>
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
        }}
      />
      <Tab.Screen 
        name="Resumo" 
        component={Resumo} 
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="pie-chart-outline" size={size} color={color} />
          ),
          tabBarLabel: 'Resumo',
          title: 'Resumo Financeiro',
        }}
      />
    </Tab.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!authCtx.isAuthenticated ? (
          <Stack.Screen 
            name="Login" 
            component={Login} 
            options={{ headerShown: false }} 
          />
        ) : (
          <>
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
            <Stack.Screen 
              name="GerenciarCategorias" 
              component={GerenciarCategorias} 
              options={{ title: 'Gerenciar Categorias' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthContextProvider>
      <Navigation />
    </AuthContextProvider>
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