// style
import { useEffect, useState } from "react";
import "./action-loader.style.scss";

function ActionLoader({ bgColor, foreColor, text, onclick }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const interval = setTimeout(() => {
      setShow(true);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });
  return (
    show && (
      <>
        <div className="full-size" onClick={() => onclick()}>
          <h2
            style={{
              color: foreColor,
            }}
          >
            Click anywhere to cancel
          </h2>
        </div>

        <div
          className="action-loader-container"
          style={{
            color: foreColor,
          }}
        >
          <p>{text}</p>
          <div className="div-1"></div>
          <div className="div-2"></div>
          <div className="div-3"></div>
          <div className="div-4"></div>
        </div>
      </>
    )
  );
}

export default ActionLoader;
