import "./App.css";
import Home from "./Home";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PokeDex from "./PokeDex";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/pokedex" component={PokeDex} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
