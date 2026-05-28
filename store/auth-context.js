import { createContext, useState } from 'react';

export const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: (name) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  function login(name) {
    setUser({ name });
  }

  function logout() {
    setUser(null);
  }

  const value = {
    isAuthenticated: !!user,
    user: user,
    login: login,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
