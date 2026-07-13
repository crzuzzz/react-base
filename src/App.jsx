import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Enregistrement from "./pages/Enregistrement";
import Horaire from "./pages/Horaire";
import Historique from "./pages/Historique";
import Recherche from "./pages/Recherche";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/enregistrement" element={<Enregistrement />} />
        <Route path="/entree-sortie" element={<Horaire />} />
        <Route path="/historique" element={<Historique />} />
        <Route path="/recherche" element={<Recherche />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;