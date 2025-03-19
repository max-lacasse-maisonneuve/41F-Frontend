import "./Nav.css";
import { NavLink } from "react-router-dom";
import { motion } from "motion/react";
import { AuthContext } from "../AuthContext/AuthContext";
import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Nav() {
    const formRef = useRef();
    const navigate = useNavigate();
    const { jeton, connexion, deconnexion, utilisateur } = useContext(AuthContext);
    const etats = {
        normal: {},
        survol: {},
    };

    const etatsEnfant = {
        normal: { width: 0 },
        survol: { width: "100%" },
    };

    async function envoiFormulaire(evenement) {
        try {
            //Bloquer envoi
            evenement.preventDefault();

            // Valider les champs

            // Valeur des champs ->body
            const { courriel, mdp } = formRef.current;
            const body = { courriel: courriel.value, mdp: mdp.value };

            // Objet des options de requete
            // body, headers->type json, methode Post
            const optionsRequete = {
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
            };

            let URL = import.meta.env.VITE_DEV_URL;
            if (import.meta.env.VITE_MODE == "PRODUCTION") {
                URL = import.meta.env.VITE_PROD_URL;
            }
            // fetch vers le backend
            const reponse = await fetch(`${URL}/utilisateurs/connexion`, optionsRequete);
            const donneesReponse = await reponse.json();

            if (reponse.ok) {
                console.log(donneesReponse);

                // si la reponse est tiguidou, envoi le jeton au authProvider avec connexion
                connexion(donneesReponse.jeton);
                // navigate("/")
            } else {
                // si il y a une erreur, on peut afficher un message
                console.log("une erreur est survenue dans la connexion");
            }
        } catch (erreur) {
            //Affiche une erreur
        }
    }

    return (
        <nav>
            {utilisateur && <p>Bonjour {utilisateur.nom}</p>}
            <ul>
                <motion.li className="lien" initial="normal" whileHover="survol" variants={etats}>
                    <NavLink to="/">Accueil</NavLink>
                    <motion.div className="ligne" variants={etatsEnfant}></motion.div>
                </motion.li>

                <motion.li className="lien" initial="normal" whileHover="survol" variants={etats}>
                    <NavLink to="/films">Liste des films</NavLink>
                    <motion.div className="ligne" variants={etatsEnfant}></motion.div>
                </motion.li>

                {jeton && utilisateur && utilisateur.role <= 1 && (
                    <motion.li className="lien" initial="normal" whileHover="survol" variants={etats}>
                        <NavLink to="/films/ajout">Ajouter un film</NavLink>
                        <motion.div className="ligne" variants={etatsEnfant}></motion.div>
                    </motion.li>
                )}

                {jeton && (
                    <motion.li className="lien" initial="normal" whileHover="survol" variants={etats}>
                        <NavLink to="/utilisateurs">Liste des utilisateurs</NavLink>
                        <motion.div className="ligne" variants={etatsEnfant}></motion.div>
                    </motion.li>
                )}
            </ul>

            {/* Si le jeton est invalide, on invite à se connecter */}
            {!jeton && (
                <form action="" id="connexionForm" onSubmit={envoiFormulaire} ref={formRef}>
                    <label htmlFor="courriel">Courriel</label>
                    <input type="email" name="courriel" id="courriel" />
                    <label htmlFor="mdp">Mot de passe</label>
                    <input type="password" name="mdp" id="mdp" />
                    <input type="submit" value="Connecter" />
                </form>
            )}

            {/* Si le jeton est valide, on permet la déconnexion */}
            <ul>
                {jeton && (
                    <li>
                        <p onClick={deconnexion}>Déconnexion</p>
                    </li>
                )}
            </ul>
        </nav>
    );
}
export default Nav;
