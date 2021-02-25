import "./club-details-action-bar.style.scss";

function ClubDetailsActionBar({
  text,
  buttonText,
  bgColor,
  foreColor,
  borderColor,
  actionHandler,
  cancelHandler,
}) {
  return (
    <div
      className="club-action-bar-container"
      style={{
        border: `1px solid ${borderColor}`,
        background: bgColor,
      }}
    >
      <div className="action-bar-text">{text}</div>
      <button
        className="btn-border-less"
        style={{
          background: bgColor,
          color: foreColor,
        }}
        onClick={() => cancelHandler()}
      >
        Cancel
      </button>
      <button
        className="btn-border"
        style={{
          background: bgColor,
          color: foreColor,
          //   border: `1px solid ${foreColor}`,
        }}
        onClick={() => actionHandler()}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default ClubDetailsActionBar;
