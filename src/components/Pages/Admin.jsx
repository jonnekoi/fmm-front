import AddMatch from '../AdminPageComponents/AddMatch.jsx';
import Leaderboard from '../../NO NEED/Leaderboard.jsx';
import AdminMatchTable from '../AdminPageComponents/AdminMatchTable.jsx';
import AddTeam from '../AdminPageComponents/addTeam.jsx';
import AddPlayer from '../AdminPageComponents/AddPlayer.jsx';

const Admin = () => {
  return (
    <div className="flex flex-wrap justify-center m-5 admin-mobile">
      <AddMatch></AddMatch>
      <AddTeam></AddTeam>
      <AddPlayer></AddPlayer>
      <AdminMatchTable></AdminMatchTable>
      <Leaderboard></Leaderboard>
    </div>
  );
}

export default Admin;
