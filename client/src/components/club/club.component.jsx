// This component will display a club logo with a name of the club
// it takes a 90% width when display on small screen
// it takes a 45% width when display on medium screen
// it takes a 30% width when display on large screen
// props:
// - club: come from the parent component
// - selectClub: action fires when you press on component
// - setOption: action fires to set option (CONSTANTS.CLUB_INFO)

// library
import { connect, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// action from redux
import { setSelectedClub } from "../../redux/clubs/clubs.actions";
import { setOption } from "../../redux/nav-options/nav-options.actions";

// components
import SVG from "../svg-container/svg.component";

// util
import CONSTANTS from "../../utils/constants.util";

// style
import "./club.style.scss";

function Club({ club, showDetails, selectClub, setOption }) {
  // get the history object
  const history = useHistory();

  // get the selected competition from the root-state
  const { selectedCompetition } = useSelector((state) => state.competitions);

  return (
    <div
      className="club-container"
      style={{
        border: `2px solid ${selectedCompetition.color}`,
      }}
      onClick={() => {
        // fire selectClub action
        selectClub(club);
        // fire setOption action
        setOption("club", CONSTANTS.CLUB_INFO);
        // go the club-details-page
        history.push("/club");
      }}
    >
      <SVG
        className="club-item-logo"
        width="128px"
        height="128px"
        src={`${club.crestUrl}`}
      />

      <div className="club-name">{club.name}</div>
    </div>
  );
}

// action to fire on some event
const mapDispatchToProps = (dispatch) => ({
  selectClub: (team) => dispatch(setSelectedClub(team)),
  setOption: (property, opt) => dispatch(setOption(property, opt)),
});

export default connect(null, mapDispatchToProps)(Club);
