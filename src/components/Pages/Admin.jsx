import AddMatch from '../AdminPageComponents/AddMatch.jsx';
import AddTeam from '../AdminPageComponents/addTeam.jsx';
import AddPlayer from '../AdminPageComponents/AddPlayer.jsx';
import AddLeagueName from '../AdminPageComponents/AddLeagueName.jsx';

const Admin = () => {
  return (
    <div className="flex flex-wrap justify-center m-5 admin-mobile">
      <AddMatch></AddMatch>
      <AddTeam></AddTeam>
      <AddPlayer></AddPlayer>
      <AddLeagueName></AddLeagueName>
    </div>
  );
}

export default Admin;
