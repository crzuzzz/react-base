import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Enregistrement from "./pages/Enregistrement";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/enregistrement" element={<Enregistrement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;