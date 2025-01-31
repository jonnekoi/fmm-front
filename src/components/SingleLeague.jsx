import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LeagueDetails from './LeagueDetails';
import UsersList from './UsersList';
import MatchesList from './MatchesList';
import Scores from './Scores.jsx';

const url = 'http://127.0.0.1:3000/v1';

const LeaguePage = () => {
  const { id: leagueId } = useParams();
  const [league, setLeague] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeague = async () => {
      try {
        const response = await fetch(`${url}/leagues/info/${leagueId}`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'authorization': 'Bearer ' + sessionStorage.getItem('token'),
          },
        });
        const data = await response.json();
        setTimeout(() => {
          setLeague(data);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching league:', error);
      }
    };

    fetchLeague();
  }, [leagueId]);

  if (loading) {
    return <div className="font-myFont text-6xl">Loading...</div>;
  }

  if (!league) {
    return <div className="font-myFont text-6xl">No league data available</div>;
  }

  return (
      <div className="grid grid-rows-2 grid-cols-3 m-5 leagues-mobile">
        <LeagueDetails league={league} />
        <MatchesList matches={league.league_matches} onMatchClick={(matchId) => navigate(`/match/${matchId}`)} />
        <UsersList users={league.league_users} />
        <div className="col-span-3">
          <Scores />
        </div>
      </div>
  );
};

export default LeaguePage;
