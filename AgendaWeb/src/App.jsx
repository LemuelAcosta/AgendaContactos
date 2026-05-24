import { Routes, Route} from "react-router-dom";
import EventosPage from "./pages/EventosPage.jsx";

function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<EventosPage />}
      />

    </Routes>

  );
}

export default App;