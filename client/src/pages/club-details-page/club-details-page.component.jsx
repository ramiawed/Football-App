import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import ContentSection from "../../components/content-section/content-section.component";
import Nav from "../../components/nav/nav.component";

import CONSTANTS from "../../utils/constants.util";
import "./club-details-page.style.scss";

const ClubDetailsPage = () => {
  const { selectedCompetition } = useSelector((state) => state.competitions);
  const { selectedClub } = useSelector((state) => state.clubs);

  const options = [CONSTANTS.CLUB_INFO, CONSTANTS.CLUB_PLAYERS];

  return (
    <>
      {selectedClub === null ? (
        <Redirect to="/" />
      ) : (
        <div
          className="club-details-container"
          style={{
            backgroundColor: `${
              selectedClub.color
                ? selectedClub.color
                : selectedCompetition.color
            }`,
          }}
        >
          <Nav component={selectedClub} options={options} />
          <ContentSection />
        </div>
      )}
    </>
  );
};

export default ClubDetailsPage;
