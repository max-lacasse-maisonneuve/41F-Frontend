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
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="grow-2">
                <Routes>
                    <Route path="/" element={<HeroAccueil />} />
                    <Route path="films">
                        <Route path="" element={<ListeFilms />} />
                        <Route path=":id" element={<DetailFilm />} />
                    </Route>
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
