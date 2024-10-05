import { withFuncProps } from "../../withFuncProps";
import './NavButton.css';

function NavButton({ path, text, navigate }) {
    const handleClick = () => {
        navigate(path);
    };

    return (
        <button onClick={handleClick} className="nav-button">
            {text}
        </button>
    );
}

export default withFuncProps(NavButton);