import { useSelector } from "react-redux";
import SVG from "../svg-container/svg.component";
import "./modal.style.scss";

function Modal({ show, close }) {
  const { selectedClub } = useSelector((state) => state.clubs);
  const { selectedCompetition } = useSelector((state) => state.competitions);
  return (
    <div
      className="modal-wrapper"
      style={{
        transform: show ? "translateY(0)" : "translateY(-210vh)",
        border: `4px solid ${selectedCompetition.color}`,
        color: selectedCompetition.color,
      }}
    >
      <div className="modal-header">
        <h2
          style={{
            borderBottom: `1px solid ${selectedCompetition.color}`,
          }}
        >
          {selectedClub && selectedClub.name}
        </h2>
      </div>

      <div className="modal-body">
        <div className="modal-icon">
          <SVG
            src={selectedClub ? `${selectedClub.crestUrl}` : ""}
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
                {selectedClub && selectedClub.name}
              </div>
            </div>
            <div className="info">
              <div className="info-left">Date of Establishment:</div>
              <div className="info-right">
                {selectedClub && selectedClub.founded}
              </div>
            </div>
            <div className="info">
              <div className="info-left">Stadium Name:</div>
              <div className="info-right">
                {selectedClub && selectedClub.venue}
              </div>
            </div>

            <div className="info">
              <div className="info-left">Phone:</div>
              <div className="info-right">
                {selectedClub && selectedClub.phone}
              </div>
            </div>
            <div className="info">
              <div className="info-left">Website:</div>
              <div className="info-right">
                {selectedClub && selectedClub.website}
              </div>
            </div>
            <div className="info">
              <div className="info-left">Email:</div>
              <div className="info-right">
                {selectedClub && selectedClub.email}
              </div>
            </div>
            <div className="info">
              <div className="info-left">Kit Colors:</div>
              <div className="info-right">
                {selectedClub && selectedClub.clubColors}
              </div>
            </div>
            <div className="info">
              <div className="info-left">Address:</div>
              <div className="info-right">
                {selectedClub && selectedClub.address}
              </div>
            </div>
          </div>
          <div className="modal-content-actions"></div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
