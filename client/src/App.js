import { Route, Switch } from "react-router-dom";
import ClubDetailsPage from "./pages/club-details-page/club-details-page.component";
import EntryPage from "./pages/entry-page/entry-page.component";
import MainPage from "./pages/main-page/main-page.component";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={EntryPage} />
        <Route path="/competition" exact component={MainPage} />
        <Route path="/club" exact component={ClubDetailsPage} />
      </Switch>
    </div>
  );
}

export default App;
