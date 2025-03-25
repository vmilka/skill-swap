import { useContext, createContext, useState, useEffect } from "react";
import { profile } from "../services/api-service";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // const [user, setUser] = useState();
  const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : undefined);

  useEffect(() => {
    profile()
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  function login(user) {
    localStorage.setItem('user', JSON.stringify(user))
    setUser(user);
  }

  function logout() {
    localStorage.removeItem('user')
    setUser(undefined);
    setUser(null);
  }

  const contextData = {
    user,
    login,
    logout,
  };

  if (user === undefined) {
    return null;
  }

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
