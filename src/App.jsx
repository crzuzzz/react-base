import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Authentification from "./pages/Authentification";
import Accueil from "./pages/Accueil";
import Enregistrement from "./pages/Enregistrement";
import Horaire from "./pages/Horaire";
import Fonctionnalites from "./pages/Fonctionnalites";
import APropos from "./pages/APropos";
import RespSec from "./pages/RespSec.jsx";
import Admin from "./pages/Admin.jsx";
import File1 from "./pages/File1";
import File2 from "./pages/File2";
import ProtectedRoute from "./components/ProtectedRoute";

function AppRoutes() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Clear authentication session
    window.localStorage.removeItem("isAuthenticated");
    window.localStorage.removeItem("user");

    // 2. Redirect to login & clear browser history stack
    navigate("/", { replace: true });
  };

  return (
    <Routes>
      {/* Public Login Route */}
      <Route path="/" element={<Authentification />} />

      {/* Role 1: Reception / Accueil Routes */}
      <Route
        path="/accueil"
        element={
          <ProtectedRoute allowedRoles={[1]}>
            <Accueil onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/enregistrement"
        element={
          <ProtectedRoute allowedRoles={[1]}>
            <Enregistrement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/entree-sortie"
        element={
          <ProtectedRoute allowedRoles={[1]}>
            <Horaire />
          </ProtectedRoute>
        }
      />
      <Route
        path="/fonctionnalites"
        element={
          <ProtectedRoute allowedRoles={[1]}>
            <Fonctionnalites mode="accueil" />
          </ProtectedRoute>
        }
      />

      {/* Role 2: Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={[2]}>
            <Admin onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/fonctionnalites"
        element={
          <ProtectedRoute allowedRoles={[2]}>
            <Fonctionnalites mode="admin" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/file1"
        element={
          <ProtectedRoute allowedRoles={[2]}>
            <File1 />
          </ProtectedRoute>
        }
      />
      <Route
        path="/file2"
        element={
          <ProtectedRoute allowedRoles={[2]}>
            <File2 />
          </ProtectedRoute>
        }
      />

      {/* Role 3: Security Officer Route */}
      <Route
        path="/repsec"
        element={
          <ProtectedRoute allowedRoles={[3]}>
            <RespSec onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />

      {/* Shared Public or General Info Pages */}
      <Route
        path="/a-propos"
        element={
          <ProtectedRoute allowedRoles={[1, 2, 3]}>
            <APropos />
          </ProtectedRoute>
        }
      />

      {/* Fallback Catch-all: Redirect unknown paths back to login */}
      <Route path="*" element={<Authentification />} />
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