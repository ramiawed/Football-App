import axios from "axios";
import ClubsTypes from "./clubs.types";

let CancelToken;
let source;

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

      dispatch(getClubsSuccess(data.data.clubs));
    } catch (error) {
      dispatch(getClubsFail(error));
    }
  };
};

export const getAllClubsAsync = () => {
  return async (dispatch) => {
    try {
      dispatch(getClubsStart());

      const { data } = await axios.get(`/api/v1/clubs`);

      dispatch(getClubsSuccess(data.data.clubs));
    } catch (error) {
      dispatch(getClubsFail(error));
    }
  };
};

export const deleteClubStart = () => ({
  type: ClubsTypes.DELETE_CLUB_START,
});

export const deleteClubSuccess = (clubId) => ({
  type: ClubsTypes.DELETE_CLUB_SUCCESS,
  payload: clubId,
});

export const deleteClubFail = (error) => ({
  type: ClubsTypes.DELETE_CLUB_FAIL,
  payload: error,
});

export const resetDeleteClubSuccess = () => ({
  type: ClubsTypes.RESET_DELETE_CLUB_SUCCESS,
});

export const resetDeleteClubLoading = () => ({
  type: ClubsTypes.RESET_DELETE_CLUB_LOADING,
});

export const resetDeleteClubError = () => ({
  type: ClubsTypes.RESET_DELETE_CLUB_ERROR,
});

export const deleteClubAsync = (clubId) => {
  return async (dispatch) => {
    CancelToken = axios.CancelToken;
    source = CancelToken.source();
    if (!window.navigator.onLine) {
      source.cancel("No Connection");
      console.log("no connection");
    }

    dispatch(deleteClubStart());

    const interval = setTimeout(() => {
      source.cancel("Timeout, check you connection");
    }, 9000);

    setTimeout(() => {
      axios
        .get(`/api/v1/clubs/delete/${clubId}`, {
          cancelToken: source.token,
        })
        .then(function (response) {
          console.log("success");
          clearInterval(interval);
          dispatch(deleteClubSuccess(clubId));
        })
        .catch(function (thrown) {
          console.log("fail");
          clearInterval(interval);
          dispatch(deleteClubFail(thrown));
        });
    }, 4000);
  };
};

export const deleteClubCancel = () => {
  return async (dispatch) => {
    source.cancel("Cancel Delete Operation");

    dispatch({
      type: ClubsTypes.DELETE_CLUB_CANCEL,
    });
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
