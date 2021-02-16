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

function ContentSection() {
  const { option } = useSelector((state) => state.navOptions);

  const renderComponent = (o) => {
    switch (o) {
      case CONSTANTS.STANDINGS:
        return <Standings />;

      case CONSTANTS.FIXTURES:
        return <Fixtures />;

      case CONSTANTS.NEWS:
        return <News />;

      case CONSTANTS.TEAMS:
        return <Clubs />;

      case CONSTANTS.STATISTICS:
        return <Statistics />;

      case CONSTANTS.CLUB_INFO:
        return <ClubDetails />;

      default:
        return <></>;
    }
  };

  return <div className="content-container">{renderComponent(option)}</div>;
}

export default ContentSection;
