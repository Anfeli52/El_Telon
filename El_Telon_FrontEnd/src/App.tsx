import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import AdminDashboard from './pages/admin/Dashboard';
import { Cartelera } from './pages/Cartelera';
import WorkerDashboard from './pages/worker/Dashboard';
import { PublicRoute } from './components/PublicRoute';
import SeatSelectionPage from './pages/SeatSelectionPage';
import ChairSelectionPage from './pages/ChairSelectionPage';
import PaymentPage from './pages/PaymentPage';
import MyTickets from './pages/MyTickets';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <div className="App">
                    <Navbar />
                    <ToastContainer position="top-right" autoClose={2200} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="colored" />

                    <Routes>
                        <Route element={<PublicRoute />}>
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                        </Route>

                        {/* --- RUTAS SÓLO PARA USUARIOS (O ADMINS QUE QUIERAN VER PELÍCULAS) --- */}

                        <Route element={<ProtectedRoute allowedRoles={['ROLE_USER', 'ROLE_ADMIN', 'ROLE_WORKER']} />}>
                            <Route path="/peliculas/:movieId/asientos" element={<SeatSelectionPage />} />
                            <Route path="/funciones/:functionId/asientos" element={<ChairSelectionPage />} />
                            <Route path="/funciones/:functionId/pago" element={<PaymentPage />} />
                            <Route path="/mis-boletos" element={<MyTickets />} />
                        </Route>

                        <Route element={<ProtectedRoute allowedRoles={['ROLE_WORKER']} />}>
                            <Route path="/worker/dashboard" element={<WorkerDashboard />} />
                        </Route>

                        <Route element={<ProtectedRoute allowedRoles={['ROLE_ADMIN']} />}>
                            <Route path="/admin/dashboard" element={<AdminDashboard />} />
                        </Route>

                        <Route path="/cartelera" element={<Cartelera />} />
                        <Route path="/" element={<Navigate to="/cartelera" replace />} />
                        <Route path="*" element={<h2>404 - No tienes permiso o la pagina no existe</h2>} />
                    </Routes>
                </div>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;

