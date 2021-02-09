import { useSelector, connect } from "react-redux";
import {
  getTeamsAsync,
  resetSelectedTeam,
} from "../../redux/teams/teams.actions";
import "./teams.style.scss";
import { useEffect, useState } from "react";
import Team from "../team/team.component";
import Modal from "../modal/modal.component";

function Teams({ getTeams, resetSelectedTeam }) {
  const { teams, isLoading, hasChanged } = useSelector((state) => state.teams);
  const { selectedLeague } = useSelector((state) => state.leagues);
  const [showTeamDetailsModal, setShowTeamDetailsModal] = useState(false);

  const showModal = () => {
    setShowTeamDetailsModal(true);
  };

  const closeModal = () => {
    setShowTeamDetailsModal(false);
    resetSelectedTeam();
  };

  useEffect(() => {
    if (hasChanged) getTeams(selectedLeague._id);
  }, [getTeams, selectedLeague._id, hasChanged]);

  return (
    <div className="teams-container">
      {showTeamDetailsModal ? (
        <div className="modal-background" onClick={closeModal}></div>
      ) : null}
      {isLoading || teams.length === 0 ? (
        <div>loading</div>
      ) : (
        teams.map((team) => (
          <Team showDetails={showModal} key={team._id} team={team} />
        ))
      )}

      <Modal show={showTeamDetailsModal} close={closeModal} />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getTeams: (leagueId) => dispatch(getTeamsAsync(leagueId)),
  resetSelectedTeam: () => dispatch(resetSelectedTeam()),
});

export default connect(null, mapDispatchToProps)(Teams);
