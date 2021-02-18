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

// utils
import CONSTANTS from "../../utils/constants.util";

// style
import "./content-section.style.scss";

function ContentSection({page}) {
  const { competitionOptions, clubDetailsOptions, adminOptions } = useSelector((state) => state.navOptions);

  const renderCompetitonComponent = (o) => {
    switch (o) {
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

  const renderClubDetailsComponent = (o) => {
    switch (o) {
      case CONSTANTS.CLUB_INFO:
        return <ClubDetails />;

      case CONSTANTS.CLUB_PLAYERS:
        return null;

        default:
        return <></>;
    }
  };

  const renderComponent = (p, o) => {
    switch(p) {
      case "competition":
        return renderCompetitonComponent(o);

        case "clubDetails":
          return renderClubDetailsComponent(o);

          default:
            return null;
    }
  }

  return <div className="content-container">
  {renderCompetitonComponent(competitionOptions)}
  </div>;
}

export default ContentSection;
