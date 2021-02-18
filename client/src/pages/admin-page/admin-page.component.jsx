import { connect, useSelector } from "react-redux";
import ContentSection from "../../components/content-section/content-section.component";
import Nav from "../../components/nav/nav.component";
import { setOption } from "../../redux/nav-options/nav-options.actions";
import CONSTANTS from "../../utils/constants.util";
import "./admin-page.style.scss";

function AdminPage({ changeOption }) {
  const { adminOptions } = useSelector((state) => state.navOptions);

  const headerOptions = [
    { title: "Sign in", onclick: null },
    { title: "Sign out", onclick: null },
  ];

  const navOptions = [
    CONSTANTS.ADMIN_COMPETITIONS,
    CONSTANTS.ADMIN_CLUBS,
    CONSTANTS.ADMIN_PLAYERS,
    CONSTANTS.ADMIN_MATCHES,
    CONSTANTS.ADMIN_NEWS,
  ];

  const handleChangeNavOption = (opt) => {
    changeOption("admin", opt);
  };

  return (
    <div
      className="admin-page-container"
      style={{
        background: "rgb(124, 109, 239)",
      }}
    >
      <div className="sticky">
        <Nav
          initialOption={adminOptions}
          title="Admin"
          headerOptions={headerOptions}
          navOptions={navOptions}
          bgColor="rgb(124, 109, 239)"
          foreColor="rgb(255, 255, 255)"
          hoverColor="rgb(196, 209, 89)"
          fontFamily="Sriracha, cursive"
          onChangeNavOption={handleChangeNavOption}
        />
      </div>

      <ContentSection page="admin" />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  changeOption: (property, opt) => dispatch(setOption(property, opt)),
});

export default connect(null, mapDispatchToProps)(AdminPage);
