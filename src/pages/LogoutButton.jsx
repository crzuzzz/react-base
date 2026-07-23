import { useNavigate } from "react-router-dom";
import "./Accueil.css";


export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Clear session storage
    window.localStorage.removeItem("isAuthenticated");
    window.localStorage.removeItem("user");

    // 2. Redirect to login page and replace browser history entry
    navigate("/", { replace: true });
  };

  return (
    <button onClick={handleLogout} className="logout-btn" className="button button-primary" type="button" LogoutButton>
      Déconnexion
    </button>
  );
}