import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext";

function AdminRoute() {
    const { jeton, utilisateur } = useContext(AuthContext);
    if (!jeton || utilisateur.role > 0) {
        return <Navigate to="/" />;
    } else {
        return <Outlet />;
    }
}

export default AdminRoute;
