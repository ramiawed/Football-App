import { Route, Switch } from "react-router-dom";
import ClubDetailsPage from "./pages/club-details-page/club-details-page.component";
import EntryPage from "./pages/entry-page/entry-page.component";
import CompetitionPage from "./pages/competition-page/competition-page.component.jsx";
import AdminPage from "./pages/admin-page/admin-page.component";
import OrderSearch from "./components/order-search/order-search.component";

function App() {
  return (
    <div className="App">
      {/* <OrderSearch bgColor="rgb(123, 8, 201)" foreColor="rgb(255, 255, 255)" /> */}
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
