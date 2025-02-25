import "./HeroAccueil.css";
import { useState } from "react";

function HeroAccueil() {
    let [visite, setVisite] = useState(false);

    function onClic() {
        setVisite(true);
    }

    return (
        <div onClick={onClic} className="hero">
            {visite ? <h1>Merci d&apos;avoir visité FilmFlix</h1> : <h1> Bienvenue sur le site de FilmFlix</h1>}
        </div>
    );
}

export default HeroAccueil;
