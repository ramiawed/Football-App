import "./order-search.style.scss";
import Select from "react-select";
import { BiSearchAlt2 } from "react-icons/bi";

function OrderSearch({ bgColor, foreColor, searchChange, orderChange }) {
  const orderOptions = [
    { value: "name", label: "Name" },
    { value: "name desc", label: "Name Desc" },
    { value: "founded", label: "Founded" },
    { value: "founded desc", label: "Founded Desc" },
  ];

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
      <div
        className="order-container"
        // style={{
        //   background: `${bgColor}`,
        //   color: `${foreColor}`,
        // }}
      >
        <label>Order:</label>
        <Select
          styles={customStyles}
          options={orderOptions}
          defaultValue={{ value: "name", label: "Name" }}
          onChange={(e) => orderChange(e.value)}
        />
      </div>
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
          placeholder="Search Clubs"
          onChange={(e) => searchChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export default OrderSearch;
