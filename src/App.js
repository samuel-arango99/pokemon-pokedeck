import "./App.css";
import Card from "./components/UI/Card";
import Header from "./components/Header/Header";
import PokeDeck from "./components/Main/PokeDeck";
import PokeCardSpecific from "./components/Main/PokeCardSpecific";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Card>
        <Header />
      </Card>
      <Routes>
        <Route path="/" element={<Navigate to="/pokemon" />} />
        <Route path="/pokemon" element={<PokeDeck />} />
        <Route path="/pokemon/:id" element={<PokeCardSpecific />} />
        <Route path="*" element={<Navigate to="/pokemon" />} />
      </Routes>
    </div>
  );
}

export default App;
