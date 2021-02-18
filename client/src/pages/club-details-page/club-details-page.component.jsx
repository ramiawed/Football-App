import { connect, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

import ContentSection from "../../components/content-section/content-section.component";
import Nav from "../../components/nav/nav.component";

import { setOption } from "../../redux/nav-options/nav-options.actions";

import CONSTANTS from "../../utils/constants.util";
import "./club-details-page.style.scss";

const ClubDetailsPage = ({ changeOption }) => {
  const history = useHistory();
  const { selectedCompetition } = useSelector((state) => state.competitions);
  const { selectedClub } = useSelector((state) => state.clubs);
  const { clubDetailsOptions } = useSelector((state) => state.navOptions);

  const goToAdminPage = () => {
    history.push("/admin");
  };

  const headerOptions = [
    {
      title: "Sign in",
      onclick: null,
    },
    {
      title: "Sign out",
      onclick: null,
    },
    {
      title: "Admin",
      onclick: goToAdminPage,
    },
  ];
  const navOptions = [CONSTANTS.CLUB_INFO, CONSTANTS.CLUB_PLAYERS];

  const handleChangeNavOption = (opt) => {
    changeOption("club", opt);
  };

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
          <div className="sticky">
            <Nav
              initialOption={clubDetailsOptions}
              title={selectedClub.name}
              headerOptions={headerOptions}
              navOptions={navOptions}
              bgColor={selectedClub.color || selectedCompetition.color}
              foreColor="rgb(255, 255, 255)"
              hoverColor="rgb(196, 209, 89)"
              fontFamily="Sriracha, cursive"
              onChangeNavOption={handleChangeNavOption}
            />
          </div>

          <ContentSection page="clubDetails" />
        </div>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changeOption: (property, opt) => dispatch(setOption(property, opt)),
});

export default connect(null, mapDispatchToProps)(ClubDetailsPage);
