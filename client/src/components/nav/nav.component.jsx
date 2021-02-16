// library
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { connect, useSelector } from "react-redux";

// icons
import { BiMenu } from "react-icons/bi";
import { BsArrowLeftShort } from "react-icons/bs";

// actions
import { setOptions } from "../../redux/nav-options/nav-options.actions";

// utils
import CONSTANTS from "../../utils/constants.util";

// style
import "./nav.style.scss";

function Nav({ component, changeOption, options }) {
  let history = useHistory();
  let match = useRouteMatch();

  // GET THE SELECTED OPTION FROM store
  const { option } = useSelector((state) => state.navOptions);

  // USES TO SET THE BACKGROUND FOR THE NAV
  // IF THE COMPONENT IS CLUB, AND THE CLUB DON'T HAVE A COLOR PROPERTY
  const { selectedCompetition } = useSelector((state) => state.competitions);

  // USES IN SMALL SCREEN TO SHOW SELECTED OPTION
  const [selectedOption, setSelectedOption] = useState(option);

  // USES IN SMALL SCREEN TO SHOW OR HIDE THE OPTIONS IN THE NAV
  const [showOptions, setShowOptions] = useState(false);

  // SELECT ANOTHER OPTION
  // IN SMALL SCREEN CLOSE THE MENU
  // CHANGE THE STATE OF SELECTEDOPTION
  // FIRE AN ACTION TO CHANGE SELECTED OPTION IN store
  const handleChangeOption = (opt) => {
    setShowOptions(false);
    setSelectedOption(opt);
    changeOption(opt);
  };

  // HANDLE PRESS BACK BUTTON
  // IF YOU ARE IN THE CLUB PAGE, SET THE SELECTED OPTION IN store TO CONSTANTS.TEAMS
  // IF YOU ARE IN THE COMPETITION PAGE, SET THE SELECTED OPTION IN store TO CONSTANTS.STANDINGS
  const handleBackBtn = () => {
    if (match.path === "/club") {
      // IN CLUB PAGE
      changeOption(CONSTANTS.TEAMS);
    } else if (match.path === "/competition") {
      // IN COMPETITION PAGE
      changeOption(CONSTANTS.STANDINGS);
    }

    // GO BACK ONE STEP
    history.goBack();
  };

  return (
    <div
      className="nav-container"
      style={{
        backgroundColor: `${
          component.color ? component.color : selectedCompetition.color
        }`,
      }}
    >
      <div className="nav-header">
        <div className="back-btn" onClick={handleBackBtn}>
          <BsArrowLeftShort />
        </div>
        <h2>{component.shortName ? component.shortName : component.name}</h2>
        <div className="header-options">
          <p>Sign in</p>
          <p
            className="show-nav-option"
            onClick={() => {
              setShowOptions(!showOptions);
            }}
          >
            <BiMenu />
          </p>
        </div>
      </div>

      {/* show or hide the selected option based on the screen width */}
      {!showOptions && (
        <div className="selected-option">
          <p>{selectedOption}</p>
        </div>
      )}

      <div className={`${showOptions ? "nav-taps-show" : ""} nav-tabs`}>
        {options.map((opt, index) => (
          <div
            key={index}
            className={`${option === opt ? "selected" : ""} nav-tabs-tab`}
            onClick={() => {
              handleChangeOption(opt);
            }}
          >
            {opt}
          </div>
        ))}
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  // FIRE AN ACTION TO CHANGE THE OPTION TO SELECTED ONE
  changeOption: (opt) => dispatch(setOptions(opt)),
});

export default connect(null, mapDispatchToProps)(Nav);
