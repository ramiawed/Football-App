import NavAdmin from "../../components/nav-admin/nav-admin.component";
import "./admin-page.style.scss";

function AdminPage() {
  const headerOptions = ["Sign in", "Sign out"];
  const navOptions = ["Competition", "Clubs", "Players", "Matches", "News"];

  return (
    <div>
      <NavAdmin
        title="Admin"
        headerOptions={headerOptions}
        navOptions={navOptions}
      />
    </div>
  );
}

export default AdminPage;
