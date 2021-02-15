import { useSelector } from "react-redux";
import "./content-section.style.scss";
import Standings from "../standings/standings.component";
import Fixtures from "../fixtures/fixtures.component";
import News from "../news/news.component";
import Clubs from "../clubs/clubs.component";
import Statistics from "../statistics/statistics.component";
import CONSTANTS from "../../utils/constants.util";

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
      default:
        return <></>;
    }
  };

  return (
    <div className="content-main-page-container">{renderComponent(option)}</div>
  );
}

export default ContentSection;
