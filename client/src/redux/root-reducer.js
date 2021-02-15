import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import competitionsReducer from "./competitions/competitions.reducer";
import navOptionsReducer from "./nav-options/nav-options.reducer";
import ClubsReducer from "../redux/clubs/clubs.reducer";

const rootReducer = combineReducers({
  // contains all the competitions retrieve from DB
  competitions: competitionsReducer,
  // to choose between standings, news, fixtures, clubs, statistics
  // main use in the navbar in the main page
  navOptions: navOptionsReducer,
  // contains all the clubs belong to selected competition
  // retrieve from DB
  clubs: ClubsReducer,
});

export default rootReducer;
