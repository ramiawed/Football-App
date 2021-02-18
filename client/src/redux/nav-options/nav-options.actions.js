import NavOptionsTypes from "./nav-options.types";

// change the state based on the page that you are in,
export const setOption = (property, option) => {
  if (property === "competition") {
    return {
      type: NavOptionsTypes.SET_COMPETITION_OPTION,
      payload: option,
    };
  } else if (property === "club") {
    return {
      type: NavOptionsTypes.SET_CLUB_OPTION,
      payload: option,
    };
  } else if (property === "admin") {
    return {
      type: NavOptionsTypes.SET_ADMIN_OPTION,
      payload: option,
    };
  }
};
