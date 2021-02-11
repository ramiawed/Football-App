import "./league-item.style.scss";
import { withRouter } from "react-router-dom";
import { setSelectedCompetition } from "../../redux/competitions/competitions.action";
import { connect } from "react-redux";
import SVG from "../svg-container/svg.component";

function LeagueItem({ competition, history, setSelectedCompetition }) {
  // when click on league-item
  const goToMainPage = () => {
    setSelectedCompetition(competition);
    history.push("/league");
  };

  return (
    <div
      className="league-item-container"
      onClick={goToMainPage}
      style={{
        backgroundColor: competition.color,
      }}
    >
      <div className="motion"></div>
      <div className="league-item-name">{competition.name}</div>

      {competition.logo && (
        <SVG
          className="league-item-logo"
          src={`/leagues/${competition.logo}`}
          width="100%"
          height="170px"
        />
      )}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setSelectedCompetition: (l) => dispatch(setSelectedCompetition(l)),
});

export default withRouter(connect(null, mapDispatchToProps)(LeagueItem));
