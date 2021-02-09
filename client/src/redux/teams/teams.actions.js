import axios from "axios";
import TeamsTypes from "./teams.types";

export const getTeamsStart = () => ({
  type: TeamsTypes.GET_TEAMS_START,
});

export const getTeamsSuccess = (data) => ({
  type: TeamsTypes.GET_TEAMS_SUCCESS,
  payload: data,
});

export const getTeamsFail = (error) => ({
  type: TeamsTypes.GET_TEAMS_FAIL,
  payload: error,
});

export const getTeamsAsync = (leagueId) => {
  return async (dispatch) => {
    try {
      dispatch(getTeamsStart());

      const { data } = await axios.get(`/api/v1/teams/${leagueId}`);

      dispatch(getTeamsSuccess(data.data.teams));
    } catch (error) {
      console.log(error);
      dispatch(getTeamsFail(error));
    }
  };
};

export const setSelectedTeam = (team) => ({
  type: TeamsTypes.SET_SELECTED_TEAM,
  payload: team,
});

export const resetSelectedTeam = () => ({
  type: TeamsTypes.SET_SELECTED_TEAM,
});

export const teamsHasChange = () => ({
  type: TeamsTypes.TEAMS_HAS_CHANGE,
});
