import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ListeFilms() {
    let [estConnecte, setConnexion] = useState(false);
    let [films, setFilms] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const reponse = await fetch("https://api-films-prpo.onrender.com/films");
            const donneesFilms = await reponse.json();
            setFilms(donneesFilms);
        }
        fetchData();
    }, []);
    //  const estConnecte = true;

    // const films = [
    //     { id: 0, titre: "Mon beau film 1" },
    //     { id: 1, titre: "Mon beau film 2" },
    //     { id: 2, titre: "Mon beau film 3" },
    // ];

    // const test = [<div>ALlo1</div>, <div>ALlo1</div>, <div>ALlo1</div>, <div>ALlo1</div>];
    // function afficherConnexion() {
    //     if (estConnecte) {
    //         return <div>Allo</div>;
    //     }
    // }

    return (
        <main>
            ListeFilms
            {/* {afficherConnexion()} */}
            {/* {estConnecte && <div>est connecté</div>} */}
            {/* {estConnecte ? <div>est connecté</div> : ""} */}
            <div className="grille">
                {films.map((film, index) => {
                    return (
                        <div className="grille__element" key={`film-${film.id}`}>
                            {film.titre}
                        </div>
                    );
                })}
            </div>
            {estConnecte ? <div>Connecté</div> : <div>Non connecté</div>}
            {estConnecte && <div>Connecté2</div>}
        </main>
    );
}

export default ListeFilms;
