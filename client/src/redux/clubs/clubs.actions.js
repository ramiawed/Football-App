import axios from "axios";
import ClubsTypes from "./clubs.types";

export const getClubsStart = () => ({
  type: ClubsTypes.GET_CLUBS_START,
});

export const getClubsSuccess = (data) => ({
  type: ClubsTypes.GET_CLUBS_SUCCESS,
  payload: data,
});

export const getClubsFail = (error) => ({
  type: ClubsTypes.GET_CLUBS_FAIL,
  payload: error,
});

export const getClubsAsync = (competitionId) => {
  return async (dispatch) => {
    try {
      dispatch(getClubsStart());

      const { data } = await axios.get(
        `/api/v1/competitions/${competitionId}/clubs`
      );

      console.log(data.data.clubs);

      dispatch(getClubsSuccess(data.data.clubs));
    } catch (error) {
      console.log(error);
      dispatch(getClubsFail(error));
    }
  };
};

export const setSelectedClub = (team) => ({
  type: ClubsTypes.SET_SELECTED_CLUB,
  payload: team,
});

export const resetSelectedClub = () => ({
  type: ClubsTypes.SET_SELECTED_CLUB,
});

export const clubsHasChanged = () => ({
  type: ClubsTypes.CLUBS_HAS_CHANGE,
});
