import { useState, useEffect } from "react";
import "./ListeFilms.css";
import TuileFilm from "../TuileFilm/TuileFilm";
import Toast from "../Toast/Toast";
import { motion, useAnimation } from "motion/react";
import Spinner from "../Spinner/Spinner";

function ListeFilms() {
    const controls = useAnimation(); //Permet de gérer les animations manuellement

    let [afficheSpinner, setSpinner] = useState(true);
    let [films, setFilms] = useState([]);
    let [erreur, setErreur] = useState(false);

    function trierTitre() {
        const clone = [...films];
        clone.sort((a, b) => {
            return a.titre < b.titre;
        });
        setFilms(clone);
    }
    
    useEffect(() => {
        async function fetchData() {
            try {
                setSpinner(true);
                let URL = import.meta.env.VITE_DEV_URL;

                if (import.meta.env.VITE_MODE == "PRODUCTION") {
                    URL = import.meta.env.VITE_PROD_URL;
                }

                const reponse = await fetch(`${URL}/films`);

                const donneesFilms = await reponse.json();

                if (reponse.ok) {
                    console.log(donneesFilms);

                    setFilms(donneesFilms);
                    setSpinner(false); // On cache le loader
                } else {
                    setErreur(donneesFilms.msg);
                    console.log(donneesFilms);
                    setSpinner(false); // On cache le loader
                }

                //Permet d'attendre le chargement avant de déclencher l'animation
                controls.start("visible");
            } catch (erreur) {
                console.log(erreur);

                // setErreur(true);
                setSpinner(false);
            }
        }

        fetchData();
    }, []);

    //État du parent permettant de gérer l'affichage des tuiles avec un délai
    const etats = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };
    return (
        <main>
            {afficheSpinner && <Spinner />}

            {erreur && <Toast message={erreur} />}
            <h1>Catalogue</h1>
            <p>Découvrez nos nouveaux titres</p>

            <motion.div className="liste-films" initial="hidden" animate={controls} variants={etats}>
                {films.map((film) => {
                    return <TuileFilm key={film.id} film={film} />;
                })}
            </motion.div>
        </main>
    );
}

export default ListeFilms;
