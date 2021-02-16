// this component will display all the information for a specific club.
// it is render inside the club-details-page, in the info tab

// library
import { useEffect } from "react";
import { useSelector } from "react-redux";

// components
import SVG from "../svg-container/svg.component";

// style
import "./club-details.style.scss";

const ClubDetails = () => {
  // get the selected club from root-store
  const { selectedClub } = useSelector((state) => state.clubs);

  // get the selected competition from root-store
  // just in case the club doesn't have color property, use the competition's color
  const { selectedCompetition } = useSelector((state) => state.competitions);

  // when component did mount
  useEffect(() => {
    // scroll to the top of the screen
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="club-details">
      {/* header section */}
      <div className="club-details-header">
        <h2
          style={{
            color: `${
              selectedClub.color
                ? selectedClub.color
                : selectedCompetition.color
            }`,
            borderBottomColor: `${
              selectedClub.color
                ? selectedClub.color
                : selectedCompetition.color
            }`,
          }}
        >
          {selectedClub && selectedClub.name}
        </h2>
      </div>

      {/* club logo */}
      <div className="club-details-logo">
        <SVG
          className="club-item-logo"
          width="256px"
          height="256px"
          src={`${selectedClub.crestUrl}`}
        />
      </div>

      <div className="club-details-info">
        {/* club name */}
        <div className="info">
          <div className="info-left">Short Name:</div>
          <div className="info-right">
            {selectedClub && selectedClub.shortName}
          </div>
        </div>

        {/* club founded */}
        <div className="info">
          <div className="info-left">Founded:</div>
          <div className="info-right">
            {selectedClub && selectedClub.founded}
          </div>
        </div>

        {/* club venue */}
        <div className="info">
          <div className="info-left">Stadium Name:</div>
          <div className="info-right">{selectedClub && selectedClub.venue}</div>
        </div>

        {/* club phone */}
        <div className="info">
          <div className="info-left">Phone:</div>
          <div className="info-right">{selectedClub && selectedClub.phone}</div>
        </div>

        {/* club website */}
        <div className="info">
          <div className="info-left">Website:</div>
          <div className="info-right">
            {selectedClub && selectedClub.website}
          </div>
        </div>

        {/* club email */}
        <div className="info">
          <div className="info-left">Email:</div>
          <div className="info-right">{selectedClub && selectedClub.email}</div>
        </div>

        {/* club kits colors */}
        <div className="info">
          <div className="info-left">Kit Colors:</div>
          <div className="info-right">
            {selectedClub && selectedClub.clubColors}
          </div>
        </div>

        {/* club address */}
        <div className="info">
          <div className="info-left">Address:</div>
          <div className="info-right">
            {selectedClub && selectedClub.address}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;
