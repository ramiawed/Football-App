// this component display the order options and search input.
// Props:
// -	orderOptions: (Array [{value, label}]): array of the options that should provide to the Select Component.
// -	bgColor: (String) the background color.
// -	foreColor: (String) the color of the text.
// -	searchPlaceholder: (String) placeholder for search input field.
// -	searchChange: (handler) handle to execute the text in the search input change.
// -	orderChange: (handler) handler to execute when change the selected option in the Select Component

// 3-party component
import Select from "react-select";
import { BiSearchAlt2 } from "react-icons/bi";

// style
import "./order-search.style.scss";

function OrderSearch({
  bgColor,
  foreColor,
  orderOptions,
  searchPlaceholder,
  searchChange,
  orderChange,
}) {
  // custom style for the Select Component.
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: "#9e9e9e",
      minHeight: "30px",
      height: "30px",
      boxShadow: state.isFocused ? null : null,
      width: "200px",
      borderRadius: "12px",
      marginLeft: "5px",
    }),
    menu: (provided, state) => ({
      ...provided,
      background: bgColor,
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? bgColor : foreColor,
      background: state.isSelected ? foreColor : bgColor,
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      height: "30px",
      padding: "0 6px",
      fontSize: "14px",
    }),

    input: (provided, state) => ({
      ...provided,
      margin: "0px",
    }),
    indicatorSeparator: (state) => ({
      display: "none,",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "30px",
    }),
  };

  return (
    <div
      className="order-search-container"
      style={{
        background: `${bgColor}`,
        color: `${foreColor}`,
      }}
    >
      {/* Order Section */}
      <div className="order-container">
        <label>Order:</label>
        {/* third-party component react-select */}
        <Select
          styles={customStyles}
          options={orderOptions}
          defaultValue={{ value: "name", label: "Name" }}
          onChange={(e) => orderChange(e.value)}
        />
      </div>

      {/* Search Section */}
      <div
        className="search-container"
        style={{
          background: `${bgColor}`,
          color: `${bgColor}`,
        }}
      >
        <BiSearchAlt2 className="search-icon" />
        <input
          type="input"
          placeholder={searchPlaceholder}
          onChange={(e) => searchChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export default OrderSearch;
