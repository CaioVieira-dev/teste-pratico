import { FormEvent, useState } from 'react'
import { useHistory } from 'react-router';
import { api } from '../../services/api'

import './styles.scss';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory()

    async function handleLogin(e: FormEvent) {
        e.preventDefault();
        if (email.trim() === '' || password.trim() === '') {
            console.error('Error: Invalid email or password')
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