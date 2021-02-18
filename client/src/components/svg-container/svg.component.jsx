// this component is to display a svg icon
// it takes the src, className, width, height as props

// library
import { ReactSVG } from "react-svg";

function SVG({ src, width, height, class_name }) {
  return (
    <ReactSVG
      className={`${class_name}`}
      src={src}
      beforeInjection={(svg) => {
        svg.setAttribute("style", `width: ${width}; height: ${height};`);
      }}
    />
  );
}

export default SVG;
