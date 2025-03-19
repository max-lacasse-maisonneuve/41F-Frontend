import "./App.css";
import { Routes, Route } from "react-router-dom";

//Composants statiques
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

//Pages du site
import HeroAccueil from "../HeroAccueil/HeroAccueil";
import ListeFilms from "../ListeFilms/ListeFilms";
import DetailFilm from "../DetailFilm/DetailFilm";
import FormAjoutFilm from "../FormAjoutFilm/FormAjoutFilm";
import FormModifierFilm from "../FormModifierFilm/FormModifierFilm";
import Favoris from "../Favoris/Favoris";
import AuthContextProvider from "../AuthContext/AuthContext";

function App() {
    return (
        <>
            <AuthContextProvider>
                <div className="min-h-screen flex flex-col">
                    <Header />
                    <main className="grow-2">
                        <Routes>
                            <Route path="/" element={<HeroAccueil />} />
                            <Route path="films">
                                <Route path="" element={<ListeFilms />} />
                                <Route path="ajout" element={<FormAjoutFilm />} />
                                <Route path="favoris" element={<Favoris />} />
                                <Route path="modifier/:id" element={<FormModifierFilm />} />
                                <Route path=":id" element={<DetailFilm />} />
                            </Route>
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </AuthContextProvider>
        </>
    );
}

export default App;
