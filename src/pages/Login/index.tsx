import { FormEvent, useState } from 'react'
import { useHistory } from 'react-router';

import { useAuth } from '../../hooks/useAuth'

import './styles.scss';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory()
    const { login } = useAuth();

    async function handleLogin(e: FormEvent) {
        e.preventDefault();
        if (email.trim() === '' || password.trim() === '') {
            console.error('Error: Invalid email or password')
            return;
        }

        login(email, password);

        history.push('/')

    }

    return (
        <div className="Login">
            <div className="container">
                <h2>Logo</h2>
                <form onSubmit={(e) => handleLogin(e)}>
                    <label htmlFor="email">Login</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Email..." required />
                    <label htmlFor="password">Senha</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" required />
                    <button>Entrar</button>
                </form>
            </div>
        </div>
    )
}