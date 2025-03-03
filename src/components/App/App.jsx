import "./App.css";
import { Routes, Route } from "react-router-dom";

//Composants statiques
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

//Pages du site
import HeroAccueil from "../HeroAccueil/HeroAccueil";
import ListeFilms from "../ListeFilms/ListeFilms";
import DetailFilm from "../DetailFilm/DetailFilm";

function App() {
    return (
        <div className="max-h-screen">
            <Header />
            <Routes>
                <Route path="/" element={<HeroAccueil />} />
                <Route path="films">
                    <Route path="" element={<ListeFilms />} />
                    <Route path=":id" element={<DetailFilm />} />
                </Route>
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
