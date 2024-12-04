import { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {format} from 'date-fns';

const url = 'http://127.0.0.1:3000/v1';

const SingleLeague = () => {
  const { id: leagueId } = useParams();
  const [league, setLeague] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleMatchclick = (matchId) => {
    navigate(`/match/${matchId}`);
  };

  useEffect(() => {
    const fetchLeague = async () => {
      const fetchOption = {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'authorization': 'Bearer ' + sessionStorage.getItem('token'),
        },
      }
      try {
        const response = await fetch(`${url}/leagues/info/${leagueId}`, fetchOption);
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

  if (!league || !league.league_matches) {
    return <div className="font-myFont text-6xl">No league data available</div>;
  }

  return (
      <div
          className="grid grid-rows-3 grid-flow-col justify-center single-league-mobile">
        <div className="row-span-3 m-5 bg-slate-900 p-5 single-league-components">
          <h1 className="font-myFont text-6xl pb-10">League Details</h1>
          <h2 className="font-semibold text-3xl">League Name: {league.name}</h2>
          <p className="font-semibold text-3xl">Max
            Players: {league.league_users.length} / {league.maxPlayers}</p>
          <p className="font-semibold text-3xl">Owner: {league.owner_username}</p>
          <p className="text-1xl p-5">{league.desci}</p>
        </div>
        <div className="col-span-2 m-5 p-5 bg-slate-900 single-league-components">
          <h1 className="font-myFont text-6xl pb-10">Users and Points</h1>
          {league.league_users.map((user) => (
              <div key={user.id} className="font-semibold text-3xl">
                <span className="font-semibold">{user.name}    </span>
                <span className="font-mono">{user.points}</span>
              </div>
          ))}
        </div>
        <div className="row-span-2 col-span-2 m-5 p-5 bg-slate-900 single-league-components ">
          <h1 className="font-myFont text-6xl pb-5">League Matches</h1>
          <table className="single-league-mobile-table">
            <thead>
            <tr>
              <th className="p-3 poppins-font border-b border-white">Date</th>
              <th className="p-3 poppins-font border-b border-white">Home Team
              </th>
              <th className="p-3 poppins-font border-b border-white">Away Team
              </th>
              <th className="p-3 poppins-font border-b border-white">Score</th>
            </tr>
            </thead>
            <tbody>
            {league.league_matches.map((match) => (
                <tr key={match.match_id} className="cursor-pointer tr-alin"
                    onClick={() => handleMatchclick(match.match_id)}>
                  <td className="p-3 poppins-font border-b border-white">{format(
                      new Date(match.matchday), 'dd/MM/yyyy HH:mm')}</td>
                  <td className="p-3 poppins-font border-b border-white">{match.home_team}</td>
                  <td className="p-3 poppins-font border-b border-white">{match.away_team}</td>
                  <td className="p-3 poppins-font border-b border-white">{match.home_score} - {match.away_score}</td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default SingleLeague;
