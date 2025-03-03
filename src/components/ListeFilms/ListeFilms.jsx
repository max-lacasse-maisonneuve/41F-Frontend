import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ListeFilms.css";
import TuileFilm from "../TuileFilm/TuileFilm";
import Toast from "../Toast/Toast";
import Button from "../Button/Button";

function ListeFilms() {
    let [estConnecte, setConnexion] = useState(false);
    let [films, setFilms] = useState([]);
    let [erreur, setErreur] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                let URL = import.meta.env.VITE_DEV_URL;

                if (import.meta.env.VITE_MODE == "PRODUCTION") {
                    URL = import.meta.env.VITE_PROD_URL;
                }

                const reponse = await fetch(`${URL}/films`);

                const donneesFilms = await reponse.json();
                setFilms(donneesFilms);
            } catch (erreur) {
                setErreur(true);
            }
        }
        fetchData();
    }, []);

    function clic() {
        console.log("patate");
    }
    function clic2() {
        console.log("patate2");
    }
    return (
        <main>
            {erreur && <Toast message="Une erreur est survenue" />}
            ListeFilms
            <Button callback={clic} texte="Cliquez-moi" />
            <Button callback={clic2} texte="Abonnez-vous" />
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
