// This component will display a club logo with a name of the club

// it takes a 90% width when display on small screen
// it takes a 45% width when display on medium screen
// it takes a 30% width when display on large screen

// props:
// - club: come from the parent component
// - borderColor
// - onclick: handler executes when the click on the club component

// components
import SVG from "../svg-container/svg.component";

// style
import "./club.style.scss";

function Club({ club, borderColor, onclick }) {
  return (
    <div
      className="club-container"
      style={{
        border: `2px solid ${borderColor}`,
      }}
      onClick={() => {
        onclick(club);
      }}
    >
      <SVG
        className="club-item-logo"
        width="128px"
        height="128px"
        src={`${club.crestUrl}`}
      />

      <div className="club-name">{club.name}</div>
    </div>
  );
}

export default Club;
