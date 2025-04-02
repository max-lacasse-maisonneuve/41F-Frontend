import { useNavigate } from "react-router-dom";
import "./Tuile.css";
import { motion } from "motion/react";
import PropTypes from "prop-types";
import { d } from "../../../utils/fonctions";

function TuileFilm(props) {
    const { film = { id: "", titre: "", titreVignette: "" } } = props;
    let navigate = useNavigate();
    let URL = import.meta.env.VITE_DEV_URL;
    if (import.meta.env.VITE_MODE == "PRODUCTION") {
        URL = import.meta.env.VITE_PROD_URL;
    }
    function clickVignette(event) {
        const declencheur = event.currentTarget;
        navigate(`/films/${declencheur.id}`);
    }

    // État de l'enfant permettant de gérer l'affichage des tuiles avec un délai
    // Les états doivent être les mêmes que ceux du parent pour que l'animation fonctionne correctement
    // On passe uniquement les propriétés qui nous intéressent
    const etats = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 1,
            },
        },
    };

    function erreurImage(evenement) {
        const declencheur = evenement.currentTarget;
        declencheur.src = "/img/default.jpg";
    }
    return (
        <motion.div
            className="liste-films__element"
            key={`film-${film.id}`}
            onClick={clickVignette}
            id={film.id}
            initial="hidden"
            animate="visible"
            variants={etats}
        >
            {/* <div className="tuile-infos">{he.decode(film.titre)}</div> */}
            <div className="tuile-infos">{d(film.titre)}</div>
            <img
                className="object-cover h-full"
                src={`${URL}/assets/img/${d(film.titreVignette)}`}
                alt={d(film.titre)}
                onError={erreurImage}
            />
        </motion.div>
    );
}

export default TuileFilm;
