import { Link } from 'react-router-dom';
import './TopNavBar.css';

function NavButton({ path, text }) {
    return (
        <Link to={path} className="nav-button">
            {text}
        </Link>
    );
}

export default NavButton;