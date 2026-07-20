import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Enregistrement from "./pages/Enregistrement";
import Horaire from "./pages/Horaire";
import Fonctionnalites from "./pages/Fonctionnalites";
import Authentification from "./pages/Authentification";
import APropos from "./pages/APropos";
import RespSec from "./pages/RespSec.jsx";

function AppRoutes() {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/");
    };

    return (
        <Routes>
            <Route
                path="/"
                element={<Authentification />}
            />

            <Route
                path="/accueil"
                element={<Accueil onLogout={handleLogout} />}
            />

            <Route path="/enregistrement" element={<Enregistrement />} />
            <Route path="/entree-sortie" element={<Horaire />} />
            <Route path="/fonctionnalites" element={<Fonctionnalites />} />
            <Route path="/a-propos" element={<APropos />} />
            <Route
                path="/repsec"
                element={<RespSec onLogout={handleLogout} />}
            />
        </Routes>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
}

export default App;