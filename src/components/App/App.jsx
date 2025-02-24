import { useState } from "react"; //hook
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function App() {
    let [nbClic, setNbClic] = useState(0);
    let [nom, setNom] = useState("Maxime");

    function onPageClic(event) {
        nbClic++;
        setNbClic(nbClic);

        if (nbClic > 10) {
            setNom("Maxime");
        }
    }

    return (
        <>
            <Header id="3" nom={nom} />
            <h1 onClick={onPageClic}>Vous avez cliqué {nbClic} fois</h1>
            {nom !== "" ? <main>Bonjour, {nom}</main> : <main>Bonjour inconnu</main>}
            <Footer />
        </>
    );
}

export default App;
