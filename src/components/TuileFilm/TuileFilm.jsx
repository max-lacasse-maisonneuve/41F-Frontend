import React from "react";
import { useNavigate } from "react-router-dom";
import "./Tuile.css";
import { d } from "../../../utils/fonctions";
import { motion } from "motion/react";

function TuileFilm(props) {
    const { film = { id: "", titre: "", titreVignette: "" } } = props;
    let navigate = useNavigate();

    function clickVignette(event) {
        const declencheur = event.currentTarget;
        navigate(`/films/${declencheur.id}`);
    }

    return (
        <motion.div className="liste-films__element" key={`film-${film.id}`} onClick={clickVignette} id={d(film.id)}>
            {/* <div className="tuile-infos">{he.decode(film.titre)}</div> */}
            <div className="tuile-infos">{d(film.titre)}</div>
            <img className="object-cover h-full" src={`/img/${d(film.titreVignette)}`} alt={d(film.titre)} />
        </motion.div>
    );
}

export default TuileFilm;
