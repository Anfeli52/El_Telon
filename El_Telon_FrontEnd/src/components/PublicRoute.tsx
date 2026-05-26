import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { isJwtExpired } from "../utils/authToken";

export const PublicRoute = () => {
    const { token } = useAuth();

    if (isJwtExpired(token)) {
        return <Outlet />;
    }

    if(token) {
        return <Navigate to="/cartelera" replace />;
    }

    return <Outlet />;
}