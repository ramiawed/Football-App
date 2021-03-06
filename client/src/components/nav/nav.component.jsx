// this component represents a full functionality of NavBar.
// contains:
// - headerSection: which contains the (back button, title, some options with it functionality, show menu option)
// - selected option: (this display just in the small screen, to display which option was selected)
// - navbar options: a set of available options (display in column in small screen, in row in medium screen)
// Own State:
// -	showOptions: (Boolean) toggle show or hide the options in bottom when click on the menu icon.
// -	selectedOption: (String) specify the selected option. It changes when click on any option in the navbar options.
// Props:
// -	initialOption: specify the selected option when the nav render for the first time.
// -	headerOptions: (Array [{}] of object, each object contains two properties, title, onclick),
//    the options that will display on the header section at the top.
// -	navOptions: (Array [String]), the options that will display on the nav bar section at the bottom of the component.
// -	title: (String), the title of the page .
// -	bgColor: (String) the color of the background.
// -	foreColor: (String) the color of the text.
// -	hoverColor: (String) the color of the text when hover over an option, and the color for the selectedOption.
// -	fontFamily
// -	onChangeNavOption: handler to execute when you click on an option in nav bar section at the bottom.

// library
import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

// icons
import { BiMenu } from "react-icons/bi";
import { BsArrowLeftShort } from "react-icons/bs";

const HoverDiv = styled.div`
  &:hover {
    color: ${(props) => props.hoverColor || "black"};
  }
`;

const NavBarContainer = styled.div`
  font-family: ${(props) => props.fontFamily};
  position: sticky;
  width: 100%;
  background-color: ${(props) => props.bgColor || "black"};
  color: ${(props) => props.foreColor || "white"};
  z-index: 10;

  display: flex;
  flex-direction: column;

  @media only screen and (min-width: 481px) {
    padding: 0 4px;
  }
`;

const NavBarHeader = styled.div`
  display: flex;
  align-items: center;
`;

const NavBarTitle = styled.div`
  flex: 1;
`;

const NavBarHeaderOption = styled(HoverDiv)`
  padding: 0 4px;
  cursor: pointer;
`;

const NavBarSelectedOption = styled.div`
  text-align: center;
  padding: 4px 6px;
  color: ${(props) => props.foreColor || "white"};

  @media only screen and (min-width: 481px) {
    display: none;
  }
`;

const BsArrowLeftShortStyled = styled(BsArrowLeftShort)`
  font-size: 2rem;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.hoverColor || "black"};
  }
`;

const BiMenuStyled = styled(BiMenu)`
  font-size: 2rem;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.hoverColor || "black"};
  }

  @media only screen and (min-width: 481px) {
    display: none;
  }
`;

const NavBarOption = styled.div`
  margin: 4px;
  text-align: center;
  padding: 4px 6px;
  cursor: pointer;
  color: ${(props) => (props.selected ? props.hoverColor : "")};
  border-bottom: ${(props) =>
    props.selected ? `3px solid ${props.hoverColor}` : ""};
  &:hover {
    color: ${(props) => props.hoverColor || "black"};
  }
`;

const NavbarOptions = styled.div`
  display: ${(props) => (props.showOptions ? "flex" : "none")};
  flex-direction: column;
  align-items: center;

  @media only screen and (min-width: 481px) {
    flex-direction: row;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

function Nav({
  initialOption,
  headerOptions,
  navOptions,
  title,
  bgColor,
  foreColor,
  hoverColor,
  fontFamily,
  onChangeNavOption,
}) {
  const history = useHistory();
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(initialOption || "");

  return (
    <NavBarContainer
      bgColor={bgColor}
      foreColor={foreColor}
      fontFamily={fontFamily}
      className="navbar-container"
    >
      <NavBarHeader className="navbar-header">
        <BsArrowLeftShortStyled
          hoverColor={hoverColor}
          className="navbar-icon"
          onClick={() => history.goBack()}
        />
        <NavBarTitle className="navbar-title">{title}</NavBarTitle>
        {headerOptions
          ? headerOptions.map((option, index) => (
              <NavBarHeaderOption
                hoverColor={hoverColor}
                key={index}
                className="navbar-header-option"
                onClick={() => option.onclick && option.onclick()}
              >
                {option.title}
              </NavBarHeaderOption>
            ))
          : null}
        <BiMenuStyled
          hoverColor={hoverColor}
          className="navbar-icon menu-icon"
          onClick={() => setShowOptions(!showOptions)}
        />
      </NavBarHeader>

      {!showOptions ? (
        <NavBarSelectedOption
          foreColor={hoverColor}
          className="navbar-selected-option"
        >
          {selectedOption}
        </NavBarSelectedOption>
      ) : null}

      <NavbarOptions
        showOptions={showOptions}
        className={`${showOptions ? "navbar-options-show" : ""} navbar-options`}
      >
        {navOptions
          ? navOptions.map((option, index) => (
              <NavBarOption
                hoverColor={hoverColor}
                key={index}
                className="navbar-option"
                selected={option === selectedOption}
                onClick={() => {
                  setSelectedOption(option);
                  setShowOptions(false);
                  onChangeNavOption(option);
                }}
              >
                {option}
              </NavBarOption>
            ))
          : null}
      </NavbarOptions>
    </NavBarContainer>
  );
}

export default Nav;
