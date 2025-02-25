import Nav from "../Nav/Nav";
import "./Header.css";

function Header() {
    return (
        <header>
            <div className="logo-container">
                <img src="assets/img/logo.png" alt="logo" />
            </div>
            <Nav />
        </header>
    );
}

export default Header;
