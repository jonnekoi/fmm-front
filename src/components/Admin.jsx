import AddMatch from './AddMatch.jsx';
import Leaderboard from './Leaderboard.jsx';
import AdminMatchTable from './AdminMatchTable.jsx';

const Admin = () => {
  return (
    <div className="flex justify-center m-5 admin-mobile">
      <AddMatch></AddMatch>
      <AdminMatchTable></AdminMatchTable>
      <Leaderboard></Leaderboard>
    </div>
  );
}

export default Admin;
