import "./App.css";
import Card from "./components/UI/Card";
import Header from "./components/Header/Header";
import PokeDeck from "./components/Main/PokeDeck";

function App() {
  return (
    <div className="App">
      <Card>
        <Header></Header>
      </Card>
      <PokeDeck></PokeDeck>
    </div>
  );
}

export default App;
