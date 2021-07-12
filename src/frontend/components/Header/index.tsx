import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

import './style.scss';

export function Header() {
    const history = useHistory()
    const { getToken } = useAuth()
    const [isLogged, setIsLogged] = useState(false)

    useEffect(() => {
        const token = getToken();
        if (token) {
            setIsLogged(true)
        }
    }, [getToken])

    function logout() {
        localStorage.removeItem('verzel_pratic_test_auth_token');
        history.push('/login')
    }

    return (
        <header>
            <h3>Logo</h3>
            {isLogged ?
                <Link to="#" onClick={logout}>Logout</Link>
                :
                <Link to="/login">Login</Link>
            }
        </header>
    )
}