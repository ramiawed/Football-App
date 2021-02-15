import ClubsTypes from "./clubs.types";

const INITIAL_STATE = {
  // store the clubs retrieved from DB
  clubs: [],
  // determine if the clubs are loading from DB or Not
  isLoading: false,
  // store the error object during the loading stage
  error: null,

  /* 
   determine if the clubs changed(in the DB, or the use leave the league page), 
   this help to do not fetch the data from DB when you are in the same league
   but navigate through its options

   this options should change when
   1- the user back to EntryPage
   2- DB notify that the clubs changed in DB 
  */
  hasChanged: true,

  // store the selected team
  selectedClub: null,
};

const ClubsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ClubsTypes.GET_CLUBS_START:
      return {
        ...state,
        isLoading: true,
      };

    case ClubsTypes.GET_CLUBS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        clubs: action.payload,
        hasChanged: false,
        error: null,
      };

    case ClubsTypes.GET_CLUBS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case ClubsTypes.SET_SELECTED_CLUB:
      return {
        ...state,
        selectedClub: action.payload,
      };

    case ClubsTypes.RESET_SELECTED_CLUB:
      return {
        ...state,
        selectedClub: null,
      };

    case ClubsTypes.CLUBS_HAS_CHANGE:
      return {
        ...state,
        hasChanged: true,
      };

    default:
      return state;
  }
};

export default ClubsReducer;
