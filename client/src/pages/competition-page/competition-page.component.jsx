import { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import ContentSection from "../../components/content-section/content-section.component";
import NavAdmin from '../../components/nav-admin/nav-admin.component';

import { clubsHasChanged } from "../../redux/clubs/clubs.actions";
import { setOption } from "../../redux/nav-options/nav-options.actions";

import CONSTANTS from "../../utils/constants.util";
import "./competition-page.style.scss";

function CompetitionPage({ clubsHasChange, changeOption }) {
  const { selectedCompetition } = useSelector((state) => state.competitions);

  const headerOptions = ["Sign in", "Sign out", "Admin"];

  const navOptions = [
    CONSTANTS.COMPETITION_STANDINGS,
    CONSTANTS.COMPETITION_FIXTURES,
    CONSTANTS.COMPETITION_NEWS,
    CONSTANTS.COMPETITION_TEAMS,
    CONSTANTS.COMPETITION_STATISTICS,
  ];

  const handleChangeNavOption = (opt) => {
    changeOption('competition', opt);
  };

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
          className="competition-page-container"
          style={{
            backgroundColor: `${selectedCompetition.color}`,
          }}
        >

          <NavAdmin
          title={selectedCompetition.name}
          headerOptions={headerOptions}
          navOptions={navOptions}
          bgColor={selectedCompetition.color}
          foreColor="rgb(255, 255, 255)"
          hoverColor="rgb(196, 209, 89)"
          fontFamily="Sriracha, cursive"
          onChangeNavOption={handleChangeNavOption}
          />

          
          <ContentSection page='competition' />
        </div>
      )}
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  clubsHasChange: () => dispatch(clubsHasChanged()),
  changeOption: (property, opt) => dispatch(setOption(property, opt)),
});

export default connect(null, mapDispatchToProps)(CompetitionPage);
