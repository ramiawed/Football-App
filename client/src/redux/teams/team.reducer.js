import TeamsTypes from "./teams.types";

const INITIAL_STATE = {
  // store the teams retrieved from DB
  teams: [],
  // determine if the teams are loading from DB or Not
  isLoading: false,
  // store the error object during the loading stage
  error: null,

  /* 
   determine if the teams changed(in the DB, or the use leave the league page), 
   this help to do not fetch the data from DB when you are in the same league
   but navigate through its options

   this options should change when
   1- the user back to EntryPage
   2- DB notify that the teams changed in DB 
  */
  hasChanged: true,

  // store the selected team
  selectedTeam: null,
};

const TeamsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TeamsTypes.GET_TEAMS_START:
      return {
        ...state,
        isLoading: true,
      };

    case TeamsTypes.GET_TEAMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        teams: action.payload,
        hasChanged: false,
        error: null,
      };

    case TeamsTypes.GET_TEAMS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case TeamsTypes.SET_SELECTED_TEAM:
      return {
        ...state,
        selectedTeam: action.payload,
      };

    case TeamsTypes.RESET_SELECTED_TEAM:
      return {
        ...state,
        selectedTeam: null,
      };

    case TeamsTypes.TEAMS_HAS_CHANGE:
      return {
        ...state,
        hasChanged: true,
      };

    default:
      return state;
  }
};

export default TeamsReducer;
