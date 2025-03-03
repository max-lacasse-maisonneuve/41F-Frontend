import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function DetailFilm() {
    const { id } = useParams();
    // Use state pour stocker les infos du film
    let [film, setFilm] = useState({
        titre: "",
        annee: "",
    });

    // Use effect pour déclencher une fonction lors du chargement du composant DetailFilm
    useEffect(() => {
        async function getData() {
            let URL = import.meta.env.VITE_DEV_URL;

            if (import.meta.env.VITE_MODE == "PRODUCTION") {
                URL = import.meta.env.VITE_PROD_URL;
            }

            const reponse = await fetch(`${URL}/films/${id}`);

            const donneesFilms = await reponse.json();
            setFilm(donneesFilms);
        }

        getData();
    }, []);

    return (
        <main>
            <h1>{film.titre}</h1>
            <h2>{film.annee}</h2>
            <Link to="/films">Retour aux films</Link>
        </main>
    );
}

export default DetailFilm;
