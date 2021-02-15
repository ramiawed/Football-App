import { connect, useSelector } from "react-redux";
import SVG from "../svg-container/svg.component";
import "./club.style.scss";
import { setSelectedClub } from "../../redux/clubs/clubs.actions";
import { useHistory } from "react-router-dom";

function Club({ club, showDetails, selectClub }) {
  const history = useHistory();
  const { selectedCompetition } = useSelector((state) => state.competitions);

  return (
    <div
      className="club-container"
      style={{
        border: `2px solid ${selectedCompetition.color}`,
      }}
      onClick={() => {
        selectClub(club);
        // showDetails();
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

const mapDispatchToProps = (dispatch) => ({
  selectClub: (team) => dispatch(setSelectedClub(team)),
});

export default connect(null, mapDispatchToProps)(Club);
