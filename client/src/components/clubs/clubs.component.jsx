// this component is the container that contains
// all the clubs for a specific competition
// props:
// - getClubs: fires a getClubsAsync actions to get all the club
// for a specific competition
// - resetSelectedClub: fires a resetSelectedClub action to set
// the selectedClub to null

// library
import { useSelector, connect } from "react-redux";
import { useEffect, useState } from "react";

// components
import Club from "../club/club.component";

// actions
import {
  getClubsAsync,
  resetSelectedClub,
} from "../../redux/clubs/clubs.actions";
// import Modal from "../modal/modal.component";

// style
import "./clubs.style.scss";

function Clubs({ getClubs, resetSelectedClub }) {
  // get the clubs, isLoading, hasChnaged from club-reducer
  const { clubs, isLoading, hasChanged } = useSelector((state) => state.clubs);

  // get the selectedCompetition from competition-reducer
  const { selectedCompetition } = useSelector((state) => state.competitions);

  // boolean state to show or hide the club model
  // const [showTeamDetailsModal, setShowTeamDetailsModal] = useState(false);

  // const showModal = () => {
  //   setShowTeamDetailsModal(true);
  // };

  // const closeModal = () => {
  //   setShowTeamDetailsModal(false);
  //   resetSelectedClub();
  // };

  useEffect(() => {
    if (hasChanged) getClubs(selectedCompetition._id);
  }, [getClubs, selectedCompetition._id, hasChanged]);

  return (
    <div className="clubs-container">
      {/* {showTeamDetailsModal ? (
        <div className="modal-background" onClick={closeModal}></div>
      ) : null} */}
      {isLoading || clubs.length === 0 ? (
        <div>loading</div>
      ) : (
        clubs.map((club) => <Club key={club._id} club={club} />)
      )}

      {/* <Modal show={showTeamDetailsModal} close={closeModal} /> */}
    </div>
  );
}

// actions
const mapDispatchToProps = (dispatch) => ({
  getClubs: (competitionId) => dispatch(getClubsAsync(competitionId)),
  resetSelectedClub: () => dispatch(resetSelectedClub()),
});

export default connect(null, mapDispatchToProps)(Clubs);
