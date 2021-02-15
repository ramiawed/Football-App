import { Route, Switch } from "react-router-dom";
import EntryPage from "./pages/entry-page/entry-page.component";
import MainPage from "./pages/main-page/main-page.component";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={EntryPage} />
        <Route path="/competition" exact component={MainPage} />
      </Switch>
    </div>
  );
}

export default App;
