import { useState, createContext, ReactNode, useEffect } from 'react'
import { api } from '../services/api';
type AuthContextType = {
    login: (email: string, password: string) => void;
    getToken: () => string | null;
    validateAdmin: () => Promise<void>;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {

    async function login(email: string, password: string) {
        if (!email || !password) {
            console.error("Error: Some of the required data is missing.")
            return;
        }
        let result;
        try {
            result = await api.post('/api/auth', {
                email: email,
                password: password,
            })
        } catch (error) {
            console.error('Error: ', error)
            return
        }

        console.log(result)
        localStorage.setItem('verzel_pratic_test_auth_token', result.data.token)

    }
    function getToken() {
        return localStorage.getItem('verzel_pratic_test_auth_token')
    }
    async function validateAdmin() {
        try {
            await api.get('/api/validate-admin', {
                headers: { "authorization": `Bearer ${localStorage.getItem("verzel_pratic_test_auth_token")}` }
            })
        } catch (error) {
            throw new Error(error)
        }
    }

    return (
        <AuthContext.Provider value={{
            getToken,
            login,
            validateAdmin
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}