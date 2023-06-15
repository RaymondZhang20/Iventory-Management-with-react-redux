import './Header.css';
import react_logo from "../react_logo.svg";
import redux_logo from "../redux_logo.svg";
export default function Header() {
    return (
        <div id="Header-whole">
            <div id="Header-right">
                <img src={react_logo} className="react-logo" alt="react-logo" />
                <p>&</p>
                <img src={redux_logo} className="redux-logo" alt="redux-logo" />
            </div>
            <div id="Header-left">
                <h1>Inventory Management Website</h1>
                <p>individual assignment 2</p>
            </div>
        </div>
    );
}