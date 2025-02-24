import Nav from "../Nav/Nav";
import "./Header.css";

function Header(props) {
    const { nom } = props;

    return (
        <header className={nom == "" ? "" : "connexion"}>
            Mon entête - {nom}
            <Nav />
        </header>
    );
}

export default Header;
