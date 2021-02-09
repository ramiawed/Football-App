import { connect, useSelector } from "react-redux";
import SVG from "../svg-container/svg.component";
import "./team.style.scss";
import { setSelectedTeam } from "../../redux/teams/teams.actions";

function Team({ team, showDetails, selectTeam }) {
  const { selectedLeague } = useSelector((state) => state.leagues);

  return (
    <div
      className="team-container"
      style={{
        border: `2px solid ${selectedLeague.color}`,
      }}
      onClick={() => {
        selectTeam(team);
        showDetails();
      }}
    >
      <SVG
        className="league-item-logo"
        width="128px"
        height="128px"
        src={`/teams/${team.name}.svg`}
      />

      <div className="team-name">{team.name}</div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  selectTeam: (team) => dispatch(setSelectedTeam(team)),
});

export default connect(null, mapDispatchToProps)(Team);
