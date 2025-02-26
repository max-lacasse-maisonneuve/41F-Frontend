import "./App.css";
import { Routes, Route } from "react-router-dom";

//Composants statiques
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

//Pages du site
import HeroAccueil from "../HeroAccueil/HeroAccueil";
import ListeFilms from "../ListeFilms/ListeFilms";

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<HeroAccueil />} />
                <Route path="/films" element={<ListeFilms />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
