import { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { getLeaguesAsync } from "../../redux/leagues/leagues.action";
import LeagueItem from "../../components/league-item/league-item.component";
import "./entry-page.style.scss";
import Loader from "../../components/loader-football/loader.component";

function EntryPage({ getLeagues }) {
  const { isLoading, leagues } = useSelector((state) => state.leagues);

  useEffect(() => {
    if (leagues.length === 0) {
      getLeagues();
    }
  }, [getLeagues, leagues.length]);

  return (
    <div className="entry-page-container">
      {isLoading || leagues.length === 0 ? (
        <Loader />
      ) : (
        leagues.map((league, index) => (
          <LeagueItem key={index} league={league} />
        ))
      )}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getLeagues: () => dispatch(getLeaguesAsync()),
});

export default connect(null, mapDispatchToProps)(EntryPage);
