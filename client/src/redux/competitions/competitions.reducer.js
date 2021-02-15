import CompetitionsActionTypes from "./competitions.types";

const INITIAL_STATE = {
  // contains all the competitions retrieved from DB
  competitions: [],
  // store if the competitions are loading from DB or Not
  isLoading: false,
  // store the error when loading the competitions from the DB fails
  error: null,
  // to define if the leagues in DB changed after loading it
  hasChanged: true,
  selectedCompetition: null,
};

const competitionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CompetitionsActionTypes.GET_COMPETITION_START:
      return {
        ...state,
        isLoading: true,
      };

    case CompetitionsActionTypes.GET_COMPETITION_SUCCESS:
      return {
        ...state,
        competitions: action.payload,
        hasChanged: false,
        error: null,
        isLoading: false,
      };

    case CompetitionsActionTypes.GET_COMPETITION_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case CompetitionsActionTypes.SET_SELECTED_COMPETITION:
      return {
        ...state,
        selectedCompetition: action.payload,
      };

    default:
      return state;
  }
};

export default competitionsReducer;
