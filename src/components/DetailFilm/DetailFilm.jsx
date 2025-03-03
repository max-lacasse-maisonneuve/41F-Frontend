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
        <main className="flex justify-center gap-16 ">
            <div className="w-1/4">
                <img className="h-auto max-w-full" src={`/img/${film.titreVignette}`} alt={film.titre} />
            </div>
            <div className="flex flex-col justify-end w-3/4">
                <div className="pb-5">
                    <div className="text-amber-500 text-3xl font-bold">{film.titre}</div>
                    <h2 className="text-amber-800 ">{film.annee}</h2>
                    <p>{film.description}</p>
                </div>
                <Link className="text-neutral-500 hover:underline" to="/films">
                    Retour aux films
                </Link>
            </div>
        </main>
    );
}

export default DetailFilm;
