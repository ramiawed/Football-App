import { connect, useSelector } from "react-redux";
import ActionLoader from "../../components/action-loader/action-loader.component";
import ContentSection from "../../components/content-section/content-section.component";
import Nav from "../../components/nav/nav.component";
import Toast from "../../components/toast/toast.component";
import {
  deleteClubCancel,
  resetDeleteClubError,
  resetDeleteClubSuccess,
} from "../../redux/clubs/clubs.actions";
import { setOption } from "../../redux/nav-options/nav-options.actions";
import COLORS from "../../utils/colors.util";
import CONSTANTS from "../../utils/constants.util";
import "./admin-page.style.scss";

function AdminPage({
  changeOption,
  cancelDelete,
  resetDeleteClubSuccess,
  resetDeleteClubError,
}) {
  const { adminOptions } = useSelector((state) => state.navOptions);
  const { deleteClubSuccess, deleteClubLoading, deleteClubError } = useSelector(
    (state) => state.clubs
  );

  const headerOptions = [
    { title: "Sign in", onclick: null },
    { title: "Sign out", onclick: null },
  ];

  const navOptions = [
    CONSTANTS.ADMIN_COMPETITIONS,
    CONSTANTS.ADMIN_CLUBS,
    CONSTANTS.ADMIN_PLAYERS,
    CONSTANTS.ADMIN_MATCHES,
    CONSTANTS.ADMIN_NEWS,
  ];

  const handleChangeNavOption = (opt) => {
    changeOption("admin", opt);
  };

  return (
    <div
      className="admin-page-container"
      style={{
        background: COLORS.ADMIN_PAGE_BG,
      }}
    >
      {deleteClubSuccess && (
        <Toast
          bgColor={COLORS.TOAST_ALERT_BG}
          foreColor={COLORS.TOAST_FC}
          toastText="Club deleted successfully"
          action={resetDeleteClubSuccess}
        />
      )}

      {deleteClubError && (
        <Toast
          bgColor={COLORS.TOAST_ALERT_BG}
          foreColor={COLORS.TOAST_FC}
          toastText={deleteClubError.message}
          action={resetDeleteClubError}
        />
      )}

      {deleteClubLoading && (
        <ActionLoader
          bgColor={COLORS.DELETE_BG}
          foreColor={COLORS.MAIN_FC}
          text="Deleting"
          onclick={cancelDelete}
        />
      )}

      <div className="sticky">
        <Nav
          initialOption={adminOptions}
          title="Admin"
          headerOptions={headerOptions}
          navOptions={navOptions}
          bgColor={COLORS.ADMIN_PAGE_BG}
          foreColor={COLORS.TOAST_FC}
          hoverColor={COLORS.HOVER_FC}
          fontFamily="Sriracha, cursive"
          onChangeNavOption={handleChangeNavOption}
        />
      </div>

      <ContentSection page="admin" />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  changeOption: (property, opt) => dispatch(setOption(property, opt)),
  cancelDelete: () => dispatch(deleteClubCancel()),
  resetDeleteClubSuccess: () => dispatch(resetDeleteClubSuccess()),
  resetDeleteClubError: () => dispatch(resetDeleteClubError()),
});

export default connect(null, mapDispatchToProps)(AdminPage);
