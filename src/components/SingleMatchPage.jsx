import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {format} from 'date-fns';

const url = 'http://127.0.0.1:3000/v1';

// When User selects a match from his leagues matches, this component will show the details of that match

const SingleMatchPage = () => {
  const { id: matchId } = useParams();
  const [match, setMatch] = useState(null);

  const getMatch = async (matchId) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      }
    };
    try {
      const response = await fetch(url + `/matches/${matchId}`, fetchOptions);
      const responseData = await response.json();
      setMatch(responseData);
    } catch (error) {
      console.error('Error fetching match:', error);
    }
  };

  useEffect(() => {
    getMatch(matchId);
  } , [matchId]);

  return (
      <div className="flex justify-center m-5 leagues-mobile">
        <table>
          <thead>
          <tr>
            <th>Match Date</th>
            <th>Home</th>
            <th>Away</th>
            <th>Score</th>
          </tr>
          </thead>
          <tbody>
          {match && (
            <tr key={match.id}>
              <td>{format(new Date(match.matchday), 'dd/MM/yyyy HH:mm')}</td>
              <td>{match.home_team}</td>
              <td>{match.away_team}</td>
              <td>{match.home_score} - {match.away_score}</td>
            </tr>
              )}
          </tbody>
        </table>
      </div>
  );
};

export default SingleMatchPage;
