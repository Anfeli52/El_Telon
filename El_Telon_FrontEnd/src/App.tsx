import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import AdminDashboard from './pages/admin/Dashboard';
import { Cartelera } from './pages/Cartelera';
import WorkerDashboard from './pages/worker/Dashboard';
import SeatSelectionPage from './pages/SeatSelectionPage';
import ChairSelectionPage from './pages/ChairSelectionPage';
import PaymentPage from './pages/PaymentPage';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <div className="App">
                    <Navbar />

                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />

                        <Route element={<ProtectedRoute allowedRoles={['ROLE_USER', 'ROLE_ADMIN', 'ROLE_WORKER']} />}>
                            <Route path="/cartelera" element={<Cartelera />} />
                            <Route path="/peliculas/:movieId/asientos" element={<SeatSelectionPage />} />
                            <Route path="/funciones/:functionId/asientos" element={<ChairSelectionPage />} />
                            <Route path="/funciones/:functionId/pago" element={<PaymentPage />} />
                        </Route>

                        <Route element={<ProtectedRoute allowedRoles={['ROLE_WORKER']} />}>
                            <Route path="/worker/dashboard" element={<WorkerDashboard />} />
                        </Route>

                        <Route element={<ProtectedRoute allowedRoles={['ROLE_ADMIN']} />}>
                            <Route path="/admin/dashboard" element={<AdminDashboard />} />
                        </Route>

                        <Route path="/" element={<Navigate to="/cartelera" replace />} />
                        <Route path="*" element={<h2>404 - No tienes permiso o la pagina no existe</h2>} />
                    </Routes>
                </div>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;

