import { createContext, useContext, useEffect, useReducer, useState } from "react";
import AuthReducer from '../reducers/AuthReducer';

const AuthContext = createContext(null);

const initialState = [{
    isLoggedIn: false,
    jwtData: {},
    jwtToken:null,
    userData: {},
  }]

  
export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [user, setUser] = useReducer(AuthReducer, initialState[0]);
    return (
        <AuthContext.Provider value={[user, setUser]}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;