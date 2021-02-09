import LeaguesActionTypes from "./leagues.types";
import axios from "axios";

export const getLeaguesStart = () => ({
  type: LeaguesActionTypes.GET_LEAGUE_START,
});

export const getLeaguesSuccess = (data) => ({
  type: LeaguesActionTypes.GET_LEAGUE_SUCCESS,
  payload: data,
});

export const getLeagueFail = (error) => ({
  type: LeaguesActionTypes.GET_LEAGUE_FAIL,
  payload: error,
});

export const setSelectedLeague = (league) => ({
  type: LeaguesActionTypes.SET_SELECTED_LEAGUE,
  payload: league,
});

export const getLeaguesAsync = () => {
  return async (dispatch) => {
    try {
      dispatch(getLeaguesStart);

      const { data } = await axios.get("/api/v1/leagues");

      dispatch(getLeaguesSuccess(data.data.leagues));
    } catch (error) {
      console.log(error);
      dispatch(getLeagueFail(error));
    }
  };
};
