import NavOptionsTypes from "./nav-options.types";
import CONSTANTS from "../../utils/constants.util";

const INITIAL_STATE = {
  option: CONSTANTS.STANDINGS,
};

const navOptionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NavOptionsTypes.SET_OPTION:
      return {
        ...state,
        option: action.payload,
      };

    default:
      return state;
  }
};

export default navOptionsReducer;
