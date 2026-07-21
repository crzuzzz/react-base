import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Enregistrement from "./pages/Enregistrement";
import Horaire from "./pages/Horaire";
import Fonctionnalites from "./pages/Fonctionnalites";
import Authentification from "./pages/Authentification";
import APropos from "./pages/APropos";
import RespSec from "./pages/RespSec.jsx";
import Admin from "./pages/Admin.jsx"; // Capitalized Admin
import File1 from "./pages/File1"; // Import your new page
import File2 from "./pages/File2"; // Import your new page

function AppRoutes() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <Routes>
      <Route path="/" element={<Authentification />} />

      {/* Main Pages */}
      <Route path="/accueil" element={<Accueil onLogout={handleLogout} />} />
      <Route path="/enregistrement" element={<Enregistrement />} />
      <Route path="/entree-sortie" element={<Horaire />} />
      <Route path="/a-propos" element={<APropos />} />
      <Route path="/repsec" element={<RespSec onLogout={handleLogout} />} />

      {/* Admin Panel */}
      <Route path="/admin" element={<Admin onLogout={handleLogout} />} />

      {/* Dual-mode Fonctionnalités routes */}
      <Route path="/fonctionnalites" element={<Fonctionnalites mode="accueil" />} />
      <Route path="/admin/fonctionnalites" element={<Fonctionnalites mode="admin" />} />

      {/* Temporary Placeholders for Admin Feature Cards */}
      <Route path="/file1" element={<File1 />} />
      <Route path="/file2" element={<File2 />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}