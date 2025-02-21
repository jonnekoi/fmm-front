import AddMatch from '../AdminPageComponents/AddMatch.jsx';
import AddTeam from '../AdminPageComponents/addTeam.jsx';
import AddPlayer from '../AdminPageComponents/AddPlayer.jsx';
import AddLeagueName from '../AdminPageComponents/AddLeagueName.jsx';
import {useState} from 'react';
import AddResultPage from '../AdminPageComponents/AddResultPage.jsx';

const Admin = () => {
  const [showAddMatch, setShowAddMatch] = useState(false);
  const [showAddTeam, setShowAddTeam] = useState(false);
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const [showAddLeague, setShowAddLeague] = useState(false);
  const [showAddResult, setShowAddResult] = useState(false);
  return (
      <div className="w-full admin-mobile">
        <nav className="w-full  border-b">
          <button className="font-Inter antialiased text-2xl m-5" onClick={() => {
            setShowAddMatch((prev) => !prev);
            setShowAddTeam(false);
            setShowAddPlayer(false);
            setShowAddLeague(false);
            setShowAddResult(false);
          }}>Add Match
          </button>
          <button className="font-Inter text-2xl m-5" onClick={() => {
            setShowAddTeam((prev) => !prev);
            setShowAddMatch(false);
            setShowAddPlayer(false);
            setShowAddLeague(false);
            setShowAddResult(false);
          }}>Add Team
          </button>
          <button className="font-Inter text-2xl m-5" onClick={() => {
            setShowAddPlayer((prev) => !prev);
            setShowAddMatch(false);
            setShowAddTeam(false);
            setShowAddLeague(false);
            setShowAddResult(false);
          }}>Add Player
          </button>
          <button className="font-Inter text-2xl m-5" onClick={() => {
            setShowAddLeague((prev) => !prev);
            setShowAddMatch(false);
            setShowAddTeam(false);
            setShowAddPlayer(false);
            setShowAddResult(false);
          }}>Add League
          </button>
          <button className="font-Inter text-2xl m-5" onClick={() => {
            setShowAddResult((prev) => !prev);
            setShowAddMatch(false);
            setShowAddTeam(false);
            setShowAddPlayer(false);
            setShowAddLeague(false);
          }}>Add Result</button>
        </nav>
        <div className="flex justify-center">
          {showAddMatch && <AddMatch/>}
          {showAddTeam && <AddTeam/>}
          {showAddPlayer && <AddPlayer/>}
          {showAddLeague && <AddLeagueName/>}
          {showAddResult && <AddResultPage/>}
        </div>
      </div>
  );
}

export default Admin;
