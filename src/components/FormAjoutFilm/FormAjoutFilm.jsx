import { useEffect, useState, useRef } from "react";
import "./FormAjout.css";
import { isLength, isInt, isDate, trim, escape, isEmpty, isIn } from "validator";
import { useNavigate } from "react-router-dom";

function FormAjoutFilm() {
    const formRef = useRef();
    const navigate = useNavigate();

    //==== Variables d'état
    const [genres, setGenres] = useState([]);
    const [formulaireValide, setFormulaireValidity] = useState(false);
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

    //==== Effets
    // Mets à jour la donnée de film au changement de genres
    useEffect(() => {
        const donnees = { ...donneesFilm, genres };

        setDonneesFilm(donnees);
    }, [genres]);

    // Valide les champs à chaque changement
    useEffect(() => {
        validerFormulaire();
    }, [donneesFilm, genres]);

    // Fonction qui gère les changements dans les champs
    async function onInputChange(evenement) {
        const champ = evenement.currentTarget;
        const nom = champ.name;
        let valeur = champ.value;

        //On nettoie
        valeur = trim(valeur);
        valeur = escape(valeur);

        // On crée un nouvel objet avec les nouvelles valeurs et on met à jour l'état
        const nouvellesValeur = { ...donneesFilm, [nom]: valeur };
        setDonneesFilm(nouvellesValeur);
    }

    // Fonction qui gère les changements dans les genres avec les boites à cocher
    function onGenreChange(evenement) {
        const checkBox = evenement.currentTarget;
        const valeur = checkBox.value;
        const estCoche = checkBox.checked;

        //On crée un nouveau tableau de genres pour éviter les mutations
        let nouveauGenres = [...genres];

        //Si le tableau de genre contient déjà, on enlève, sinon on ajoute si c'est coché
        if (estCoche && nouveauGenres.includes(valeur) == false) {
            nouveauGenres.push(valeur);
        } else if (estCoche == false && nouveauGenres.includes(valeur) == true) {
            nouveauGenres = nouveauGenres.filter((genre) => {
                return genre != valeur;
            });
        }

        //On met à jour l'état
        setGenres(nouveauGenres);
    }

    // Fonction qui valide et affiche les erreurs dans le formulaire
    function validerFormulaire() {
        const nouvellesErreurs = {};

        // Pour chaque champ, on vérifie s'il est valide et on ajoute un message d'erreur si nécessaire
        // Titre
        if (isEmpty(donneesFilm.titre)) {
            nouvellesErreurs.titre = "Le titre ne peut pas être vide";
        } else if (!isLength(donneesFilm.titre, { max: 5 })) {
            nouvellesErreurs.titre = "Le titre est trop long";
        }

        // Description
        if (isEmpty(donneesFilm.description)) {
            nouvellesErreurs.description = "La description ne peut pas être vide";
        }

        // Description
        if (!isInt(donneesFilm.annee, { min: 1900, max: new Date().getFullYear() })) {
            nouvellesErreurs.annee = "La date doit être un nombre de 4 chiffres";
        }

        //... autres champs

        // On met à jour l'état des erreurs
        setErreurs(nouvellesErreurs);
        // On met à jour l'état de la validité du formulaire en vérifiant s'il y a des erreurs manuelles et sur les attributs HTML
        setFormulaireValidity(formRef.current.checkValidity() && Object.keys(nouvellesErreurs).length == 0);
    }

    // Fonction qui gère la soumission du formulaire
    async function onSubmit(evenement) {
        evenement.preventDefault();

        // Si le formulaire est valide
        if (formulaireValide) {
            // On gère la base de la route du fetch
            let URL = import.meta.env.VITE_DEV_URL;
            if (import.meta.env.VITE_MODE == "PRODUCTION") {
                URL = import.meta.env.VITE_PROD_URL;
            }

            //On prépare la donnée
            const objDonnees = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(donneesFilm),
            };

            //On envoie
            const reponse = await fetch(`${URL}/films`, objDonnees);

            //On gère la réponse
            if (reponse.ok) {
                navigate("/films");
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
                    <input type="text" name="titre" id="titre" onChange={onInputChange} value={donneesFilm.titre} />
                    {erreurs.titre && <div>{erreurs.titre}</div>}
                </div>

                <div className="input-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        onChange={onInputChange}
                        value={donneesFilm.description}
                    />
                    {erreurs.description && <div>{erreurs.description}</div>}
                </div>

                <div className="input-group">
                    <label htmlFor="realisation">Réalisateur.trice</label>
                    <input
                        type="text"
                        name="realisation"
                        id="realisation"
                        onChange={onInputChange}
                        value={donneesFilm.realisation}
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
                    {erreurs.annee && <div>{erreurs.annee}</div>}
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
                    <input type="checkbox" id="genre-action" value="Action" onChange={onGenreChange} />
                    <label htmlFor="genre-drame">Drame</label>
                    <input type="checkbox" id="genre-drame" value="Drame" onChange={onGenreChange} />
                    <label htmlFor="genre-thriller">Thriller</label>
                    <input type="checkbox" id="genre-thriller" value="Thriller" onChange={onGenreChange} />
                    <label htmlFor="genre-aventure">Aventure</label>
                    <input type="checkbox" id="genre-aventure" value="Aventure" onChange={onGenreChange} />
                </div>

                <div className="input-group">
                    <input type="submit" value="Ajouter un film" disabled={formulaireValide == false} />
                </div>
            </form>
        </div>
    );
}

export default FormAjoutFilm;
