import "./Nav.css";
import { NavLink } from "react-router-dom";
import { motion } from "motion/react";
function Nav() {
    const etats = {
        normal: {},
        survol: {},
    };

    const etatsEnfant = {
        normal: { width: 0 },
        survol: { width: "100%" },
    };

    return (
        <nav>
            <ul>
                <motion.li className="lien" initial="normal" whileHover="survol" variants={etats}>
                    <NavLink to="/">Accueil</NavLink>
                    <motion.div className="ligne" variants={etatsEnfant}></motion.div>
                </motion.li>

                <motion.li className="lien" initial="normal" whileHover="survol" variants={etats}>
                    <NavLink to="/films">Liste des films</NavLink>
                    <motion.div className="ligne" variants={etatsEnfant}></motion.div>
                </motion.li>

                <motion.li className="lien" initial="normal" whileHover="survol" variants={etats}>
                    <NavLink to="/films/ajout">Ajouter un film</NavLink>
                    <motion.div className="ligne" variants={etatsEnfant}></motion.div>
                </motion.li>

                <motion.li className="lien" initial="normal" whileHover="survol" variants={etats}>
                    <NavLink to="/utilisateurs">Liste des utilisateurs</NavLink>
                    <motion.div className="ligne" variants={etatsEnfant}></motion.div>
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
