
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authentification from "./pages/Authentification";
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
      <Routes>
        <Route path="/" element={<Authentification />} />
        <Route path="/enregistrement" element={<Enregistrement />} />
        <Route path="/entree-sortie" element={<Horaire />} />
        <Route path="/historique" element={<Historique />} />
        <Route path="/recherche" element={<Recherche />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;