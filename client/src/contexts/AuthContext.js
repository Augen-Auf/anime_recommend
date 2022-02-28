import React, {createContext, useContext, useEffect} from 'react';
import Store from "../store/store";

const AuthContext = createContext({
    store: {},
})

export const useAuth = () => useContext(AuthContext)

export function AuthContextProvider({children}) {
    const store = new Store()

    useEffect(async () => {
        if(localStorage.getItem('token')) {
            await store.checkAuth()
        }
    }, [])

    const value = { store }

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    );
}