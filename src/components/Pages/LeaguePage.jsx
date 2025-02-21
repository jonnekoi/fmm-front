import UserLeagues from '../UserLeagues.jsx';
import ManageLeagues from '../ManageLeagues.jsx';
import PublicLeagues from "../PublicLeagues.jsx";

const LeaguePage = () => {
  return (
      <div className="grid grid-cols-3 m-5 mt-7 leagues-mobile items-start">
          <ManageLeagues></ManageLeagues>
          <UserLeagues></UserLeagues>
          <PublicLeagues></PublicLeagues>
      </div>
  );
};

export default LeaguePage;
