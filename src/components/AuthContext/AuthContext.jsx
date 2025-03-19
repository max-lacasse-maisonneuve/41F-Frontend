import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

function AuthContextProvider(props) {
    const { children } = props;
    let [jeton, setJeton] = useState(null);
    let [utilisateur, setUtilisateur] = useState(null);

    useEffect(() => {
        const jetonSauvegarde = localStorage.getItem("jeton");

        if (jetonSauvegarde && validerJeton(jetonSauvegarde)) {
            setJeton(jetonSauvegarde);
        } else {
            deconnexion();
        }
    }, []);

    useEffect(() => {
        if (validerJeton(jeton)) {
            const { nom, courriel, role } = jwtDecode(jeton);
            setUtilisateur({ nom, courriel, role });
        } else {
            setUtilisateur(null);
        }
    }, [jeton]);

    function validerJeton(jeton) {
        if (!jeton) {
            return false;
        }

        try {
            const decoded = jwtDecode(jeton);
            return decoded.exp * 1000 > Date.now();
        } catch (erreur) {
            return false;
        }
    }

    function connexion(nouveauJeton) {
        if (validerJeton(nouveauJeton)) {
            localStorage.setItem("jeton", nouveauJeton);
            setJeton(nouveauJeton);
        }
    }

    function deconnexion() {
        localStorage.removeItem("jeton");
        setJeton(null);
    }

    return (
        <AuthContext.Provider value={{ jeton, utilisateur, connexion, deconnexion }}>{children}</AuthContext.Provider>
    );
}

export default AuthContextProvider;
