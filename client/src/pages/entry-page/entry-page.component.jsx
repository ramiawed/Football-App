import { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { getCompetitionsAsync } from "../../redux/competitions/competitions.action";
import LeagueItem from "../../components/league-item/league-item.component";
import "./entry-page.style.scss";
import Loader from "../../components/loader-football/loader.component";

function EntryPage({ getCompetitions }) {
  const { isLoading, competitions } = useSelector(
    (state) => state.competitions
  );

  useEffect(() => {
    if (competitions.length === 0) {
      getCompetitions();
    }
  }, [getCompetitions, competitions.length]);

  return (
    <div className="entry-page-container">
      {isLoading || competitions.length === 0 ? (
        <Loader />
      ) : (
        competitions.map((competition, index) => (
          <LeagueItem key={index} competition={competition} />
        ))
      )}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getCompetitions: () => dispatch(getCompetitionsAsync()),
});

export default connect(null, mapDispatchToProps)(EntryPage);
