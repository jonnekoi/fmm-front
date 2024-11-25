import React, { useEffect, useState } from 'react';
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
      <div className="flex justify-center m-5 single-league-mobile">
        <div className="border p-5 m-5 w-1/3 league-details-mobile">
          <h1 className="font-myFont text-6xl pb-10">League Details</h1>
          <h2 className="font-semibold text-3xl">League Name: {league.name}</h2>
          <p className="font-semibold text-3xl">Max Players: {league.league_users.length} / {league.maxPlayers}</p>
          <p className="font-semibold text-3xl">Owner: {league.owner_username}</p>
          <p className="text-1xl p-5">{league.desci}</p>
        </div>
        <div className="">
          <div className="border m-5 p-5">
            <h1 className="font-myFont text-6xl pb-10">Users and Points</h1>
            {league.league_users.map((user) => (
                <div key={user.id} className="font-semibold text-3xl">
                  <span className="font-semibold">{user.name}    </span>
                  <span className="font-mono">{user.points}</span>
                </div>
            ))}
          </div>
        </div>
        <div className="">
          <div className="border m-5 p-5">
            <h1 className="font-myFont text-6xl pb-10">League Matches</h1>
            <table className="w-full border-collapse">
              <thead>
              <tr>
                <th className="border p-2">Date</th>
                <th className="border p-2">Home Team</th>
                <th className="border p-2">Away Team</th>
                <th className="border p-2">Score</th>
              </tr>
              </thead>
              <tbody>
              {league.league_matches.map((match) => (
                  <tr key={match.match_id} className="" onClick={() => handleMatchclick(match.match_id)}>
                    <td className="p-2 border">{format(new Date(match.matchday), 'yyyy-MM-dd HH:mm')}</td>
                    <td className="border p-2">{match.home_team}</td>
                    <td className="border p-2">{match.away_team}</td>
                    <td className="border p-2">{match.home_score} - {match.away_score}</td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
};

export default SingleLeague;
