import "./club-loader.style.scss";

function ClubLoader({ bgColor }) {
  return (
    <div
      className="club-loader-component"
      style={{
        border: `2px solid ${bgColor}`,
      }}
    >
      <div className="motion-wrapper">
        <div className="motion"></div>
      </div>
      <div
        className="circle"
        style={{
          background: `${bgColor}`,
        }}
      ></div>
      <div
        className="text"
        style={{
          background: `${bgColor}`,
        }}
      ></div>
    </div>
  );
}

export default ClubLoader;
