import UserLeagues from '../UserLeagues.jsx';
import ManageLeagues from '../ManageLeagues.jsx';
import PublicLeagues from "../PublicLeagues.jsx";

const LeaguePage = () => {
  return (
      <div className="flex justify-center m-5 leagues-mobile">
          <ManageLeagues></ManageLeagues>
          <UserLeagues></UserLeagues>
          <PublicLeagues></PublicLeagues>
      </div>
  );
};

export default LeaguePage;
