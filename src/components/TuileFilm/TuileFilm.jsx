import React from "react";
import { useNavigate } from "react-router-dom";

function TuileFilm(props) {
    const { film } = props;
    let navigate = useNavigate();

    function clickVignette(event) {
        const declencheur = event.currentTarget;
        navigate(`/films/${declencheur.id}`);
    }
    return (
        <div className="liste-films__element" key={`film-${film.id}`} onClick={clickVignette} id={film.id}>
            {film.titre}
            <img src={`img/${film.titreVignette}`} alt={film.titre} />
        </div>
    );
}

export default TuileFilm;
