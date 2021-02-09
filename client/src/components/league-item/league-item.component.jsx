import "./league-item.style.scss";
import { withRouter } from "react-router-dom";
import { setSelectedLeague } from "../../redux/leagues/leagues.action";
import { connect } from "react-redux";
import SVG from "../svg-container/svg.component";

function LeagueItem({ league, history, setSelectedLeague }) {
  // when click on league-item
  const goToMainPage = () => {
    setSelectedLeague(league);
    history.push("/league");
  };

  return (
    <div
      className="league-item-container"
      onClick={goToMainPage}
      style={{
        backgroundColor: league.color,
      }}
    >
      <div className="motion"></div>
      <div className="league-item-name">{league.name}</div>

      <SVG
        className="league-item-logo"
        src={`/leagues/${league.name}.svg`}
        width="100%"
        height="170px"
      />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setSelectedLeague: (l) => dispatch(setSelectedLeague(l)),
});

export default withRouter(connect(null, mapDispatchToProps)(LeagueItem));
