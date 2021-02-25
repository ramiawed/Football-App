import { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";

import { getAllClubsAsync } from "../../redux/clubs/clubs.actions";

// components
import OrderSearch from "../order-search/order-search.component";
import ClubDetails from "../club-details/club-details.component";

// style
import "./clubs-admin.style.scss";
import COLORS from "../../utils/colors.util";

function ClubsAdmin({ getAllClubs }) {
  const { clubs, isLoading, error } = useSelector((state) => state.clubs);

  // own state
  // state to watch the value in the search input field
  const [searchClub, setSearchClub] = useState("");
  // state to watch the value in the order select option
  const [orderClub, setOrderClub] = useState("name");

  // options should provide to the OrderSearch component.
  // this options will display in the Select component in OrderSearch component
  const orderOptions = [
    { value: "name", label: "Name" },
    { value: "name desc", label: "Name Desc" },
    { value: "founded", label: "Founded" },
    { value: "founded desc", label: "Founded Desc" },
  ];

  // handle passes to the OrderSearch component to handle the search input onChange
  const handleChangeSearchValue = (val) => {
    setSearchClub(val);
  };

  // handler passes to the OrderSearch component to handle the Select component onChange
  const handleChangeOrder = (val) => {
    setOrderClub(val);
  };

  // method the order the clubs based on the order option
  const compareClubs = (a, b) => {
    if (orderClub === "name") {
      return a.name.localeCompare(b.name);
    } else if (orderClub === "name desc") {
      return b.name.localeCompare(a.name);
    } else if (orderClub === "founded") {
      return a.founded - b.founded;
    } else if (orderClub === "founded desc") {
      return b.founded - a.founded;
    }
  };

  useEffect(() => {
    getAllClubs();
  }, [getAllClubs]);

  return (
    <>
      <OrderSearch
        className="order-search"
        bgColor={COLORS.ADMIN_PAGE_BG}
        foreColor={COLORS.MAIN_FC}
        searchChange={handleChangeSearchValue}
        orderChange={handleChangeOrder}
        orderOptions={orderOptions}
        searchPlaceholder="Search Clubs"
      />
      {isLoading || clubs.length === 0 ? (
        <div>Loading...</div>
      ) : (
        clubs
          .sort(compareClubs)
          .filter((club) =>
            club.name.toLowerCase().includes(searchClub.toLowerCase().trim())
          )
          .map((club) => (
            <ClubDetails
              key={club._id}
              club={club}
              backupColor={COLORS.SECONDARY_FC}
              isAdmin={true}
            />
          ))
      )}
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getAllClubs: () => dispatch(getAllClubsAsync()),
});

export default connect(null, mapDispatchToProps)(ClubsAdmin);
