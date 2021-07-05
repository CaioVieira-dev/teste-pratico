import { Link } from 'react-router-dom'
import './style.scss';

export function Header() {
    return (
        <header>
            <h3>Logo</h3>
            <Link to="/login">Login</Link>
        </header>
    )
}