import { useSelector } from "react-redux";

// components
import CompetitionsAdmin from "../competitions-admin/competitions-admin.component";
import ClubsAdmin from "../clubs-admin/clubs-admin.component";
// style
import "./content-admin.style.scss";

function ContentAdmin() {
  const { option } = useSelector((state) => state.navOptions);

  const renderComponent = (opt) => {
    switch (opt) {
      case "Competition":
        return <CompetitionsAdmin />;

      case "Clubs":
        return <ClubsAdmin />;

      default:
        return <></>;
    }
  };
  return (
    <div className="content-admin-container">{renderComponent(option)}</div>
  );
}

export default ContentAdmin;
