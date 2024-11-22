import { withFuncProps } from "../../withFuncProps";
import './NavButton.css';

function NavButton({ className, path, text, navigate }) {
    const handleClick = () => {
        if (window.location.pathname !== path) { 
            navigate(path);
            localStorage.removeItem('createClientFormData');
        }
    };

    return (
        <button onClick={handleClick} className={className}>
            {text}
        </button>
    );
}

export default withFuncProps(NavButton);