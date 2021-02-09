import LeaguesActionTypes from "./leagues.types";

const INITIAL_STATE = {
  // contains all the leagues retrieved from DB
  leagues: [],
  // store if the leagues are loading from DB or Not
  isLoading: false,
  // store the error when loading the leagues from the DB fails
  error: null,
  // to define if the leagues in DB changed after loading it
  hasChanged: true,
  selectedLeague: null,
};

const leagueReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LeaguesActionTypes.GET_LEAGUE_START:
      return {
        ...state,
        isLoading: true,
      };

    case LeaguesActionTypes.GET_LEAGUE_SUCCESS:
      return {
        ...state,
        leagues: action.payload,
        hasChanged: false,
        error: null,
        isLoading: false,
      };

    case LeaguesActionTypes.GET_LEAGUE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case LeaguesActionTypes.SET_SELECTED_LEAGUE:
      return {
        ...state,
        selectedLeague: action.payload,
      };

    default:
      return state;
  }
};

export default leagueReducer;
