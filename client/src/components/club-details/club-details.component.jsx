// this component will display all the information for a specific club.
// it is render inside the club-details-page, in the info tab

// library
import { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import {
  deleteClubAsync,
  resetDeleteClubLoading,
} from "../../redux/clubs/clubs.actions";

// components
import ClubDetailsActionBar from "../club-details-action-bar/club-details-action-bar.component";
import ClubDetailsActions from "../club-details-actions/club-details-actions.component";
import SVG from "../svg-container/svg.component";

// utils
import COLORS from "../../utils/colors.util";

// style
import "./club-details.style.scss";

const ClubDetails = ({
  isAdmin,
  club,
  backupColor,
  deleteClub,
  resetDeleteClubLoading,
}) => {
  const [updatedClub, setUpdatedClub] = useState({ ...club });

  const clubKeys = [
    "shortName",
    "founded",
    "venue",
    "phone",
    "website",
    "email",
    "clubColors",
    "address",
  ];

  const clubTitle = [
    "Short Name",
    "Founded",
    "Stadium",
    "Phone",
    "Website",
    "Email",
    "Kit Colors",
    "Address",
  ];

  const handleInputOnChange = (key, value) => {
    setUpdatedClub({
      ...updatedClub,
      [key]: value,
    });
  };

  // Edit section
  // isEditable
  // show or hide the bottom action bar for updating
  const [editing, setEditing] = useState(false);

  const handleClickEditIcon = () => {
    setEditing(true);
  };

  const handleEdit = () => {
    setEditing(false);
  };

  // Copy section
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  // Delete section
  // is Delete able
  // show or hide the bottom action bar for deleting
  const [deleting, setDeleting] = useState(false);
  // specifies if the club deleted or not

  const handleClickDeleteIcon = () => {
    setDeleting(true);
  };

  const handleDelete = () => {
    deleteClub(club._id);
  };

  const handleCancelOperation = () => {
    resetDeleteClubLoading();
    setEditing(false);
    setDeleting(false);
    setUpdatedClub({ ...club });
  };

  // when component did mount
  useEffect(() => {
    // scroll to the top of the screen
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="club-details">
      {isAdmin && (
        <div className="club-details-action">
          {!deleting && !editing && (
            <ClubDetailsActions
              editHandler={handleClickEditIcon}
              deleteHandler={handleClickDeleteIcon}
              copyHandler={handleCopy}
            />
          )}
        </div>
      )}
      {/* header section */}
      <div className="club-details-header">
        <h2
          style={{
            color: `${club.color ? club.color : backupColor}`,
            borderBottomColor: `${club.color ? club.color : backupColor}`,
          }}
        >
          {club && club.name}
        </h2>
      </div>

      <div className="details-content-section">
        {/* club logo */}
        <div className="club-details-logo">
          <SVG
            className="club-item-logo"
            width="196px"
            height="196px"
            src={`${club.crestUrl}`}
          />
        </div>

        {/* club details */}
        <div className="club-details-info">
          {clubKeys.map((key, index) => (
            <div className="info" key={index}>
              <div className="info-title">{clubTitle[index]}</div>
              <div className="info-right">
                {editing ? (
                  <input
                    type={`${key === "founded" ? "number" : "text"}`}
                    value={updatedClub && updatedClub[key]}
                    onChange={(e) => {
                      handleInputOnChange(key, e.target.value);
                    }}
                  />
                ) : (
                  <label>{updatedClub && updatedClub[key]}</label>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {deleting && (
        <div className="bottom-action-bar">
          <ClubDetailsActionBar
            borderColor={COLORS.DELETE_BORDER}
            bgColor={COLORS.DELETE_BG}
            text="Club Flagged For Deletion"
            foreColor="rgb(255, 255, 255)"
            buttonText="Delete"
            cancelHandler={handleCancelOperation}
            actionHandler={handleDelete}
          />
        </div>
      )}

      {editing && (
        <div className="bottom-action-bar">
          <ClubDetailsActionBar
            borderColor={COLORS.UPDATE_BORDER}
            bgColor={COLORS.UPDATE_BG}
            text="Club Flagged For Updating"
            foreColor="rgb(255, 255, 255)"
            buttonText="Update"
            cancelHandler={handleCancelOperation}
            actionHandler={handleEdit}
          />
        </div>
      )}

      {/* div that show after complete the operation
      {deleteClubLoading && (
        <div
          className="loading"
          style={{
            background: COLORS.DELETE_BG,
          }}
        >
          DELETING ...
        </div>
      )} */}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deleteClub: (clubId) => dispatch(deleteClubAsync(clubId)),
  resetDeleteClubLoading: () => dispatch(resetDeleteClubLoading()),
  // deleteClubSuccess: (clubId) => dispatch(deleteClubSuccess(clubId)),
});

export default connect(null, mapDispatchToProps)(ClubDetails);
