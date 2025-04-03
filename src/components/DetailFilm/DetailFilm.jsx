import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { d } from "../../../utils/fonctions";

function DetailFilm() {
    const { id } = useParams();
    const navigate = useNavigate();
    let URL = import.meta.env.VITE_DEV_URL;
    if (import.meta.env.VITE_MODE == "PRODUCTION") {
        URL = import.meta.env.VITE_PROD_URL;
    }

    // Use state pour stocker les infos du film
    let [film, setFilm] = useState({
        titre: "",
        annee: "",
        genres: [],
    });

    // Use effect pour déclencher une fonction lors du chargement du composant DetailFilm
    useEffect(() => {
        async function getData() {
            const reponse = await fetch(`${URL}/films/${id}`);

            const donneesFilms = await reponse.json();
            setFilm(donneesFilms);
        }

        getData();
    }, []);

    async function supprimerFilm() {
        let URL = import.meta.env.VITE_DEV_URL;

        if (import.meta.env.VITE_MODE == "PRODUCTION") {
            URL = import.meta.env.VITE_PROD_URL;
        }

        const objDonnees = {
            method: "DELETE",
        };

        const reponse = await fetch(`${URL}/films/${id}`, objDonnees);
        if (reponse.ok) {
            navigate("/films");
        }
    }

    return (
        <main className="flex justify-center gap-16 ">
            <div className="w-1/4">
                {film.titreVignette && (
                    <img
                        className="h-auto max-w-full"
                        loading="lazy"
                        src={`${URL}/assets/img/${d(film.titreVignette)}`}
                        alt={d(film.titre)}
                    />
                )}
            </div>
            <div className="flex flex-col justify-end w-3/4">
                <div className="pb-5">
                    <div className="text-amber-500 text-3xl font-bold">{d(film.titre)}</div>
                    <h2 className="text-amber-800 ">{film.annee}</h2>
                    <p>{d(film.description)}</p>
                    <p>{film.genres && film.genres.join("-")}</p>
                </div>

                <Link className="bouton w-1/4 p-2 mb-5 text-white" to={`/films/modifier/${film.id}`}>
                    Modifier
                </Link>

                <div className="bouton erreur w-1/4 p-2 mb-5" onClick={supprimerFilm}>
                    Supprimer
                </div>
                <Link className="text-neutral-500 hover:underline" to="/films">
                    <i className="fas fa-arrow-left mr-2"></i> Retour à la liste
                </Link>
            </div>
        </main>
    );
}

export default DetailFilm;
