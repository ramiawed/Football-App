import { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import ContentSection from "../../components/content-section/content-section.component";
import Nav from "../../components/nav/nav.component";
import { clubsHasChanged } from "../../redux/clubs/clubs.actions";
import CONSTANTS from "../../utils/constants.util";
import "./main-page.style.scss";

function MainPage({ clubsHasChange }) {
  const { selectedCompetition } = useSelector((state) => state.competitions);

  const options = [
    CONSTANTS.STANDINGS,
    CONSTANTS.FIXTURES,
    CONSTANTS.NEWS,
    CONSTANTS.TEAMS,
    CONSTANTS.STATISTICS,
  ];

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
          <Nav component={selectedCompetition} options={options} />
          <ContentSection />
        </div>
      )}
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  clubsHasChange: () => dispatch(clubsHasChanged()),
});

export default connect(null, mapDispatchToProps)(MainPage);
