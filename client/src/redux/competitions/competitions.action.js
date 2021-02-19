import CompetitionsActionTypes from "./competitions.types";
import { clubsHasChanged } from "../clubs/clubs.actions";
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

// if the selected competition is the same as the previous one
// don't change anything else
// change the selected competition and set the clubsHasChange to true
export const setSelectedCompetition = (competition) => ({
  type: CompetitionsActionTypes.SET_SELECTED_COMPETITION,
  payload: competition,
});

export const setSelectedCompetitionAsync = (prev, competition) => {
  return async (dispatch) => {
    try {
      if (!prev || prev._id !== competition._id) {
        dispatch(setSelectedCompetition(competition));
        dispatch(clubsHasChanged());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

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
