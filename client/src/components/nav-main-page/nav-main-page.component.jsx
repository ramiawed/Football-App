import "./nav-main-page.style.scss";
import CONSTANTS from "../../utils/constants.util";
import { setOptions } from "../../redux/nav-options/nav-options.actions";
import { connect, useSelector } from "react-redux";
import { BiMenu } from "react-icons/bi";
import { useState } from "react";

function NavMainPage({ league, changeOption }) {
  const { option } = useSelector((state) => state.navOptions);
  const [selectedOption, setSelectedOption] = useState(option);
  const [showOptions, setShowOptions] = useState(false);

  const handleChangeOption = (opt) => {
    setShowOptions(false);
    setSelectedOption(opt);
    changeOption(opt);
  };

  return (
    <div
      className="nav-main-page-container"
      style={{
        backgroundColor: `${league.color}`,
      }}
    >
      <div className="nav-main-page-header">
        <h2>{league.name}</h2>
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

      {!showOptions && (
        <div className="selected-option">
          <p>{selectedOption}</p>
        </div>
      )}

      <div className={`${showOptions ? "nav-taps-show" : ""} nav-tabs`}>
        <div
          className={`${
            option === CONSTANTS.STANDINGS ? "selected" : ""
          } nav-tabs-tab`}
          onClick={() => {
            handleChangeOption(CONSTANTS.STANDINGS);
          }}
        >
          {CONSTANTS.STANDINGS}
        </div>
        <div
          className={`${
            option === CONSTANTS.FIXTURES ? "selected" : ""
          } nav-tabs-tab`}
          onClick={() => handleChangeOption(CONSTANTS.FIXTURES)}
        >
          {CONSTANTS.FIXTURES}
        </div>
        <div
          className={`${
            option === CONSTANTS.NEWS ? "selected" : ""
          } nav-tabs-tab`}
          onClick={() => handleChangeOption(CONSTANTS.NEWS)}
        >
          {CONSTANTS.NEWS}
        </div>
        <div
          className={`${
            option === CONSTANTS.TEAMS ? "selected" : ""
          } nav-tabs-tab`}
          onClick={() => handleChangeOption(CONSTANTS.TEAMS)}
        >
          {CONSTANTS.TEAMS}
        </div>
        <div
          className={`${
            option === CONSTANTS.STATISTICS ? "selected" : ""
          } nav-tabs-tab`}
          onClick={() => handleChangeOption(CONSTANTS.STATISTICS)}
        >
          {CONSTANTS.STATISTICS}
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  changeOption: (opt) => dispatch(setOptions(opt)),
});

export default connect(null, mapDispatchToProps)(NavMainPage);
