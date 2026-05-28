import { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const authCtx = useContext(AuthContext);

  function loginHandler() {
    if (name.trim().length === 0 || password.trim().length === 0) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    // Simple validation for mock auth
    authCtx.login(name);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestão Financeira</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome de usuário"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Entrar" onPress={loginHandler} />
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 16,
    borderRadius: 6,
  },
});
