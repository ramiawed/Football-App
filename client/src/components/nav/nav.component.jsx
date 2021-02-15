import { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { BiMenu } from "react-icons/bi";
import { BsArrowLeftShort } from "react-icons/bs";
import { setOptions } from "../../redux/nav-options/nav-options.actions";

import "./nav.style.scss";

function Nav({ component, changeOption, options }) {
  let history = useHistory();

  const { option } = useSelector((state) => state.navOptions);

  // use in small screen to show which option the use choose
  const [selectedOption, setSelectedOption] = useState(option);

  // use in small screen to show or hide the options in the nav-menu
  const [showOptions, setShowOptions] = useState(false);

  const handleChangeOption = (opt) => {
    setShowOptions(false);
    setSelectedOption(opt);
    changeOption(opt);
  };

  const handleBackBtn = () => {
    history.goBack();
  };

  return (
    <div
      className="nav-main-page-container"
      style={{
        backgroundColor: `${component.color}`,
      }}
    >
      <div className="nav-main-page-header">
        <div className="back-btn" onClick={handleBackBtn}>
          <BsArrowLeftShort />
        </div>
        <h2>{component.name}</h2>
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
        {options.map((opt) => (
          <div
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
  changeOption: (opt) => dispatch(setOptions(opt)),
});

export default connect(null, mapDispatchToProps)(Nav);
