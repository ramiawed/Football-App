import { Route, Switch } from "react-router-dom";
import ClubDetailsPage from "./pages/club-details-page/club-details-page.component";
import EntryPage from "./pages/entry-page/entry-page.component";
import CompetitionPage from "./pages/competition-page/competition-page.component.jsx";
import AdminPage from "./pages/admin-page/admin-page.component";
import OrderSearch from "./components/order-search/order-search.component";
import ClubLoader from "./components/club-loader/club-loader.component.jsx";

function App() {
  return (
    <div className="App">
      {/* <ClubLoader /> */}
      <Switch>
        <Route path="/" exact component={EntryPage} />
        <Route path="/competition" exact component={CompetitionPage} />
        <Route path="/club" exact component={ClubDetailsPage} />
        <Route path="/admin" exact component={AdminPage} />
      </Switch>
    </div>
  );
}

export default App;
