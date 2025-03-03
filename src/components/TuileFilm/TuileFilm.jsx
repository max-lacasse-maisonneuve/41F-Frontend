import React from "react";
import { useNavigate } from "react-router-dom";
import "./Tuile.css";
function TuileFilm(props) {
    const { film = { id: "", titre: "", titreVignette: "" } } = props;
    let navigate = useNavigate();

    function clickVignette(event) {
        const declencheur = event.currentTarget;
        navigate(`/films/${declencheur.id}`);
    }

    return (
        <div className="liste-films__element" key={`film-${film.id}`} onClick={clickVignette} id={film.id}>
            <div className="tuile-infos">{film.titre}</div>
            <img className="object-cover h-full" src={`/img/${film.titreVignette}`} alt={film.titre} />
        </div>
    );
}

export default TuileFilm;
