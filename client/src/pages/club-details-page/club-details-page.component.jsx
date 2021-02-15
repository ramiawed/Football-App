import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
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
          className="main-page-container"
          style={{
            backgroundColor: `${
              selectedClub.color
                ? selectedClub.color
                : selectedCompetition.color
            }`,
          }}
        >
          <Nav component={selectedClub} options={options} />
        </div>
      )}
    </>
  );
};

export default ClubDetailsPage;
