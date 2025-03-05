import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./FormAjout.css";

function FormModifierFilm() {
    const { id } = useParams();
    const formRef = useRef();
    const navigate = useNavigate();
    const [genres, setGenres] = useState([]);

    const [donneesFilm, setDonneesFilm] = useState({
        titre: "",
        annee: "",
        description: "",
        genres: [],
        realisation: "",
        titreVignette: "",
    });

    const [erreurs, setErreurs] = useState({
        titre: "",
        description: "",
    });

    const [message, setMessage] = useState("");

    useEffect(() => {
        async function getData() {
            let URL = import.meta.env.VITE_DEV_URL;

            if (import.meta.env.VITE_MODE == "PRODUCTION") {
                URL = import.meta.env.VITE_PROD_URL;
            }

            const reponse = await fetch(`${URL}/films/${id}`);

            const donneesFilms = await reponse.json();
            setDonneesFilm(donneesFilms);
            setGenres(donneesFilms.genres);
        }

        getData();
    }, []);

    useEffect(() => {
        const donnees = { ...donneesFilm, genres };

        setDonneesFilm(donnees);
    }, [genres]);

    function onInputChange(evenement) {
        const champ = evenement.currentTarget;
        const nom = champ.name;
        let valeur = champ.value;

        valeur = valeur[0].toUpperCase() + valeur.slice(1);

        const nouvellesValeur = { ...donneesFilm, [nom]: valeur };
        // nouvellesValeur[nom] = valeur;
        setDonneesFilm(nouvellesValeur);
    }

    function onGenreChange(evenement) {
        const checkBox = evenement.currentTarget;
        const valeur = checkBox.value;
        const estCoche = checkBox.checked;
        let nouveauGenres = [...genres];

        //Si le tableau de genre contient déjà, on enlève, sinon on ajoute si c'est coché
        if (estCoche && nouveauGenres.includes(valeur) == false) {
            nouveauGenres.push(valeur);
        } else if (estCoche == false && nouveauGenres.includes(valeur) == true) {
            nouveauGenres = nouveauGenres.filter((genre) => {
                return genre != valeur;
            });
        }

        setGenres(nouveauGenres);
    }

    async function onSubmit(evenement) {
        evenement.preventDefault();

        // Si le formulaire est valide
        if (formRef.current.checkValidity()) {
            // On gère la base de la route du fetch
            let URL = import.meta.env.VITE_DEV_URL;
            if (import.meta.env.VITE_MODE == "PRODUCTION") {
                URL = import.meta.env.VITE_PROD_URL;
            }

            //On prépare la donnée
            const objDonnees = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(donneesFilm),
            };

            //On envoie
            const reponse = await fetch(`${URL}/films/${id}`, objDonnees);
            //On gère la réponse

            if (reponse.ok) {
                navigate(`/films/${id}`);
            } else {
                setMessage("Veuillez corriger le formulaire");
                setTimeout(() => {
                    setMessage("");
                }, 2000);
            }
        }
    }

    return (
        <div>
            {message ? <p>{message}</p> : ""}
            <form action="" onSubmit={onSubmit} ref={formRef}>
                <div className="input-group">
                    <label htmlFor="titre">Titre</label>
                    <input
                        type="text"
                        name="titre"
                        id="titre"
                        onChange={onInputChange}
                        value={donneesFilm.titre}
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        onChange={onInputChange}
                        value={donneesFilm.description}
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="realisation">Réalisateur.trice</label>
                    <input
                        type="text"
                        name="realisation"
                        id="realisation"
                        onChange={onInputChange}
                        value={donneesFilm.realisation}
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="annee">Année</label>
                    <input
                        type="text"
                        name="annee"
                        id="annee"
                        onChange={onInputChange}
                        value={donneesFilm.annee}
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="titreVignette">Nom de l'image</label>
                    <input
                        type="text"
                        name="titreVignette"
                        id="titreVignette"
                        onChange={onInputChange}
                        value={donneesFilm.titreVignette}
                    />
                </div>

                <div className="input-checkbox-group">
                    <label htmlFor="genre-action">Action</label>
                    <input
                        type="checkbox"
                        id="genre-action"
                        value="Action"
                        onChange={onGenreChange}
                        checked={genres.includes("Action")}
                    />
                    <label htmlFor="genre-drame">Drame</label>
                    <input
                        type="checkbox"
                        id="genre-drame"
                        value="Drame"
                        onChange={onGenreChange}
                        checked={genres.includes("Drame")}
                    />
                    <label htmlFor="genre-thriller">Thriller</label>
                    <input
                        type="checkbox"
                        id="genre-thriller"
                        value="Thriller"
                        onChange={onGenreChange}
                        checked={genres.includes("Thriller")}
                    />
                    <label htmlFor="genre-aventure">Aventure</label>
                    <input
                        type="checkbox"
                        id="genre-aventure"
                        value="Aventure"
                        onChange={onGenreChange}
                        checked={genres.includes("Aventure")}
                    />
                </div>

                <div className="input-group flex flex-col gap-4 items-start">
                    <button className="bouton text-white">
                        <i className="fas fa-save mr-2"></i> Modifier le film
                    </button>
                    <Link to={`/films/${id}`}>
                        <i className="fas fa-arrow-left mr-2"></i>Retour au film
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default FormModifierFilm;
