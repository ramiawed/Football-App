import { useEffect } from "react";

// style
import "./toast.style.scss";

function Toast({ bgColor, foreColor, toastText, action }) {
  useEffect(() => {
    setTimeout(() => {
      action();
    }, 3000);
  });

  return (
    <div
      className="toast-container"
      style={{
        background: bgColor,
        color: foreColor,
      }}
    >
      <div className="toast">{toastText}</div>
    </div>
  );
}

export default Toast;
