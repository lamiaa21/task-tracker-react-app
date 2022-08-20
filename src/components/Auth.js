import React, { useContext, useState, useEffect } from "react";
import { auth } from "../Firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currUser, setCurrUser] = useState();
  const [loading, setLoading] = useState(true);

  const signUp = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };
  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };
  const logout = () => {
    return auth.signOut();
  };
  const resetPassword = (email) => {
    console.log(email);
    return auth.sendPasswordResetEmail(email);
  };
  const updateEmail = (newEmail) => {
    return currUser.updateEmail(newEmail);
  };
  const updatePassword = (newPassword) => {
    return currUser.updatePassword(newPassword);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    signUp,
    login,
    currUser,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
