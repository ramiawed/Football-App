import "./club-details-actions.style.scss";
import { AiFillDelete, AiFillEdit, AiFillCopy } from "react-icons/ai";

function ClubDetailsActions({ editHandler, deleteHandler, copyHandler }) {
  return (
    <div className="club-details-actions-container">
      <div className="icon-action" onClick={() => editHandler()}>
        <AiFillEdit />
      </div>
      <div className="icon-action" onClick={() => copyHandler()}>
        <AiFillCopy />
      </div>
      <div className="icon-action" onClick={() => deleteHandler()}>
        <AiFillDelete />
      </div>
    </div>
  );
}

export default ClubDetailsActions;
