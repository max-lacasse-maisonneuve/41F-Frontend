import "./Nav.css";
import { NavLink } from "react-router-dom";
function Nav() {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/">Accueil</NavLink>
                </li>
                <li>
                    <NavLink to="/films">Liste des films</NavLink>
                </li>
                <li>
                    <NavLink to="/film-ajout">Ajouter un film</NavLink>
                </li>
                <li>
                    <NavLink to="/utilisateurs">Liste des utilisateurs</NavLink>
                </li>
            </ul>
            <ul>
                <li>
                    <a href="">Déconnexion</a>
                </li>
            </ul>
        </nav>
    );
}
export default Nav;
