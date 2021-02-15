import { useSelector, connect } from "react-redux";
import {
  getClubsAsync,
  resetSelectedClub,
} from "../../redux/clubs/clubs.actions";
import "./clubs.style.scss";
import { useEffect, useState } from "react";
import Club from "../club/club.component";
import Modal from "../modal/modal.component";

function Clubs({ getClubs, resetSelectedClub }) {
  const { clubs, isLoading, hasChanged } = useSelector((state) => state.clubs);
  const { selectedCompetition } = useSelector((state) => state.competitions);
  const [showTeamDetailsModal, setShowTeamDetailsModal] = useState(false);

  const showModal = () => {
    setShowTeamDetailsModal(true);
  };

  const closeModal = () => {
    setShowTeamDetailsModal(false);
    resetSelectedClub();
  };

  useEffect(() => {
    if (hasChanged) getClubs(selectedCompetition._id);
  }, [getClubs, selectedCompetition._id, hasChanged]);

  return (
    <div className="clubs-container">
      {showTeamDetailsModal ? (
        <div className="modal-background" onClick={closeModal}></div>
      ) : null}
      {isLoading || clubs.length === 0 ? (
        <div>loading</div>
      ) : (
        clubs.map((club) => (
          <Club showDetails={showModal} key={club._id} club={club} />
        ))
      )}

      <Modal show={showTeamDetailsModal} close={closeModal} />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getClubs: (competitionId) => dispatch(getClubsAsync(competitionId)),
  resetSelectedClub: () => dispatch(resetSelectedClub()),
});

export default connect(null, mapDispatchToProps)(Clubs);
