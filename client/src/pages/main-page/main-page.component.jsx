import { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import ContentMainPage from "../../components/content-main-page/content-main-page.component";
import NavMainPage from "../../components/nav-main-page/nav-main-page.component";
import { clubsHasChanged } from "../../redux/clubs/clubs.actions";
import "./main-page.style.scss";

function MainPage({ clubsHasChange }) {
  const { selectedCompetition } = useSelector((state) => state.competitions);

  useEffect(() => {
    return () => {
      clubsHasChange();
    };
  }, [clubsHasChange]);

  return (
    <>
      {selectedCompetition === null ? (
        <Redirect to="/" />
      ) : (
        <div
          className="main-page-container"
          style={{
            backgroundColor: `${selectedCompetition.color}`,
          }}
        >
          <NavMainPage league={selectedCompetition} />
          <ContentMainPage />
        </div>
      )}
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  clubsHasChange: () => dispatch(clubsHasChanged()),
});

export default connect(null, mapDispatchToProps)(MainPage);
