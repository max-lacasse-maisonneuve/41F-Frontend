import "./Nav.css";
import { NavLink } from "react-router-dom";
import { motion,  } from "motion/react";
function Nav() {
    // const etats={
    //     normal:{backgroundColor:"green"},
    //     survol:{backgroundColor:"blue"}
    // }
    // const etatsEnfant:{
    //     normal:{width:0},
    //     survol:{width:"100%"}
    // }
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
                    <NavLink to="/films/ajout">Ajouter un film</NavLink>
                </li>
                <motion.li className="lien">
                    <NavLink to="/utilisateurs">Liste des utilisateurs</NavLink>
                    <motion.div className="ligne"></motion.div>
                </motion.li>
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
