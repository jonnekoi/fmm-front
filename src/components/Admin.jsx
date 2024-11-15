import AddMatch from './AddMatch.jsx';
import MatchesTable from './MatchesTable.jsx';
import Leaderboard from './Leaderboard.jsx';

const Admin = () => {
  return (
    <div className="flex justify-center m-5 admin-mobile">
      <AddMatch></AddMatch>
      <MatchesTable></MatchesTable>
      <Leaderboard></Leaderboard>
    </div>
  );
}

export default Admin;
