import CompetitionsActionTypes from "./competitions.types";
import axios from "axios";

export const getCompetitionsStart = () => ({
  type: CompetitionsActionTypes.GET_COMPETITION_START,
});

export const getCompetitionsSuccess = (data) => ({
  type: CompetitionsActionTypes.GET_COMPETITION_SUCCESS,
  payload: data,
});

export const getCompetitionsFail = (error) => ({
  type: CompetitionsActionTypes.GET_COMPETITION_FAIL,
  payload: error,
});

export const setSelectedCompetition = (competition) => ({
  type: CompetitionsActionTypes.SET_SELECTED_COMPETITION,
  payload: competition,
});

export const getCompetitionsAsync = () => {
  return async (dispatch) => {
    try {
      dispatch(getCompetitionsStart);

      const { data } = await axios.get("/api/v1/competitions");

      dispatch(getCompetitionsSuccess(data.data.competitions));
    } catch (error) {
      dispatch(getCompetitionsFail(error));
    }
  };
};
