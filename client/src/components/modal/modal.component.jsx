import { useSelector } from "react-redux";
import SVG from "../svg-container/svg.component";
import "./modal.style.scss";

function Modal({ show, close }) {
  const { selectedTeam } = useSelector((state) => state.teams);
  const { selectedLeague } = useSelector((state) => state.leagues);
  return (
    <div
      className="modal-wrapper"
      style={{
        transform: show ? "translateY(0)" : "translateY(-210vh)",
        border: `4px solid ${selectedLeague.color}`,
        color: selectedLeague.color,
      }}
    >
      <div className="modal-header">
        <h2
          style={{
            borderBottom: `1px solid ${selectedLeague.color}`,
          }}
        >
          {selectedTeam && selectedTeam.name}
        </h2>
      </div>

      <div className="modal-body">
        <div className="modal-icon">
          <SVG
            src={selectedTeam ? `/teams/${selectedTeam.name}.svg` : ""}
            width="80%"
            height="80%"
            class_name=""
          />
        </div>

        <div className="modal-content">
          <div className="modal-content-info">
            <div className="info">
              <div className="info-left">Full Name:</div>
              <div className="info-right">
                {selectedTeam && selectedTeam.name}
              </div>
            </div>
            <div className="info">
              <div className="info-left">Date of Establishment:</div>
              <div className="info-right">1900</div>
            </div>
            <div className="info">
              <div className="info-left">Stadium Name:</div>
              <div className="info-right">Stadium</div>
            </div>
            <div className="info">
              <div className="info-left">Leagues won:</div>
              <div className="info-right">1</div>
            </div>
            <div className="info">
              <div className="info-left">Cups won:</div>
              <div className="info-right">1</div>
            </div>
            <div className="info">
              <div className="info-left">Champions League won:</div>
              <div className="info-right">1</div>
            </div>
          </div>
          <div className="modal-content-actions"></div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
