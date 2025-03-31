import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";

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
import MessageContextProvider from "../MessageContext/MessageContextProvider";
import AdminRoute from "../AdminRoute/AdminRoute";
import { HelmetProvider } from "react-helmet-async";
import ReactGA from "react-ga4";
import { useEffect } from "react";

function App() {
    const location = useLocation();

    ReactGA.initialize(import.meta.env.VITE_GA4_ID);

    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page: location.pathname, title: location.title });
    }, [location]);

    return (
        <>
            <HelmetProvider>
                <MessageContextProvider>
                    <AuthContextProvider>
                        <div className="min-h-screen flex flex-col">
                            <Header />
                            <main className="grow-3">
                                <Routes>
                                    <Route path="/" element={<HeroAccueil />} />
                                    <Route path="films">
                                        <Route path="" element={<ListeFilms />} />
                                        <Route path="favoris" element={<Favoris />} />
                                        <Route path=":id" element={<DetailFilm />} />

                                        <Route element={<AdminRoute />}>
                                            <Route path="ajout" element={<FormAjoutFilm />} />
                                            <Route path="modifier/:id" element={<FormModifierFilm />} />
                                        </Route>
                                    </Route>
                                </Routes>
                            </main>
                            <Footer />
                        </div>
                    </AuthContextProvider>
                </MessageContextProvider>
            </HelmetProvider>
        </>
    );
}

export default App;
