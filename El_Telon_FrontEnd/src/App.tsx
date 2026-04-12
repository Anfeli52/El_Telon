import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import AdminDashboard from './pages/admin/Dashboard';
import { Cartelera } from './pages/Cartelera';
import WorkerDashboard from './pages/worker/Dashboard';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <div className="App">
                    <Navbar />
                    
                    <Routes>
                        {/* --- RUTAS PÚBLICAS --- */}
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/cartelera" element={<Cartelera />} />

                        {/* --- RUTAS SÓLO PARA USUARIOS (O ADMINS QUE QUIERAN VER PELÍCULAS) --- */}
                        <Route element={<ProtectedRoute allowedRoles={['ROLE_USER']} />}>
                            
                        </Route>

                        {/* --- RUTAS SÓLO PARA EL TRABAJADOR (WORKER) --- */}
                        <Route element={<ProtectedRoute allowedRoles={['ROLE_WORKER']} />}>
                            <Route path="/worker/dashboard" element={<WorkerDashboard />} />
                        </Route>

                        {/* --- RUTAS SÓLO PARA EL ADMIN --- */}
                        <Route element={<ProtectedRoute allowedRoles={['ROLE_ADMIN']} />}>
                            <Route path="/admin/dashboard" element={<AdminDashboard />} />
                        </Route>

                        {/* --- REDIRECCIÓN Y ERROR --- */}
                        <Route path="/" element={<Navigate to="/cartelera" replace />} />
                        <Route path="*" element={<h2>404 - No tienes permiso o la página no existe</h2>} />
                    </Routes>
                </div>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;