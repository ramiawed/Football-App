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
import { useHistory } from "react-router-dom";

// components
import Club from "../club/club.component";
import OrderSearch from "../order-search/order-search.component";
import ClubLoader from "../club-loader/club-loader.component";

// actions
import {
  getClubsAsync,
  resetSelectedClub,
  setSelectedClub,
} from "../../redux/clubs/clubs.actions";
import { setOption } from "../../redux/nav-options/nav-options.actions";

// utils
import CONSTANTS from "../../utils/constants.util";

// style
import "./clubs.style.scss";

function Clubs({ getClubs, resetSelectedClub, selectClub, setOption }) {
  const history = useHistory();

  // own state
  // state to watch the value in the search input field
  const [searchClub, setSearchClub] = useState("");
  // state to watch the value in the order select option
  const [orderClub, setOrderClub] = useState("name");

  // state from the root store
  // get the clubs, isLoading, hasChanged from club-reducer
  const { clubs, isLoading, hasChanged } = useSelector((state) => state.clubs);
  // get the selectedCompetition from competition-reducer
  const { selectedCompetition } = useSelector((state) => state.competitions);

  // empty array use to display 9 ClubLoader component when the clubs loading from DB
  const emptyArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  // handle to execute when click on Club component.
  const handleClubClick = (cl) => {
    // fire selectedClub action
    selectClub(cl);

    // fire setOption action
    setOption("club", CONSTANTS.CLUB_INFO);

    // go to club-details page
    history.push("/club");
  };

  // options should provide to the OrderSearch component.
  // this options will display in the Select component in OrderSearch component
  const orderOptions = [
    { value: "name", label: "Name" },
    { value: "name desc", label: "Name Desc" },
    { value: "founded", label: "Founded" },
    { value: "founded desc", label: "Founded Desc" },
  ];

  // handle passes to the OrderSearch component to handle the search input onChange
  const handleChangeSearchValue = (val) => {
    setSearchClub(val);
  };

  // handler passes to the OrderSearch component to handle the Select component onChange
  const handleChangeOrder = (val) => {
    setOrderClub(val);
  };

  // method the order the clubs based on the order option
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

  // hooks
  useEffect(() => {
    if (hasChanged) getClubs(selectedCompetition._id);
  }, [getClubs, selectedCompetition._id, hasChanged]);

  return (
    <div>
      <OrderSearch
        className="order-search"
        bgColor={selectedCompetition.color}
        foreColor="rgb(255, 255, 255)"
        searchChange={handleChangeSearchValue}
        orderChange={handleChangeOrder}
        orderOptions={orderOptions}
        searchPlaceholder="Search Clubs"
      />

      <div className="clubs-container">
        {isLoading || clubs.length === 0
          ? emptyArray.map((el, index) => (
              <ClubLoader key={index} bgColor={selectedCompetition.color} />
            ))
          : clubs
              .sort(compareClubs)
              .filter((club) =>
                club.name
                  .toLowerCase()
                  .includes(searchClub.toLowerCase().trim())
              )
              .map((club) => (
                <Club
                  key={club._id}
                  club={club}
                  borderColor={selectedCompetition.color}
                  onclick={handleClubClick}
                />
              ))}
      </div>
    </div>
  );
}

// actions
const mapDispatchToProps = (dispatch) => ({
  getClubs: (competitionId) => dispatch(getClubsAsync(competitionId)),
  resetSelectedClub: () => dispatch(resetSelectedClub()),
  selectClub: (team) => dispatch(setSelectedClub(team)),
  setOption: (property, opt) => dispatch(setOption(property, opt)),
});

export default connect(null, mapDispatchToProps)(Clubs);
