import { useState, createContext, ReactNode, useEffect } from 'react'
import { api } from '../services/api';
type AuthContextType = {
    login: (email: string, password: string) => Promise<{ id: number, email: string, role: string }>;
    getToken: () => string | null;
    validateAdmin: () => Promise<void>;
    registerUser: (email: string, password: string) => Promise<{ id: number, email: string, role: string }>
    registerAdmin: (email: string, password: string, token: string) => Promise<{ id: number, email: string, role: string }>
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
            console.error('Error: ', error);
            return;
        }


        localStorage.setItem('verzel_pratic_test_auth_token', result.data.token)
        return result.data.user
    }
    async function registerUser(email: string, password: string) {
        if (!email || !password) {
            return;
        }
        let result;
        try {
            result = await api.put('/api/new-user', {
                "email": email,
                "password": password
            })
        } catch (error) {
            console.log(error)
            return;
        }
        localStorage.setItem('verzel_pratic_test_auth_token', result.data.token)
        return result?.data.user
    }
    async function registerAdmin(email: string, password: string, token: string) {
        if (!email || !password || !token) {
            return;
        }
        let result;
        try {
            result = await api.put('/api/new-admin', {
                "email": email,
                "password": password
            }, {
                headers: { "authorization": `Bearer ${token}` }
            })
        } catch (error) {
            console.log(error)
            return;
        }
        localStorage.setItem('verzel_pratic_test_auth_token', result.data.token)
        return result?.data.user
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
            validateAdmin,
            registerUser,
            registerAdmin
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}