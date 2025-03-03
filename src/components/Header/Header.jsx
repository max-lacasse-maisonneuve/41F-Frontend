import Nav from "../Nav/Nav";
import "./Header.css";
import { Link } from "react-router-dom";
function Header() {
    return (
        <header>
            <div>
                <Link className="logo-container" to="/">
                    <img src="/logo.png" alt="logo" className="logo" />
                    <p className="titre">FilmFlix</p>
                </Link>
            </div>
            <Nav />
        </header>
    );
}

export default Header;
