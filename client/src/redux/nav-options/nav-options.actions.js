import NavOptionsTypes from "./nav-options.types";

export const setOptions = (option) => ({
  type: NavOptionsTypes.SET_OPTION,
  payload: option,
});
