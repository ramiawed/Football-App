import { useSelector, connect } from "react-redux";
import ContentAdmin from "../../components/content-admin/content-admin.component";
import NavAdmin from "../../components/nav-admin/nav-admin.component";
import { setOption } from "../../redux/nav-options/nav-options.actions";
import "./admin-page.style.scss";

function AdminPage({ changeOption }) {
  const headerOptions = ["Sign in", "Sign out"];
  const navOptions = ["Competition", "Clubs", "Players", "Matches", "News"];

  const { adminOptions } = useSelector((state) => state.navOptions);

  const handleChangeNavOption = (opt) => {
    changeOption('admin', opt);
  };

  return (
    <div
      className="admin-page-container"
      style={{
        background: "rgb(124, 109, 239)",
      }}
    >
      <NavAdmin
        title="Admin"
        headerOptions={headerOptions}
        navOptions={navOptions}
        bgColor="rgb(124, 109, 239)"
        foreColor="rgb(255, 255, 255)"
        hoverColor="rgb(196, 209, 89)"
        fontFamily="Sriracha, cursive"
        onChangeNavOption={handleChangeNavOption}
      />

      <ContentAdmin />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  changeOption: (property, opt) => dispatch(setOption(property, opt)),
});

export default connect(null, mapDispatchToProps)(AdminPage);