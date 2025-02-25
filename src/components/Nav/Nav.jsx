import "./Nav.css";
function Nav() {
    return (
        <nav>
            <ul>
                <li>
                    <a href="#">Accueil</a>
                </li>
                <li>
                    <a href="films">Liste des films</a>
                </li>
                <li>
                    <a href="film-ajout">Ajouter un film</a>
                </li>
                <li>
                    <a href="utilisateurs">Liste des utilisateurs</a>
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
