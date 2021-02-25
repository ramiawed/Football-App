import ClubsTypes from "./clubs.types";

const INITIAL_STATE = {
  // store the clubs retrieved from DB
  clubs: [],
  // determine if the clubs are loading from DB or Not
  isLoading: false,
  // store the error object during the loading stage
  error: null,
  //
  deleteClubLoading: false,
  deleteClubError: null,
  deleteClubSuccess: false,
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
    case ClubsTypes.GET_ALL_CLUB_START:
      return {
        ...state,
        isLoading: true,
      };

    case ClubsTypes.GET_CLUBS_SUCCESS:
    case ClubsTypes.GET_ALL_CLUBS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        clubs: action.payload,
        hasChanged: false,
        error: null,
      };

    case ClubsTypes.GET_CLUBS_FAIL:
    case ClubsTypes.GET_ALL_CLUBS_FAIL:
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

    case ClubsTypes.DELETE_CLUB_START:
      return {
        ...state,
        deleteClubLoading: true,
        deleteClubError: null,
        deleteClubSuccess: false,
      };

    case ClubsTypes.DELETE_CLUB_FAIL:
      return {
        ...state,
        deleteClubError: action.payload,
        deleteClubLoading: false,
        deleteClubSuccess: false,
      };

    case ClubsTypes.DELETE_CLUB_SUCCESS:
      return {
        ...state,
        clubs: state.clubs.filter((club) => club._id !== action.payload),
        deleteClubLoading: false,
        deleteClubError: null,
        deleteClubSuccess: true,
      };

    case ClubsTypes.RESET_DELETE_CLUB_SUCCESS:
      return {
        ...state,
        deleteClubSuccess: false,
      };

    case ClubsTypes.RESET_DELETE_CLUB_LOADING:
      return {
        ...state,
        deleteClubLoading: false,
      };

    case ClubsTypes.RESET_DELETE_CLUB_ERROR:
      return {
        ...state,
        deleteClubError: null,
      };

    case ClubsTypes.DELETE_CLUB_CANCEL:
      return {
        ...state,
        deleteClubLoading: false,
        deleteClubError: null,
        deleteClubSuccess: false,
      };

    default:
      return state;
  }
};

export default ClubsReducer;
