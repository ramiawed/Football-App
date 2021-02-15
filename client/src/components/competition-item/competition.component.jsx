import { withRouter } from "react-router-dom";
import { setSelectedCompetition } from "../../redux/competitions/competitions.action";
import { connect } from "react-redux";
import SVG from "../svg-container/svg.component";
import "./competition.style.scss";

function CompetitionItem({ competition, history, setSelectedCompetition }) {
  // when click on competition-item
  const goToMainPage = () => {
    setSelectedCompetition(competition);
    history.push("/competition");
  };

  return (
    <div
      className="competition-item-container"
      onClick={goToMainPage}
      style={{
        backgroundColor: competition.color,
      }}
    >
      <div className="motion"></div>
      <div className="competition-item-name">{competition.name}</div>

      {competition.logo && (
        <SVG
          className="competition-item-logo"
          src={`/competitions/${competition.logo}`}
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

export default withRouter(connect(null, mapDispatchToProps)(CompetitionItem));
