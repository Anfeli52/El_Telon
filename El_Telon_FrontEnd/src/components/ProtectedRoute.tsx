import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface Props {
    allowedRoles?: string[];
}

const ProtectedRoute = ({ allowedRoles }: Props) => {
    const { token, role } = useAuth();

    // 1. Si ni siquiera hay token, al login de una vez
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // 2. Si hay roles permitidos definidos y el rol del usuario no está en esa lista
    if (allowedRoles && !allowedRoles.includes(role || '')) {
        if (role === 'ROLE_ADMIN') {
            return <Navigate to="/admin/dashboard" replace />;
        }

        if (role === 'ROLE_WORKER') {
            return <Navigate to="/worker/dashboard" replace />;
        }

        return <Navigate to="/cartelera" replace />;
    }

    // 3. Si todo está bien, adelante
    return <Outlet />;
};

export default ProtectedRoute;
