// this component to display a competition as logo and code
// props:
// - competition: the competition object that come from parent component
// - setSelectedCompetition: fires action to set the selected competition
// in the competition-reducer

// library
import { useHistory, withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";

// components
import SVG from "../svg-container/svg.component";

// actions
import { setSelectedCompetitionAsync } from "../../redux/competitions/competitions.action";

// style
import "./competition.style.scss";

function CompetitionItem({ competition, setSelectedCompetition }) {
  const history = useHistory();

  const { selectedCompetition } = useSelector((state) => state.competitions);

  // when click on competition-item
  const goToMainPage = () => {
    // set the selectedCompetition in the competition-reducer to the selected one
    setSelectedCompetition(selectedCompetition, competition);

    // go the the competition page
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
      {/* this div uses to show moving light grey div when hover over the component */}
      <div className="motion"></div>
      <div className="competition-item-name">{competition.name}</div>

      {/* if the competition has a logo, show it or don't show anything */}
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
  setSelectedCompetition: (p, l) => dispatch(setSelectedCompetitionAsync(p, l)),
});

export default withRouter(connect(null, mapDispatchToProps)(CompetitionItem));
