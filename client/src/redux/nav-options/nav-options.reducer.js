import NavOptionsTypes from "./nav-options.types";
import CONSTANTS from "../../utils/constants.util";

const INITIAL_STATE = {
  competitionOptions: CONSTANTS.COMPETITION_STANDINGS,
  clubDetailsOptions: CONSTANTS.CLUB_INFO,
  adminOptions: CONSTANTS.ADMIN_COMPETITIONS,
};

const navOptionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NavOptionsTypes.SET_COMPETITION_OPTION:
      return {
        ...state,
        competitionOptions: action.payload,
      };

    case NavOptionsTypes.SET_CLUB_OPTION:
      return {
        ...state,
        clubDetailsOptions: action.payload,
      };

    case NavOptionsTypes.SET_ADMIN_OPTION:
      return {
        ...state,
        adminOptions: action.payload
      };
      
    default:
      return state;
  }
};

export default navOptionsReducer;
