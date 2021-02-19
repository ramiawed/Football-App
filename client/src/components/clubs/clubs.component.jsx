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
import OrderSearch from "../order-search/order-search.component";

function Clubs({ getClubs, resetSelectedClub }) {
  // state to watch the value in the search input field
  const [searchClub, setSearchClub] = useState("");

  const [orderClub, setOrderClub] = useState("name");

  // get the clubs, isLoading, hasChanged from club-reducer
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

  const handleChangeSearchValue = (val) => {
    setSearchClub(val);
  };

  const handleChangeOrder = (val) => {
    setOrderClub(val);
  };

  const compareClubs = (a, b) => {
    if (orderClub === "name") {
      return a.name.localeCompare(b.name);
    } else if (orderClub === "name desc") {
      return b.name.localeCompare(a.name);
    } else if (orderClub === "founded") {
      return a.founded - b.founded;
    } else if (orderClub === "founded desc") {
      return b.founded - a.founded;
    }
  };

  return (
    <div>
      <OrderSearch
        className="order-search"
        bgColor={selectedCompetition.color}
        foreColor="rgb(255, 255, 255)"
        searchChange={handleChangeSearchValue}
        orderChange={handleChangeOrder}
      />
      <div className="clubs-container">
        {/* {showTeamDetailsModal ? (
        <div className="modal-background" onClick={closeModal}></div>
      ) : null} */}
        {isLoading || clubs.length === 0 ? (
          <div>loading</div>
        ) : (
          clubs
            .sort(compareClubs)
            .filter((club) =>
              club.name.toLowerCase().includes(searchClub.toLowerCase().trim())
            )
            .map((club) => <Club key={club._id} club={club} />)
        )}

        {/* <Modal show={showTeamDetailsModal} close={closeModal} /> */}
      </div>
    </div>
  );
}

// actions
const mapDispatchToProps = (dispatch) => ({
  getClubs: (competitionId) => dispatch(getClubsAsync(competitionId)),
  resetSelectedClub: () => dispatch(resetSelectedClub()),
});

export default connect(null, mapDispatchToProps)(Clubs);
