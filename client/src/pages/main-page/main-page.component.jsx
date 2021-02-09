import { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import ContentMainPage from "../../components/content-main-page/content-main-page.component";
import NavMainPage from "../../components/nav-main-page/nav-main-page.component";
import { teamsHasChange } from "../../redux/teams/teams.actions";
import "./main-page.style.scss";

function MainPage({ teamHasChange }) {
  const { selectedLeague } = useSelector((state) => state.leagues);

  useEffect(() => {
    return () => {
      teamHasChange();
    };
  }, [teamHasChange]);

  return (
    <>
      {selectedLeague === null ? (
        <Redirect to="/" />
      ) : (
        <div
          className="main-page-container"
          style={{
            backgroundColor: `${selectedLeague.color}`,
          }}
        >
          <NavMainPage league={selectedLeague} />
          <ContentMainPage />
        </div>
      )}
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  teamHasChange: () => dispatch(teamsHasChange()),
});

export default connect(null, mapDispatchToProps)(MainPage);
