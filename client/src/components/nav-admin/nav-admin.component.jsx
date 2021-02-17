// this component uses the show all the options for the admin
import { useState } from "react";

// icons
import { BiMenu } from "react-icons/bi";
import { BsArrowLeftShort } from "react-icons/bs";

// style
import "./nav-admin.style.scss";

function NavAdmin({ headerOptions, navOptions, title }) {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    navOptions ? navOptions[0] : ""
  );

  return (
    <div className="navbar-container">
      {/* Header section */}
      <div className="navbar-header">
        <BsArrowLeftShort className="navbar-icon" />
        <div className="navbar-title">{title}</div>
        {headerOptions
          ? headerOptions.map((option, index) => (
              <div key={index} className="navbar-header-option">
                {option}
              </div>
            ))
          : null}
        <BiMenu
          className="navbar-icon menu-icon"
          onClick={() => setShowOptions(!showOptions)}
        />
      </div>
      {/* End of header section  */}

      {!showOptions ? (
        <div className="navbar-selected-option">{selectedOption}</div>
      ) : (
        <></>
      )}

      {/* Options section */}
      <div
        className={`${showOptions ? "navbar-options-show" : ""} navbar-options`}
      >
        {navOptions
          ? navOptions.map((option, index) => (
              <div
                key={index}
                className="navbar-option"
                onClick={() => {
                  setSelectedOption(option);
                  setShowOptions(false);
                }}
              >
                {option}
              </div>
            ))
          : null}
      </div>
      {/* End of options section */}
    </div>
  );
}

export default NavAdmin;
