import AddMatch from './AddMatch.jsx';
import Leaderboard from './Leaderboard.jsx';
import AdminMatchTable from './AdminMatchTable.jsx';
import AddTeam from './addTeam.jsx';
import AddPlayer from './AddPlayer.jsx';

const Admin = () => {
  return (
    <div className="flex justify-center m-5 admin-mobile">
      <AddMatch></AddMatch>
      <AddTeam></AddTeam>
      <AddPlayer></AddPlayer>
      <AdminMatchTable></AdminMatchTable>
      <Leaderboard></Leaderboard>
    </div>
  );
}

export default Admin;
