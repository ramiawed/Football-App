import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import leaguesReducers from "./leagues/leagues.reducer";
import navOptionsReducer from "./nav-options/nav-options.reducer";
import TeamsReducer from "./teams/team.reducer";

const rootReducer = combineReducers({
  // contains all the leagues retrieve from DB
  leagues: leaguesReducers,
  // to choose between standings, news, fixtures, teams, statistics
  // main use in the navbar in the main page
  navOptions: navOptionsReducer,
  // contains all the teams belong to selected league
  // retrieve from DB
  teams: TeamsReducer,
});

export default rootReducer;
