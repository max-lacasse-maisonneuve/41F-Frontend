import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ListeFilms.css";
import TuileFilm from "../TuileFilm/TuileFilm";
function ListeFilms() {
    let [estConnecte, setConnexion] = useState(false);
    let [films, setFilms] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let URL = import.meta.env.VITE_DEV_URL;

            if (import.meta.env.VITE_MODE == "PRODUCTION") {
                URL = import.meta.env.VITE_PROD_URL;
            }

            const reponse = await fetch(`${URL}/films`);
            
            const donneesFilms = await reponse.json();
            setFilms(donneesFilms);
        }
        fetchData();
    }, []);

    return (
        <main>
            ListeFilms
            {/* {afficherConnexion()} */}
            {/* {estConnecte && <div>est connecté</div>} */}
            {/* {estConnecte ? <div>est connecté</div> : ""} */}
            <div className="liste-films">
                {films.map((film) => {
                    return <TuileFilm key={film.id} film={film} />;
                })}

                {films.length == 0 && "Aucun film trouvé"}
            </div>
            {estConnecte ? <div>Connecté</div> : <div>Non connecté</div>}
            {estConnecte && <div>Connecté2</div>}
        </main>
    );
}

export default ListeFilms;
