import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { detail } from "./Detail.module.css";

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
            <div className="w-1/2 p-5 flex flex-col bg-indigo-950 sm:bg-indigo-100">
                <h1 className="text-white">{film.titre}</h1>
                <h2>{film.annee}</h2>
            </div>

            <Link to="/films">Retour aux films</Link>
        </main>
    );
}

export default DetailFilm;
