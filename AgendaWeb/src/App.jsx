import { Routes, Route} from "react-router-dom";
import EventosPage from "./pages/Eventos/EventosPage.jsx";
import ContactosPage from "./pages/Contactos/ContactosPage.jsx";
import IndexPage from "./pages/IndexPage.jsx";

function App() {

  return (

    <Routes>
      <Route
        path="/"
        element={<IndexPage />}
      />
      <Route
        path="/eventos"
        element={<EventosPage />}
      />
      <Route
        path="/contactos"
        element={<ContactosPage />}
      />
    </Routes>

  );
}

export default App;