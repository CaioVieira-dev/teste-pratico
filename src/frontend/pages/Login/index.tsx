import { FormEvent, useState } from 'react'
import { useHistory } from 'react-router';

import { useAuth } from '../../hooks/useAuth'

import './styles.scss';

type SignInProps = {
    toggle: () => void;
}
type CreateAccountProps = {
    toggle: () => void;
}

function SignIn(props: SignInProps) {
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
        let user;
        try {
            user = await login(email, password);
        } catch (error) {
            console.error(error);
        }

        if (user?.role === 'user') {
            history.push('/')
        }
        if (user?.role === 'admin') {
            history.push('/admin')
        }

    }

    return (
        <form onSubmit={(e) => handleLogin(e)}>
            <label htmlFor="email">Login</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Email..." required />
            <label htmlFor="password">Senha</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" required />
            <button type="submit">Entrar</button>
            <button onClick={() => props.toggle()}>Criar conta</button>
        </form>
    )
}

function CreateAccount(props: CreateAccountProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory()
    const { registerUser } = useAuth();

    async function handleCreateAccount(e: FormEvent) {
        e.preventDefault();
        if (email.trim() === '' || password.trim() === '') {
            console.error('Error: Invalid email or password')
            return;
        }
        try {
            await registerUser(email, password);
        } catch (error) {
            console.error(error);
        }

        history.push('/')


    }


    return (
        <form onSubmit={(e) => handleCreateAccount(e)}>
            <label htmlFor="email">Email</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Email..." required />
            <label htmlFor="password">Senha</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" required />
            <button type="submit">Cadastrar</button>
            <button onClick={() => props.toggle()}>Logar</button>
        </form>
    )
}

export function Login() {
    const [isLogging, setIsLogging] = useState(true);
    function toggleIsLogging() {
        setIsLogging(!isLogging);
    }

    return (
        <div className="Login">
            <div className="container">
                <h2>Logo</h2>
                {isLogging ? <SignIn toggle={toggleIsLogging} /> : <CreateAccount toggle={toggleIsLogging} />}
            </div>
        </div>
    )
}