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
      <div className="flex flex-wrap justify-center m-5 admin-mobile">
        <button className="button bg-buttonColor m-2" onClick={() => {
          setShowAddMatch((prev) => !prev);
          setShowAddTeam(false);
          setShowAddPlayer(false);
          setShowAddLeague(false);
          setShowAddResult(false);
        }}>Add Match
        </button>
        <button className="button bg-buttonColor m-2" onClick={() => {
          setShowAddTeam((prev) => !prev);
          setShowAddMatch(false);
          setShowAddPlayer(false);
          setShowAddLeague(false);
          setShowAddResult(false);
        }}>Add Team
        </button>
        <button className="button bg-buttonColor m-2" onClick={() => {
          setShowAddPlayer((prev) => !prev);
          setShowAddMatch(false);
          setShowAddTeam(false);
          setShowAddLeague(false);
          setShowAddResult(false);
        }}>Add Player
        </button>
        <button className="button bg-buttonColor m-2" onClick={() => {
          setShowAddLeague((prev) => !prev);
          setShowAddMatch(false);
          setShowAddTeam(false);
          setShowAddPlayer(false);
          setShowAddResult(false);
        }}>Add League
        </button>
        <button className="button bg-buttonColor m-2" onClick={() => {
          setShowAddResult((prev) => !prev);
          setShowAddMatch(false);
          setShowAddTeam(false);
          setShowAddPlayer(false);
          setShowAddLeague(false);
        }}>Add Result</button>
        {showAddMatch && <AddMatch/>}
        {showAddTeam && <AddTeam/>}
        {showAddPlayer && <AddPlayer/>}
        {showAddLeague && <AddLeagueName/>}
        {showAddResult && <AddResultPage/>}
      </div>
  );
}

export default Admin;
