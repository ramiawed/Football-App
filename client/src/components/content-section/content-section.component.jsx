// this component uses to render a component based on the selected option
// in the nav-options-reducer

// library
import { useSelector } from "react-redux";

// components
import Standings from "../standings/standings.component";
import Fixtures from "../fixtures/fixtures.component";
import News from "../news/news.component";
import Clubs from "../clubs/clubs.component";
import Statistics from "../statistics/statistics.component";
import ClubDetails from "../club-details/club-details.component";
import ClubsAdmin from "../clubs-admin/clubs-admin.component";
import CompetitionsAdmin from "../competitions-admin/competitions-admin.component";

// utils
import CONSTANTS from "../../utils/constants.util";

// style
import "./content-section.style.scss";

function ContentSection({ page }) {
  const { competitionOptions, clubDetailsOptions, adminOptions } = useSelector(
    (state) => state.navOptions
  );

  const { selectedClub } = useSelector((state) => state.clubs);
  const { selectedCompetition } = useSelector((state) => state.competitions);

  const renderCompetitionComponent = () => {
    switch (competitionOptions) {
      case CONSTANTS.COMPETITION_STANDINGS:
        return <Standings />;

      case CONSTANTS.COMPETITION_FIXTURES:
        return <Fixtures />;

      case CONSTANTS.COMPETITION_NEWS:
        return <News />;

      case CONSTANTS.COMPETITION_TEAMS:
        return <Clubs />;

      case CONSTANTS.COMPETITION_STATISTICS:
        return <Statistics />;

      default:
        return <></>;
    }
  };

  const renderClubDetailsComponent = () => {
    switch (clubDetailsOptions) {
      case CONSTANTS.CLUB_INFO:
        return (
          <ClubDetails
            club={selectedClub}
            backupColor={`${selectedCompetition.color}`}
            isAdmin={false}
          />
        );

      case CONSTANTS.CLUB_PLAYERS:
        return null;

      default:
        return <></>;
    }
  };

  const renderAdminComponent = () => {
    switch (adminOptions) {
      case CONSTANTS.ADMIN_CLUBS:
        return <ClubsAdmin />;

      case CONSTANTS.ADMIN_COMPETITIONS:
        return <CompetitionsAdmin />;

      default:
        return <></>;
    }
  };

  const renderComponent = (p) => {
    switch (p) {
      case "competition":
        return renderCompetitionComponent();

      case "clubDetails":
        return renderClubDetailsComponent();

      case "admin":
        return renderAdminComponent();

      default:
        return null;
    }
  };

  return <div className="content-container">{renderComponent(page)}</div>;
}

export default ContentSection;
