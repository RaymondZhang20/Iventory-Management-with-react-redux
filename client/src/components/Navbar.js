import './Navbar.css';
import {useSelector, useDispatch} from 'react-redux';
import {navToHome, navToAbout} from "../redux/actions";

export default function Navbar() {
    const dispatch = useDispatch();
    const res = useSelector(state => state.navbar);
    return (
        <ul id="Navbar">
            <li className="Navbar-list"><a id="Navbar-home" className={navbar_class("home", res)} onClick={() => dispatch(navToHome())}>Home</a></li>
            <li className="Navbar-list"><a id="Navbar-about" className={navbar_class("about", res)} onClick={() => dispatch(navToAbout())}>About</a></li>
        </ul>
    );
}

const navbar_class = (re, ele) => {
    if (re === ele.currentPage) {
        return "Navbar-active";
    } else {
        return "";
    }
}